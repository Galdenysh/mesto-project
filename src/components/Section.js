import Card from "./Card.js";

export default class Section {
  constructor({ data }, selector) {
    this._initialArray = data;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      const card = new Card(item, "#js-cards");
      const cardElement = card.createCard();

      this.setItem(cardElement);
    });
  }

  setItem(element) {
    this._container.append(element);
  }
}
