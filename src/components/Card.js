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

    this._cardPlace = this._cardElement.querySelector(".cards__place");
    this._cardTitle = this._cardElement.querySelector(".cards__title");
    this._cardLikesCount = this._cardElement.querySelector(".cards__like-number");
    this._removeBtn = this._cardElement.querySelector(".cards__remove-button");
    this._likeBtn = this._cardElement.querySelector(".cards__like-button");
    this._isLiked = Boolean(this._likes.find((user) => user._id === currentUserId));

    if (this._isLiked) {
      this._likeBtn.classList.add("cards__like-button_active");
    }

    if (this._ownerId === currentUserId) {
      this._removeBtn.classList.add("cards__remove-button_visible");
    }

    // Заполняем карточку
    this._cardTitle.textContent = this._name;
    this._cardPlace.src = this._link;
    this._cardPlace.alt = this._name;
    this._cardLikesCount.textContent = this._likes.length;

    this._setEventListeners(); // Вызываем функцию для прослушивания событий

    return this._cardElement;
  }

  updateLikes(cardData) {
    this._cardLikesCount.textContent = cardData.likes.length;
    this._likeBtn.classList.toggle("cards__like-button_active");
    this._isLiked = !this._isLiked;
  }

  getId() {
    return this._id;
  }

  getIsLiked() {
    return this._isLiked;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => this._handleToggleLike(this));
    this._cardPlace.addEventListener("click", () => this._handleCardClick({ link: this._link, name: this._name }));
    this._removeBtn.addEventListener("click", () => this._handleRemoveCard({ cardElement: this._cardElement, cardId: this._id }));
  }
}
