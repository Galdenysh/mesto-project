import { addCard } from "./card.js";

// Получение информации профиля
const profile = document.querySelector(".profile");
const userName = profile.querySelector(".profile__name");
const userSignature = profile.querySelector(".profile__signature");

// Находим форму и поля формы пользователя
const popupEditProfile = document.querySelector(".popup_type_edit"); // Находим попап пользователя
const formEditElement = popupEditProfile.querySelector(".popup__form");
const nameInput = formEditElement.querySelector(".popup__form-item_select_name");
const signatureInput = formEditElement.querySelector(".popup__form-item_select_signature");

// Находим попап с просмотром фотографии и его элементы
const popupImageFullscreen = document.querySelector(".popup_type_image");
const pictureLink = popupImageFullscreen.querySelector(".popup__big-image");
const pictureName = popupImageFullscreen.querySelector(".popup__image-caption");

// Находим форму добавления места
const popupAddNewCard = document.querySelector(".popup_type_add"); // Находим попап добавления места
const formAddElement = popupAddNewCard.querySelector(".popup__form");
const placeNameInput = formAddElement.querySelector(".popup__form-item_select_place-name");
const pictureUrlInput = formAddElement.querySelector(".popup__form-item_select_picture-url");

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
function openPopupEdit() {
  nameInput.value = userName.textContent;
  signatureInput.value = userSignature.textContent;

  openPopup(popupEditProfile);
}

// Функция открытия попапа с просмотром фотографии
function openPopupImage(cardData) {
  pictureLink.src = cardData.link;
  pictureLink.alt = cardData.name;
  pictureName.textContent = cardData.name;

  openPopup(popupImageFullscreen);
}

// Функция закрытия попапа по клику вне модального окна
function closePopupOverlay(evt, popup) {
  if (evt.target == popup) {
    closePopup(popup);
  }
}

// Функция закрытия попапа по нажатию клавиши Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(popupEditProfile);
    closePopup(popupAddNewCard);
    closePopup(popupImageFullscreen);
  }
}

// Обработчик «отправки» формы данных пользователя
function formEditSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы

  // Записываем в профиль значение из полей форм
  userName.textContent = nameInput.value;
  userSignature.textContent = signatureInput.value;

  closePopup(popupEditProfile);
}

// Обработчик «отправки» формы добавления места
function formAddSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы

  // Записываем в целевой объект значение из полей форм
  const cardData = { name: placeNameInput.value, link: pictureUrlInput.value };

  addCard(cardData); // вызываем функцию добавления карточки и посылаем значения форм
  formAddElement.reset(); // Опусташаем поля формы

  closePopup(popupAddNewCard);
}

export {
  openPopup,
  openPopupEdit,
  openPopupImage,
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
};