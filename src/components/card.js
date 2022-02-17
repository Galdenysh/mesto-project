import { api } from "./index.js";

export default class Card {
  constructor(cardData, selector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._ownerId = cardData.owner._id;
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

  // Функция переключения лайка
  _toggleLike(evt) {
    const card = evt.target.closest(".cards__card");

    if (evt.target.classList.contains("cards__like-button_active")) {
      api
        .deleteLikeCard(this._id)
        .then((cardData) => {
          card.querySelector(".cards__like-number").textContent = cardData.likes.length;
          evt.target.classList.toggle("cards__like-button_active");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .likeCard(this._id)
        .then((cardData) => {
          card.querySelector(".cards__like-number").textContent = cardData.likes.length;
          evt.target.classList.toggle("cards__like-button_active");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // // Функция удаления карточки
  // _removeCard(cardElement, cardData) {
  //   confirmBtn.textContent = "Удаление...";

  //   deleteCard(cardData._id)
  //     .then(() => {
  //       cardElement.remove();
  //       closePopup(popupConfirm);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => (confirmBtn.textContent = "Да"));
  // }

  _setEventListeners() {
    this._cardElement.querySelector(".cards__like-button").addEventListener("click", (evt) => this._toggleLike(evt));
    // this._cardElement.querySelector(".cards__place").addEventListener("click", () => openPopupImage(cardData));
    // cardElement.querySelector(".cards__remove-button").addEventListener("click", () => openPopupConfirm(cardElement, cardData));
  }
}
