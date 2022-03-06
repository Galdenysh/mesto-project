export const selectorsList = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-item",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__form-item_type_error",
  errorClass: "popup__form-item-error_active",
};

export const cardListSection = ".cards"; // Селектор секции с карточками

// Находим кнопки и формы
export const profile = document.querySelector(".profile");
export const openPopupAvatarBtn = profile.querySelector(".profile__avatar-button");
export const openPopupProfileBtn = profile.querySelector(".profile__edit-button");
export const openPopupNewCardBtn = profile.querySelector(".profile__add-button");
export const formAvatarElement = document.querySelector(".popup_type_avatar").querySelector(".popup__form");
export const formProfileElement = document.querySelector(".popup_type_profile").querySelector(".popup__form");
export const formNewCardElement = document.querySelector(".popup_type_new-card").querySelector(".popup__form");

// Находим данные пользователя
export const userName = profile.querySelector(".profile__name");
export const userSignature = profile.querySelector(".profile__signature");
export const userAvatar = profile.querySelector(".profile__avatar-image");
