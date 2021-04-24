var table = document.querySelector('table#records');

table.addEventListener('click', function(e) {
  if (e.target.tagName !== 'TH') return; // leave if not a <th> element
  var th = e.target;
  sortTable(table, th.cellIndex, th.className);
  th.classList.toggle('desc');
});

function sortTable(table, columnIndex, order) {
  var rows = Array.from(table.querySelector('tbody').rows);
  console.log(rows.length, 'rows');

  rows.sort(function (a, b) {
    return a.cells[columnIndex].dataset.value > b.cells[columnIndex].dataset.value ? 1 : -1;
  });

  if (order === 'desc') {
    rows.reverse();
  }

  table.querySelector('tbody').append(...rows);

}
