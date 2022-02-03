import "../pages/index.css";

import { initialCards } from "./initial-card.js";
import { addStartCard } from "./card.js";
import { enableValidation } from "./validate.js";
import {
  openPopup,
  openPopupProfile,
  closePopup,
  formEditSubmitHandler,
  formAddSubmitHandler,
  profile,
  popupNewCard,
  formProfileElement,
  formNewCardElement,
} from "./modal.js";

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-item",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__form-item_type_error",
  errorClass: "popup__form-item-error_active",
};

const popups = document.querySelectorAll(".popup");

// Находим кнопки
const openPopupProfileBtn = profile.querySelector(".profile__edit-button");
const openPopupNewCardBtn = profile.querySelector(".profile__add-button");

// Добавление начальных карточек
initialCards.forEach(function (cardData) {
  addStartCard(cardData);
});

enableValidation(validationSettings);

// Функция навешиваения слушателей на все попапы
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    // Если был клик по открытому оверлею, то закроем попап
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    // Если нажата кнопка закрытия, то закроем попап
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

// Слушаем кнопки
openPopupProfileBtn.addEventListener("click", openPopupProfile);
openPopupNewCardBtn.addEventListener("click", () => openPopup(popupNewCard));

// Слушаем отправку формы
formProfileElement.addEventListener("submit", formEditSubmitHandler);
formNewCardElement.addEventListener("submit", formAddSubmitHandler);

export { validationSettings };
