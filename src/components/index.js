import "../pages/index.css";

import { selectorsList } from "./constants";
// import { enableValidation } from "./validate.js";
// import { addStartCard, addCard } from "./card.js";
import {
  openPopup,
  openPopupProfile,
  closePopup,
  formAvatarElement,
  formProfileSubmitHandler,
  formNewCardSubmitHandler,
  profile,
  userName,
  userSignature,
  userAvatar,
  popupAvatar,
  popupNewCard,
  formAvatarSubmitHandler,
  formProfileElement,
  formNewCardElement,
} from "./modal.js";
// import { getProfileInfo, getInitialCards } from "./api.js";
import Api from "./Api.js";
import Card from "./Card.js";
import Section from "./Section.js";
import { UserInfo } from "./UserInfo";

const api = new Api({
  baseURL: "https://nomoreparties.co/v1/plus-cohort-6",
  headers: {
    authorization: "8aaf6757-8c7f-4d9e-9e64-5effc217e908",
    "Content-Type": "application/json",
  },
});

const cardListSection = ".cards"; // Селектор секции с карточками
const popups = document.querySelectorAll(".popup");

// Находим кнопки
const openPopupAvatarBtn = profile.querySelector(".profile__avatar-button");
const openPopupProfileBtn = profile.querySelector(".profile__edit-button");
const openPopupNewCardBtn = profile.querySelector(".profile__add-button");

// Получения начальных данных с сервера
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([profileInfo, initialCards]) => {
    const currentUserId = renderResultProfileInfo(profileInfo);
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
  const cardList = new Section(
    {
      data: initialCards,
      renderer: (item) => {
        const card = new Card(item, handleToggleLike, "#js-cards");
        const cardElement = card.createCard(currentUserId);

        cardList.setItem(cardElement);
      },
    },
    cardListSection
  );

  cardList.renderItems();
};

// Функция переключения лайка
const handleToggleLike = (evt, cardId) => {
  const card = evt.target.closest(".cards__card");

  if (evt.target.classList.contains("cards__like-button_active")) {
    api
      .deleteLikeCard(cardId)
      .then((cardData) => {
        renderResultLikeCount(card, cardData);
        evt.target.classList.toggle("cards__like-button_active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .likeCard(cardId)
      .then((cardData) => {
        renderResultLikeCount(card, cardData);
        evt.target.classList.toggle("cards__like-button_active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Функция получения аватара
const renderResultAvatar = (profileInfo) => {
  userAvatar.src = profileInfo.avatar;
};

// Функция получения новой карточки
const renderResultNewCard = (cardData) => {
  addCard(cardData);
};

// Функция обновления лайка
const renderResultLikeCount = (card, cardData) => {
  card.querySelector(".cards__like-number").textContent = cardData.likes.length;
};

// Функция уведомления пользователя о процессе загрузки
const renderLoading = (submitBtn, isLoading) => {
  if (isLoading) {
    submitBtn.textContent = "Сохранение...";
  } else {
    submitBtn.textContent = "Сохранить";
  }
};

// enableValidation(selectorsList); // Вызов функции валидации форм

// // Функция навешивания слушателей на все попапы
// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (evt) => {
//     // Если был клик по открытому оверлею, то закроем попап
//     if (evt.target.classList.contains("popup_opened")) {
//       closePopup(popup);
//     }
//     // Если нажата кнопка закрытия, то закроем попап
//     if (evt.target.classList.contains("popup__close-button")) {
//       closePopup(popup);
//     }
//   });
// });

// Слушаем кнопки
openPopupAvatarBtn.addEventListener("click", () => openPopup(popupAvatar));
openPopupProfileBtn.addEventListener("click", openPopupProfile);
openPopupNewCardBtn.addEventListener("click", () => openPopup(popupNewCard));

// Слушаем отправку формы
formAvatarElement.addEventListener("submit", formAvatarSubmitHandler);
formProfileElement.addEventListener("submit", formProfileSubmitHandler);
formNewCardElement.addEventListener("submit", formNewCardSubmitHandler);

export { api, renderResultInitialCards, renderResultProfileInfo, renderResultAvatar, renderResultNewCard, renderResultLikeCount, renderLoading };
