import { addCard } from "./card.js";
import { enableValidation } from "./validate.js";
import { validationSettings } from "./index.js";

// Получение информации профиля
const profile = document.querySelector(".profile");
const userName = profile.querySelector(".profile__name");
const userSignature = profile.querySelector(".profile__signature");

// Находим форму и поля формы пользователя
const popupProfile = document.querySelector(".popup_type_edit"); // Находим попап пользователя
const formProfileElement = popupProfile.querySelector(".popup__form");
const nameInput = formProfileElement.querySelector(".popup__form-item_select_name");
const signatureInput = formProfileElement.querySelector(".popup__form-item_select_signature");

// Находим попап с просмотром фотографии и его элементы
const popupImageFullscreen = document.querySelector(".popup_type_image");
const pictureLink = popupImageFullscreen.querySelector(".popup__big-image");
const pictureName = popupImageFullscreen.querySelector(".popup__image-caption");

// Находим форму добавления места
const popupNewCard = document.querySelector(".popup_type_add"); // Находим попап добавления места
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
  const openedPopup = document.querySelector(".popup_opened"); // Находим открытый попап

  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
}

// Обработчик «отправки» формы данных пользователя
function formEditSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы

  // Записываем в профиль значение из полей форм
  userName.textContent = nameInput.value;
  userSignature.textContent = signatureInput.value;

  closePopup(popupProfile);
}

// Обработчик «отправки» формы добавления места
function formAddSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы

  // Записываем в целевой объект значение из полей форм
  const cardData = { name: placeNameInput.value, link: pictureUrlInput.value };

  addCard(cardData); // вызываем функцию добавления карточки и посылаем значения форм
  formNewCardElement.reset(); // Опусташаем поля формы

  enableValidation(validationSettings);

  closePopup(popupNewCard);
}

export {
  openPopup,
  openPopupProfile,
  openPopupImage,
  closePopup,
  formEditSubmitHandler,
  formAddSubmitHandler,
  profile,
  popupNewCard,
  formProfileElement,
  formNewCardElement,
};
