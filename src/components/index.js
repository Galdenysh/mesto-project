import "../pages/index.css";

import { enableValidation } from "./validate.js";
import { addStartCard } from "./card.js";
import {
  openPopup,
  openPopupProfile,
  closePopup,
  formProfileSubmitHandler,
  formNewCardSubmitHandler,
  profile,
  userName,
  userSignature,
  popupNewCard,
  formProfileElement,
  formNewCardElement,
} from "./modal.js";
import { getInitialCards, getProfileInfo } from "./api.js";

const selectorList = {
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

// Функция получения начальных карточек
const renderResultInitialCards = (initialCards) => {
  initialCards.forEach(function (cardData) {
    addStartCard(cardData);
  });
};

// Функция получения начальных информация о профиле с сервера
const renderResultProfileInfo = (profileInfo) => {
  userName.textContent = profileInfo.name;
  userSignature.textContent = profileInfo.about;
};

enableValidation(selectorList); // Вызов функции валидации форм

// Вызов функций получения запросов с сервера
getInitialCards();
getProfileInfo();

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
formProfileElement.addEventListener("submit", formProfileSubmitHandler);
formNewCardElement.addEventListener("submit", formNewCardSubmitHandler);

export { selectorList, renderResultInitialCards, renderResultProfileInfo };
