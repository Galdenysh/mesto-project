import { renderResultInitialCards, renderResultProfileInfo, renderResultNewCard } from "./index.js";

const config = {
  baseURL: "https://nomoreparties.co/v1/plus-cohort-6",
  headers: {
    authorization: "8aaf6757-8c7f-4d9e-9e64-5effc217e908",
    "Content-Type": "application/json",
  },
};

// Функция получения информации о профиле с сервера
const getProfileInfo = () => {
  fetch(`${config.baseURL}/users/me`, { headers: config.headers })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((profileInfo) => {
      renderResultProfileInfo(profileInfo);
    });
};

// Функция получения карточек с сервера
const getInitialCards = () => {
  fetch(`${config.baseURL}/cards`, { headers: config.headers })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((initialCards) => {
      renderResultInitialCards(initialCards);
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((profileInfo) => {
      renderResultProfileInfo(profileInfo);
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((cardData) => {
      renderResultNewCard(cardData);
    });
};

export { getProfileInfo, getInitialCards, sendProfileInfo, sendNewCard };
