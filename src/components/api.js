import { renderResultInitialCards, renderResultProfileInfo } from "./index.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-6",
  headers: {
    authorization: "8aaf6757-8c7f-4d9e-9e64-5effc217e908",
    "Content-Type": "application/json",
  },
};

// Получение карточек с сервера
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
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

// Получение информации о профиле с сервера
const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
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

export { getInitialCards, getProfileInfo };
