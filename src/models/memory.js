export default class Memory {
  constructor(type, date, title, url) {
    this._type = type;
    this._date = date;
    this._title = title;
    this._url = url;
  }

  writeMemory() {
    console.log(this);
  }

  // getters
  get getDate() {
    return this._date;
  }

  get getTitle() {
    return this._title;
  }

  get getUrl() {
    return this._url;
  }

  // setters
  set setDate(date) {
    this._date = date;
  }

  set setTitle(title) {
    this._title = title;
  }
  set setUrl(url) {
    this._url = url;
  }
}
