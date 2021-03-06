'use strict';
document.querySelector('html').className = 'js';

const table = document.querySelector('table#records');

table.addEventListener('click', function(e) {
  if (e.target.tagName !== 'TH') return; // leave
  const th = e.target;
  th.classList.toggle('desc');
  sortTable(table, th.cellIndex, th.className);
  localStorage.setItem('cellIndex', th.cellIndex);
  localStorage.setItem('order', th.className);
});

function sortTable(table, columnIndex, order) {
  const rows = Array.from(table.querySelector('tbody').rows);

  rows.sort(function(a, b) {
    if (isNaN(a.cells[columnIndex].dataset.value)) {
      return a.cells[columnIndex].dataset.value > b.cells[columnIndex].dataset.value ? 1 : -1;
    } else {
      return a.cells[columnIndex].dataset.value - b.cells[columnIndex].dataset.value;
    }
  });

  if (order === 'desc') {
    rows.reverse();
  }

  table.querySelector('tbody').append(...rows);
}

const days_nav = document.querySelector('ul.days');

days_nav.addEventListener('click', function(e) {
  if (e.target.tagName !== 'A') return; // leave
  e.preventDefault();
  const href = e.target.getAttribute('href');
  const api_endpoint = '/api' + href;
  fetch(api_endpoint)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const tbody = document.querySelector('table#records tbody');
      tbody.innerHTML = "";
      for (let d of data) {
        const tr = document.querySelector('template#tr').content.cloneNode(true);
        const td = tr.querySelectorAll('td');
        const dt = new Date(d.date);
        const pretty_date = `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
        td[0].dataset.value = d.date;
        td[0].innerText = pretty_date;
        td[1].dataset.value = d.total_doses_daily;
        td[1].innerText = d.total_doses_daily;
        td[2].dataset.value = d.total_doses_cumulative;
        td[2].innerText = d.total_doses_cumulative;
        tbody.append(tr);
      }

      if (localStorage.getItem('cellIndex')) {
        const ci = localStorage.getItem('cellIndex');
        const order = localStorage.getItem('order');
        document.querySelectorAll('thead th')[ci].className = order;
        sortTable(table, ci, order);
      }

      if (history.pushState) {
        history.pushState('', '', href);
      }

    })
    .catch(function(error) {
      console.log(error);
    });
});
