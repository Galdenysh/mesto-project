import { openPopupImage, openPopupConfirm, closePopup, popupConfirm, confirmBtn } from "./modal.js";
// import { currentUserId, renderResultLikeCount } from "./index.js";
import { deleteCard, likeCard, deleteLikeCard } from "./Api.js";

const cards = document.querySelector(".cards"); // Находим секцию с карточками

// Функция создания карточки
function createCard(cardData) {
  const cardTemplate = document.querySelector("#js-cards").content;
  const cardElement = cardTemplate.querySelector(".cards__card").cloneNode(true);

  const cardPlace = cardElement.querySelector(".cards__place");
  const cardTitle = cardElement.querySelector(".cards__title");
  const cardLikesCount = cardElement.querySelector(".cards__like-number");
  const removeBtn = cardElement.querySelector(".cards__remove-button");
  const likeBtn = cardElement.querySelector(".cards__like-button");
  const isLiked = Boolean(cardData.likes.find((user) => user._id === currentUserId));

  if (isLiked) {
    likeBtn.classList.add("cards__like-button_active");
  }

  if (cardData.owner._id === currentUserId) {
    removeBtn.classList.add("cards__remove-button_visible");
  }

  // Заполняем карточку
  cardTitle.textContent = cardData.name;
  cardPlace.src = cardData.link;
  cardPlace.alt = cardData.name;
  cardLikesCount.textContent = cardData.likes.length;

  setEventListeners(cardElement, cardData); // Вызываем функцию для прослушивания событий

  return cardElement;
}

// Функция добавления начальных карточек
function addStartCard(cardData) {
  const cardElement = createCard(cardData);

  cards.append(cardElement); // Пушим карточку
}

// Функция добавления карточки
function addCard(cardData) {
  const cardElement = createCard(cardData);

  cards.prepend(cardElement); // Пушим карточку
}

// Функция переключения лайка
function toggleLike(evt, cardData) {
  const card = evt.target.closest(".cards__card");

  if (evt.target.classList.contains("cards__like-button_active")) {
    deleteLikeCard(cardData._id)
      .then((cardData) => {
        renderResultLikeCount(card, cardData);
        evt.target.classList.toggle("cards__like-button_active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCard(cardData._id)
      .then((cardData) => {
        renderResultLikeCount(card, cardData);
        evt.target.classList.toggle("cards__like-button_active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Функция удаления карточки
function removeCard(cardElement, cardData) {
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

// Функция прослушивания взаимодействия с карточками
function setEventListeners(cardElement, cardData) {
  cardElement.querySelector(".cards__like-button").addEventListener("click", (evt) => toggleLike(evt, cardData));
  cardElement.querySelector(".cards__place").addEventListener("click", () => openPopupImage(cardData));
  cardElement.querySelector(".cards__remove-button").addEventListener("click", () => openPopupConfirm(cardElement, cardData));
}

export { addStartCard, addCard, removeCard };
