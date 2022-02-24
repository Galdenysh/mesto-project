import "../pages/index.css";

import { selectorsList } from "../utils/constants.js";
import {
  openPopup,
  openPopupProfile,
  closePopup,
  formAvatarElement,
  formProfileSubmitHandler,
  userName,
  userSignature,
  userAvatar,
  popupAvatar,
  formAvatarSubmitHandler,
  formProfileElement,
  avatarSubmitBtn
} from "../components/modal.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupConfirm from "../components/PopupConfirm.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo";
import FormValidate from "../components/FormValidate.js";

const cardListSection = ".cards"; // Селектор секции с карточками
let currentUserId = {};
let cardList = {};

// Находим кнопки
const profile = document.querySelector(".profile");
const openPopupAvatarBtn = profile.querySelector(".profile__avatar-button");
const openPopupProfileBtn = profile.querySelector(".profile__edit-button");
const openPopupNewCardBtn = profile.querySelector(".profile__add-button");
const formNewCardElement = document.querySelector(".popup_type_new-card").querySelector(".popup__form");
const newCardSubmitBtn = formNewCardElement.querySelector(`${selectorsList.submitButtonSelector}`);

// Создание объекта запросов к серверу
const api = new Api({
  baseURL: "https://nomoreparties.co/v1/plus-cohort-6",
  headers: {
    authorization: "8aaf6757-8c7f-4d9e-9e64-5effc217e908",
    "Content-Type": "application/json",
  },
});

// Создание объекта попапа редактирования аватара
const popupWithFormAvatar = new PopupWithForm(
  {
    handleFormSubmit: (info) => {
      renderLoading(avatarSubmitBtn, true);
      api
        .sendAvatar(info.avatar)
        .then((profileInfo) => {
          renderResultAvatar(profileInfo);
          popupWithFormAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading(avatarSubmitBtn, false);
        });
    },
  },
  ".popup_type_avatar"
);

// Создание объекта попапа создания карточки
const popupNewCard = new PopupWithForm(
  {
    handleFormSubmit: (cardData) => {
      cardData = { name: cardData["place-name"], link: cardData["picture-url"] }; // Записываем в целевой объект значение из полей форм
      renderLoading(newCardSubmitBtn, true);

      api
        .sendNewCard(cardData)
        .then((cardData) => {
          renderResultNewCard(cardData);
          popupNewCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading(newCardSubmitBtn, false);
        });
    },
  },
  ".popup_type_new-card"
);

openPopupAvatarBtn.addEventListener("click", () => {
  popupWithFormAvatar.open();
  formAvatarValidation.toggleButtonState();
});

popupWithFormAvatar.setEventListeners();

const formAvatarValidation = new FormValidate(selectorsList, formAvatarElement);

formAvatarValidation.enableValidation();

// Создание объекта попапа подтверждения
const popupConfirm = new PopupConfirm(
  {
    handleConfirm: ({ cardElement, cardId }, confirmBtn) => {
      confirmBtn.textContent = "Удаление...";
      api
        .deleteCard(cardId)
        .then(() => {
          cardElement.remove();
          popupConfirm.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (confirmBtn.textContent = "Да"));
    },
  },
  ".popup_type_confirm"
);

// Создание объекта попапа с картинкой
const popupWithImage = new PopupWithImage(".popup_type_image");

// Создание объекта валидации формы
const formNewCardValidation = new FormValidate(selectorsList, formNewCardElement);

// Получения начальных данных с сервера
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([profileInfo, initialCards]) => {
    currentUserId = renderResultProfileInfo(profileInfo);
    renderResultInitialCards(initialCards, currentUserId);
  })
  .catch((err) => {
    console.log(err);
  });

// Функция получения информации о профиле с сервера
const renderResultProfileInfo = (profileInfo) => {
  userName.textContent = profileInfo.name;
  userSignature.textContent = profileInfo.about;
  userAvatar.src = profileInfo.avatar;

  return profileInfo._id;
};

// Функция получения начальных карточек
const renderResultInitialCards = (initialCards, currentUserId) => {
  cardList = new Section(
    {
      data: initialCards,
      renderer: (item) => {
        const card = new Card(item, handleToggleLike, handleCardClick, handleRemoveCard, "#js-cards");
        const cardElement = card.createCard(currentUserId);

        cardList.setItem(cardElement);
      },
    },
    cardListSection
  );

  cardList.renderItems();
};

// Функция получения новой карточки
const renderResultNewCard = (item) => {
  const card = new Card(item, handleToggleLike, handleCardClick, handleRemoveCard, "#js-cards");
  const cardElement = card.createCard(currentUserId);

  cardList.addItem(cardElement);
};

// Функция переключения лайка
const handleToggleLike = (evt, cardId) => {
  const card = evt.target.closest(".cards__card");
  const likeCount = card.querySelector(".cards__like-number");

  if (evt.target.classList.contains("cards__like-button_active")) {
    api
      .deleteLikeCard(cardId)
      .then((cardData) => {
        likeCount.textContent = cardData.likes.length;
        evt.target.classList.toggle("cards__like-button_active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .likeCard(cardId)
      .then((cardData) => {
        likeCount.textContent = cardData.likes.length;
        evt.target.classList.toggle("cards__like-button_active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Функция открытия попапа с просмотром фотографии
const handleCardClick = ({ link, name }) => {
  popupWithImage.open({ link, name });
};

// Функция удаления карточки
const handleRemoveCard = ({ cardElement, cardId }) => {
  popupConfirm.open({ cardElement, cardId });
};

// Функция получения аватара
const renderResultAvatar = (profileInfo) => {
  userAvatar.src = profileInfo.avatar;
};

// Функция уведомления пользователя о процессе загрузки
const renderLoading = (submitBtn, isLoading) => {
  if (isLoading) {
    submitBtn.textContent = "Сохранение...";
  } else {
    submitBtn.textContent = "Сохранить";
  }
};

formNewCardValidation.enableValidation();

// Слушаем кнопки отправки форм
popupWithImage.setEventListeners();
popupConfirm.setEventListeners();
popupNewCard.setEventListeners();

// Слушаем кнопки открытия попапов
//openPopupAvatarBtn.addEventListener("click", () => openPopup(popupAvatar));
openPopupProfileBtn.addEventListener("click", openPopupProfile);
openPopupNewCardBtn.addEventListener("click", () => {
  popupNewCard.open();
  formNewCardValidation.toggleButtonState();
});

export { renderResultProfileInfo, renderResultAvatar, renderResultNewCard, renderLoading };
