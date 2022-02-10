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
  return fetch(`${config.baseURL}/users/me`, {
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

// Функция получения карточек с сервера
const getInitialCards = () => {
  return fetch(`${config.baseURL}/cards`, {
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

// Функция редактирования аватара
const sendAvatar = (avatarInput) => {
  return fetch(`${config.baseURL}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarInput.value,
    }),
  }).then((res) => getResponseData(res));
};

// Функция отправка информации о профиле
const sendProfileInfo = (nameInput, signatureInput) => {
  return fetch(`${config.baseURL}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: signatureInput.value,
    }),
  }).then((res) => getResponseData(res));
};

// Функция отправки новой карточки
const sendNewCard = (cardData) => {
  return fetch(`${config.baseURL}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then((res) => getResponseData(res));
};

// Функция удаления карточки с сервера
const deleteCard = (cardID) => {
  return fetch(`${config.baseURL}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

// Функция отправки лайка на сервер
const likeCard = (cardID) => {
  return fetch(`${config.baseURL}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

// Функция удаления лайка с сервера
const deleteLikeCard = (cardID) => {
  return fetch(`${config.baseURL}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

export { getProfileInfo, getInitialCards, sendAvatar, sendProfileInfo, sendNewCard, deleteCard, likeCard, deleteLikeCard };

//test
