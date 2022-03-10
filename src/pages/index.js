import "../pages/index.css";

import {
  selectorsList,
  cardListSection,
  openPopupAvatarBtn,
  openPopupProfileBtn,
  openPopupNewCardBtn,
  formAvatarElement,
  formProfileElement,
  formNewCardElement,
  userName,
  userSignature,
  userAvatar,
} from "../utils/constants.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupConfirm from "../components/PopupConfirm.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo";
import FormValidate from "../components/FormValidate.js";

let currentUserId = {};
let cardList = {};

// Создание объекта запросов к серверу
const api = new Api({
  baseURL: "https://nomoreparties.co/v1/plus-cohort-6",
  headers: {
    authorization: "8aaf6757-8c7f-4d9e-9e64-5effc217e908",
    "Content-Type": "application/json",
  },
});

// Создание объекта получения информации профиля
const userInfoObj = new UserInfo(userName, userSignature, userAvatar);

// Создание объекта попапа редактирования аватара
const popupWithFormAvatar = new PopupWithForm(
  {
    handleFormSubmit: (info) => {
      popupWithFormAvatar.renderLoading(true);
      api
        .sendAvatar(info.avatar)
        .then((profileInfo) => {
          userInfoObj.setUserInfo(profileInfo);
          popupWithFormAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormAvatar.renderLoading(false);
        });
    },
  },
  ".popup_type_avatar"
);

// Создание объекта попапа редактирования профиля
const popupWithFormProfile = new PopupWithForm(
  {
    handleFormSubmit: (info) => {
      popupWithFormProfile.renderLoading(true);
      api
        .sendProfileInfo(info.name, info.signature)
        .then((profileInfo) => {
          userInfoObj.setUserInfo(profileInfo);
          popupWithFormProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormProfile.renderLoading(false);
        });
    },
  },
  ".popup_type_profile"
);

// Создание объекта попапа создания карточки
const popupNewCard = new PopupWithForm(
  {
    handleFormSubmit: (cardData) => {
      cardData = { name: cardData["place-name"], link: cardData["picture-url"] }; // Записываем в целевой объект значение из полей форм
      popupNewCard.renderLoading(true);

      api
        .sendNewCard(cardData)
        .then((cardData) => {
          cardList.addItem(createCard(cardData));
          popupNewCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupNewCard.renderLoading(false);
        });
    },
  },
  ".popup_type_new-card"
);

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

// Создание объектов валидации формы
const formAvatarValidation = new FormValidate(selectorsList, formAvatarElement);
const formProfileValidation = new FormValidate(selectorsList, formProfileElement);
const formNewCardValidation = new FormValidate(selectorsList, formNewCardElement);

// Получения начальных данных с сервера
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([profileInfo, initialCards]) => {
    currentUserId = profileInfo._id;
    userInfoObj.setUserInfo(profileInfo);
    renderResultInitialCards(initialCards, currentUserId);
  })
  .catch((err) => {
    console.log(err);
  });

// Функция получения начальных карточек
const renderResultInitialCards = (initialCards) => {
  cardList = new Section(
    {
      data: initialCards,
      renderer: (item) => {
        cardList.setItem(createCard(item));
      },
    },
    cardListSection
  );

  cardList.renderItems();
};

// Функция создания новой карточки
const createCard = (item) => {
  const card = new Card(item, handleToggleLike, handleCardClick, handleRemoveCard, "#js-cards");
  const cardElement = card.createCard(currentUserId);

  return cardElement;
};

// Функция переключения лайка
const handleToggleLike = (card) => {
  if (card.getIsLiked()) {
    api
      .deleteLikeCard(card.getId())
      .then((cardData) => {
        card.updateLikes(cardData);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .likeCard(card.getId())
      .then((cardData) => {
        card.updateLikes(cardData);
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

// Включение валидации форм
formAvatarValidation.enableValidation();
formProfileValidation.enableValidation();
formNewCardValidation.enableValidation();

// Слушаем кнопки отправки форм
popupWithFormAvatar.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();
popupConfirm.setEventListeners();
popupNewCard.setEventListeners();

// Слушаем кнопки открытия попапов
openPopupAvatarBtn.addEventListener("click", () => {
  popupWithFormAvatar.open();
  formAvatarValidation.resetValidation();
});
openPopupProfileBtn.addEventListener("click", () => {
  popupWithFormProfile.open(userInfoObj.getUserInfo());
  formProfileValidation.resetValidation();
});
openPopupNewCardBtn.addEventListener("click", () => {
  popupNewCard.open();
  formNewCardValidation.resetValidation();
});
