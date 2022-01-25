import { initialCards } from "./initial-card.js";
import { addStartCard } from "./card.js";
import { enableValidation } from "./validate.js";
import {
  openPopup,
  openPopupEdit,
  closePopup,
  closePopupOverlay,
  formEditSubmitHandler,
  formAddSubmitHandler,
  profile,
  popupEditProfile,
  popupAddNewCard,
  popupImageFullscreen,
  formEditElement,
  formAddElement,
} from "./modal.js";

// Находим кнопки
const openPopupEditBtn = profile.querySelector(".profile__edit-button");
const openPopupAddBtn = profile.querySelector(".profile__add-button");
const closePopupEditBtn = popupEditProfile.querySelector(".popup__close-button");
const closePopupAddBtn = popupAddNewCard.querySelector(".popup__close-button");
const closePopupImageBtn = popupImageFullscreen.querySelector(".popup__close-button");

// Добавление начальных карточек
initialCards.forEach(function (cardData) {
  addStartCard(cardData);
});

enableValidation();

// Слушаем кнопки
openPopupEditBtn.addEventListener("click", openPopupEdit);
openPopupAddBtn.addEventListener("click", () => openPopup(popupAddNewCard));
closePopupEditBtn.addEventListener("click", () => closePopup(popupEditProfile));
closePopupAddBtn.addEventListener("click", () => closePopup(popupAddNewCard));
closePopupImageBtn.addEventListener("click", () => closePopup(popupImageFullscreen));

// Слушаем клики вне модального окна
popupEditProfile.addEventListener("click", (evt) => closePopupOverlay(evt, popupEditProfile));
popupAddNewCard.addEventListener("click", (evt) => closePopupOverlay(evt, popupAddNewCard));
popupImageFullscreen.addEventListener("click", (evt) => closePopupOverlay(evt, popupImageFullscreen));

// Слушаем отправку формы
formEditElement.addEventListener("submit", formEditSubmitHandler);
formAddElement.addEventListener("submit", formAddSubmitHandler);
