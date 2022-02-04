import { openPopupImage } from "./modal.js";
import { currentUserId } from "./index.js";
import { deleteCard } from "./api.js";

const cards = document.querySelector(".cards"); // Находим секцию с карточками

// Функция создания карточки
function createCard(cardData) {
  const cardTemplate = document.querySelector("#js-cards").content;
  const cardElement = cardTemplate.querySelector(".cards__card").cloneNode(true);
  const cardPlace = cardElement.querySelector(".cards__place");
  const cardTitle = cardElement.querySelector(".cards__title");
  const cardLikeCount = cardElement.querySelector(".cards__like-number");

  const removeBtn = cardElement.querySelector(".cards__remove-button");

  if (cardData.owner._id === currentUserId) {
    removeBtn.classList.add("cards__remove-button_visible");
  }

  // Заполняем карточку
  cardTitle.textContent = cardData.name;
  cardPlace.src = cardData.link;
  cardPlace.alt = cardData.name;
  cardLikeCount.textContent = cardData.likes.length;

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
function toggleLike(evt) {
  evt.target.classList.toggle("cards__like-button_active");
}

// Функция удаления карточки
function removeCard(cardElement, cardData) {
  cardElement.remove();

  deleteCard(cardData._id);
}

// Функция прослушивания взаимодействия с карточками
function setEventListeners(cardElement, cardData) {
  cardElement.querySelector(".cards__like-button").addEventListener("click", toggleLike);
  cardElement.querySelector(".cards__place").addEventListener("click", () => openPopupImage(cardData));
  cardElement.querySelector(".cards__remove-button").addEventListener("click", () => removeCard(cardElement, cardData));
}

export { addStartCard, addCard };
