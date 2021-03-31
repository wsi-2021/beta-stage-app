'use strict';

class Index {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
  get obj() {
    return { title: this.title, content: this.content };
  }
  get json() {
    return JSON.stringify(this.obj);
  }
}

module.exports = {
  Index
}
