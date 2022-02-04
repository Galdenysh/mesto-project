import { renderResultProfileInfo, renderResultInitialCards, renderResultAvatar, renderResultNewCard, renderResultLikeCount } from "./index.js";

// Универсальная функция конфигурации запросов
const config = {
  baseURL: "https://nomoreparties.co/v1/plus-cohort-6",
  headers: {
    authorization: "8aaf6757-8c7f-4d9e-9e64-5effc217e908",
    "Content-Type": "application/json",
  },
};

// Универсальная функция для проверки ответа от сервера
const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

// Функция получения информации о профиле с сервера
const getProfileInfo = () => {
  fetch(`${config.baseURL}/users/me`, {
    headers: config.headers,
  })
    .then((res) => getResponseData(res))
    .then((profileInfo) => {
      renderResultProfileInfo(profileInfo);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Функция получения карточек с сервера
const getInitialCards = () => {
  fetch(`${config.baseURL}/cards`, {
    headers: config.headers,
  })
    .then((res) => getResponseData(res))
    .then((initialCards) => {
      renderResultInitialCards(initialCards);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Функция редактирования аватара
const sendAvatar = (avatarLink) => {
  fetch(`${config.baseURL}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink.value,
    }),
  })
    .then((res) => getResponseData(res))
    .then((profileInfo) => {
      renderResultAvatar(profileInfo);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Функция отправка информации о профиле
const sendProfileInfo = (nameInput, signatureInput) => {
  fetch(`${config.baseURL}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: signatureInput.value,
    }),
  })
    .then((res) => getResponseData(res))
    .then((profileInfo) => {
      renderResultProfileInfo(profileInfo);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Функция отправки новой карточки
const sendNewCard = (cardData) => {
  fetch(`${config.baseURL}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  })
    .then((res) => getResponseData(res))
    .then((cardData) => {
      renderResultNewCard(cardData);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Функция удаления карточки с сервера
const deleteCard = (cardID) => {
  fetch(`${config.baseURL}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => getResponseData(res))
    .catch((err) => {
      console.log(err);
    });
};

// Функция отправки лайка на сервер
const likeCard = (card, cardID) => {
  fetch(`${config.baseURL}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => getResponseData(res))
    .then((cardData) => {
      renderResultLikeCount(card, cardData);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Функция удаления лайка с сервера
const deleteLikeCard = (card, cardID) => {
  fetch(`${config.baseURL}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => getResponseData(res))
    .then((cardData) => {
      renderResultLikeCount(card, cardData);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getProfileInfo, getInitialCards, sendAvatar, sendProfileInfo, sendNewCard, deleteCard, likeCard, deleteLikeCard };
