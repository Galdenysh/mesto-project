export default class Card {
  constructor(cardData, handleToggleLike, handleCardClick, handleRemoveCard, selector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._ownerId = cardData.owner._id;
    this._handleToggleLike = handleToggleLike;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._selector = selector;
  }

  // Функция получения элемента карточки
  _getElement() {
    const cardTemplate = document.querySelector(this._selector).content;
    const cardElement = cardTemplate.querySelector(".cards__card").cloneNode(true);

    return cardElement;
  }

  // Функция создания карточки
  createCard(currentUserId) {
    this._cardElement = this._getElement();

    const cardPlace = this._cardElement.querySelector(".cards__place");
    const cardTitle = this._cardElement.querySelector(".cards__title");
    const cardLikesCount = this._cardElement.querySelector(".cards__like-number");
    const removeBtn = this._cardElement.querySelector(".cards__remove-button");
    const likeBtn = this._cardElement.querySelector(".cards__like-button");
    const isLiked = Boolean(this._likes.find((user) => user._id === currentUserId));

    if (isLiked) {
      likeBtn.classList.add("cards__like-button_active");
    }

    if (this._ownerId === currentUserId) {
      removeBtn.classList.add("cards__remove-button_visible");
    }

    // Заполняем карточку
    cardTitle.textContent = this._name;
    cardPlace.src = this._link;
    cardPlace.alt = this._name;
    cardLikesCount.textContent = this._likes.length;

    this._setEventListeners(); // Вызываем функцию для прослушивания событий

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement.querySelector(".cards__like-button").addEventListener("click", (evt) => this._handleToggleLike(evt, this._id));
    this._cardElement.querySelector(".cards__place").addEventListener("click", () => this._handleCardClick({ link: this._link, name: this._name }));
    this._cardElement
      .querySelector(".cards__remove-button")
      .addEventListener("click", () => this._handleRemoveCard({ cardElement: this._cardElement, cardId: this._id }));
  }
}
