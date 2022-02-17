export default class Card {
  constructor(cardData, selector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._selector = selector;
  }

  // Функция добавления начальных карточек
  addStartCard(cards) {
    cards.append(this._createCard()); // Пушим карточку
  }

  // Функция добавления карточки
  addCard(cards) {
    cards.prepend(this._createCard()); // Пушим карточку
  }

  // Функция получения элемента карточки
  _getElement() {
    const cardTemplate = document.querySelector(this._selector).content;
    const cardElement = cardTemplate.querySelector(".cards__card").cloneNode(true);

    return cardElement;
  }

  // Функция создания карточки
  createCard() {
    this._cardElement = this._getElement();

    const cardPlace = this._cardElement.querySelector(".cards__place");
    const cardTitle = this._cardElement.querySelector(".cards__title");
    const cardLikesCount = this._cardElement.querySelector(".cards__like-number");

    // Заполняем карточку
    cardTitle.textContent = this._name;
    cardPlace.src = this._link;
    cardPlace.alt = this._name;
    cardLikesCount.textContent = this._likes.length;

    this._setEventListeners(); // Вызываем функцию для прослушивания событий

    return this._cardElement;
  }

  // Функция переключения лайка
  _toggleLike(evt) {
    // const card = evt.target.closest(".cards__card");

    this._renderer(evt, this._id);
  }

  // Функция удаления карточки
  _removeCard(cardElement, cardData) {
    confirmBtn.textContent = "Удаление...";

    deleteCard(cardData._id)
      .then(() => {
        cardElement.remove();
        closePopup(popupConfirm);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (confirmBtn.textContent = "Да"));
  }

  _setEventListeners() {
    this._cardElement.querySelector(".cards__like-button").addEventListener("click", (evt) => this._toggleLike(evt));
    // cardElement.querySelector(".cards__place").addEventListener("click", () => openPopupImage(cardData));
    // cardElement.querySelector(".cards__remove-button").addEventListener("click", () => openPopupConfirm(cardElement, cardData));
  }
}
