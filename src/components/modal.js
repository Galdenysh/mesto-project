import { addCard } from "./card.js";
import { toggleButtonState } from "./validate.js";
import { selectorList } from "./index.js";
import { sendProfileInfo, sendNewCard } from "./api.js";

// Получение информации профиля
const profile = document.querySelector(".profile");
const userName = profile.querySelector(".profile__name");
const userSignature = profile.querySelector(".profile__signature");

// Находим форму и поля формы пользователя
const popupProfile = document.querySelector(".popup_type_profile"); // Находим попап пользователя
const formProfileElement = popupProfile.querySelector(".popup__form");
const nameInput = formProfileElement.querySelector(".popup__form-item_select_name");
const signatureInput = formProfileElement.querySelector(".popup__form-item_select_signature");

// Находим попап с просмотром фотографии и его элементы
const popupImageFullscreen = document.querySelector(".popup_type_image");
const pictureLink = popupImageFullscreen.querySelector(".popup__big-image");
const pictureName = popupImageFullscreen.querySelector(".popup__image-caption");

// Находим форму добавления места
const popupNewCard = document.querySelector(".popup_type_new-card"); // Находим попап добавления места
const formNewCardElement = popupNewCard.querySelector(".popup__form");
const placeNameInput = formNewCardElement.querySelector(".popup__form-item_select_place-name");
const pictureUrlInput = formNewCardElement.querySelector(".popup__form-item_select_picture-url");

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");

  document.addEventListener("keydown", closePopupEsc);
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");

  document.removeEventListener("keydown", closePopupEsc);
}

// Функция открытия попапа пользователя и заполнения полей формы из информации профиля
function openPopupProfile() {
  nameInput.value = userName.textContent;
  signatureInput.value = userSignature.textContent;

  openPopup(popupProfile);
}

// Функция открытия попапа с просмотром фотографии
function openPopupImage(cardData) {
  pictureLink.src = cardData.link;
  pictureLink.alt = cardData.name;
  pictureName.textContent = cardData.name;

  openPopup(popupImageFullscreen);
}

// Функция закрытия попапа по нажатию клавиши Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened"); // Находим открытый попап

    closePopup(openedPopup);
  }
}

// Обработчик «отправки» формы данных пользователя
function formProfileSubmitHandler() {
  sendProfileInfo(nameInput, signatureInput); // Посылаем запрос на сервер на изменение информации профиля

  closePopup(popupProfile);
}

// Обработчик «отправки» формы добавления места
function formNewCardSubmitHandler() {
  const cardData = { name: placeNameInput.value, link: pictureUrlInput.value }; // Записываем в целевой объект значение из полей форм
  const inputList = Array.from(formNewCardElement.querySelectorAll(`${selectorList.inputSelector}`)); // Массив из всех полей формы
  const buttonElement = formNewCardElement.querySelector(`${selectorList.submitButtonSelector}`);

  sendNewCard(cardData); // Посылаем запрос на сервер на создание новой карточки
  formNewCardElement.reset(); // Опусташаем поля формы

  toggleButtonState(selectorList, inputList, buttonElement);

  closePopup(popupNewCard);
}

export {
  openPopup,
  openPopupProfile,
  openPopupImage,
  closePopup,
  formProfileSubmitHandler,
  formNewCardSubmitHandler,
  profile,
  userName,
  userSignature,
  popupNewCard,
  formProfileElement,
  formNewCardElement,
};
