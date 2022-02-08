import { toggleButtonState } from "./validate.js";
import { selectorsList } from "./constants.js";
import { sendProfileInfo, sendNewCard, sendAvatar } from "./api.js";
import { renderResultAvatar, renderResultProfileInfo, renderResultNewCard, renderLoading } from "./index.js";
import { removeCard } from "./card.js";

// Получение информации профиля
const profile = document.querySelector(".profile");
const userName = profile.querySelector(".profile__name");
const userSignature = profile.querySelector(".profile__signature");
const userAvatar = profile.querySelector(".profile__avatar-image");

// Находим форму редактирования аватара
const popupAvatar = document.querySelector(".popup_type_avatar"); // Находим попап редактирования аватара
const formAvatarElement = popupAvatar.querySelector(".popup__form");
const avatarInput = formAvatarElement.querySelector(".popup__form-item_select_avatar");
const avatarInputsList = Array.from(formAvatarElement.querySelectorAll(`${selectorsList.inputSelector}`)); // Массив из всех полей формы
const avatarSubmitBtn = formAvatarElement.querySelector(`${selectorsList.submitButtonSelector}`);

// Находим форму пользователя
const popupProfile = document.querySelector(".popup_type_profile"); // Находим попап пользователя
const formProfileElement = popupProfile.querySelector(".popup__form");
const nameInput = formProfileElement.querySelector(".popup__form-item_select_name");
const signatureInput = formProfileElement.querySelector(".popup__form-item_select_signature");
const profileSubmitBtn = formProfileElement.querySelector(`${selectorsList.submitButtonSelector}`);

// Находим форму добавления места
const popupNewCard = document.querySelector(".popup_type_new-card"); // Находим попап добавления места
const formNewCardElement = popupNewCard.querySelector(".popup__form");
const placeNameInput = formNewCardElement.querySelector(".popup__form-item_select_place-name");
const pictureUrlInput = formNewCardElement.querySelector(".popup__form-item_select_picture-url");
const newCardInputsList = Array.from(formNewCardElement.querySelectorAll(`${selectorsList.inputSelector}`)); // Массив из всех полей формы
const newCardSubmitBtn = formNewCardElement.querySelector(`${selectorsList.submitButtonSelector}`);

// Находим попап с просмотром фотографии и его элементы
const popupImageFullscreen = document.querySelector(".popup_type_image");
const pictureLink = popupImageFullscreen.querySelector(".popup__big-image");
const pictureName = popupImageFullscreen.querySelector(".popup__image-caption");

// Находим попап подтверждения
const popupConfirm = document.querySelector(".popup_type_confirm");
const confirmBtn = popupConfirm.querySelector(".popup__save-button");

const removebleCardData = {}; // Объект с данными удаляемой карточки

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");

  document.addEventListener("keydown", closePopupEsc);
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");

  document.removeEventListener("keydown", closePopupEsc);
  confirmBtn.removeEventListener("click", confirmHandler);
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

// Функция открытия попапа подтверждения
const openPopupConfirm = (cardElement, cardData) => {
  openPopup(popupConfirm);

  removebleCardData.cardElement = cardElement;
  removebleCardData.cardData = cardData;

  confirmBtn.addEventListener("click", confirmHandler);
};

// Функция закрытия попапа по нажатию клавиши Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened"); // Находим открытый попап

    closePopup(openedPopup);
  }
}

// Обработчик «отправки» формы обновления аватара
const formAvatarSubmitHandler = () => {
  renderLoading(avatarSubmitBtn, true);

  // Посылаем запрос на сервер на обновление аватара
  sendAvatar(avatarInput)
    .then((profileInfo) => {
      renderResultAvatar(profileInfo);
      formAvatarElement.reset(); // Опусташаем поля формы
      toggleButtonState(selectorsList, avatarInputsList, avatarSubmitBtn); // Деактивируем кнопку, если форма не прошла валидацию
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(avatarSubmitBtn, false);
    });
};

// Обработчик «отправки» формы данных пользователя
const formProfileSubmitHandler = () => {
  renderLoading(profileSubmitBtn, true);

  // Посылаем запрос на сервер на изменение информации профиля
  sendProfileInfo(nameInput, signatureInput)
    .then((profileInfo) => {
      renderResultProfileInfo(profileInfo);
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(profileSubmitBtn, false);
    });
};

// Обработчик «отправки» формы добавления места
const formNewCardSubmitHandler = () => {
  const cardData = { name: placeNameInput.value, link: pictureUrlInput.value }; // Записываем в целевой объект значение из полей форм

  renderLoading(newCardSubmitBtn, true);

  // Посылаем запрос на сервер на создание новой карточки
  sendNewCard(cardData)
    .then((cardData) => {
      renderResultNewCard(cardData);
      formNewCardElement.reset(); // Опусташаем поля формы
      toggleButtonState(selectorsList, newCardInputsList, newCardSubmitBtn); // Деактивируем кнопку, если форма не прошла валидацию
      closePopup(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(newCardSubmitBtn, false);
    });
};

// Обработчик подтверждения удаления карточки
const confirmHandler = () => {
  removeCard(removebleCardData.cardElement, removebleCardData.cardData);
};

export {
  openPopup,
  openPopupProfile,
  openPopupImage,
  openPopupConfirm,
  closePopup,
  formAvatarSubmitHandler,
  formProfileSubmitHandler,
  formNewCardSubmitHandler,
  profile,
  userName,
  userSignature,
  userAvatar,
  popupAvatar,
  popupNewCard,
  popupConfirm,
  confirmBtn,
  formAvatarElement,
  formProfileElement,
  formNewCardElement,
};
