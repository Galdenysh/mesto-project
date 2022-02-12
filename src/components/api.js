// Универсальная функция конфигурации запросов
/*const config = {
  baseURL: "https://nomoreparties.co/v1/plus-cohort-6",
  headers: {
    authorization: "8aaf6757-8c7f-4d9e-9e64-5effc217e908",
    "Content-Type": "application/json",
  },
};*/

// Этот экземпляр класса необходимо перенести в index.js
const api = new Api({
  baseURL: "https://nomoreparties.co/v1/plus-cohort-6",
  headers: {
    authorization: "8aaf6757-8c7f-4d9e-9e64-5effc217e908",
    "Content-Type": "application/json",
  },
});

export default class Api {
  constructor(options) {
    this._url = options.baseURL;
    this._headers = options.headers;
  }

  getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => getResponseData(res));
  };

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => getResponseData(res));
  };

  sendAvatar(avatarInput) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarInput.value,
      }),
    }).then((res) => getResponseData(res));
  };

  sendProfileInfo(nameInput, signatureInput) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nameInput.value,
        about: signatureInput.value,
      }),
    }).then((res) => getResponseData(res));
  };

  sendNewCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then((res) => getResponseData(res));
  };

  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => getResponseData(res));
  };

  likeCard(cardID) {
    return fetch(`${this._url}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => getResponseData(res));
  };

  deleteLikeCard(cardID) {
    return fetch(`${this._url}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => getResponseData(res));
  };
}

// Универсальная функция для проверки ответа от сервера
/*const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

// Функция получения информации о профиле с сервера
/*const getProfileInfo = () => {
  return fetch(`${config.baseURL}/users/me`, {
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

// Функция получения карточек с сервера
/*const getInitialCards = () => {
  return fetch(`${config.baseURL}/cards`, {
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

// Функция редактирования аватара
/*const sendAvatar = (avatarInput) => {
  return fetch(`${config.baseURL}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarInput.value,
    }),
  }).then((res) => getResponseData(res));
};

// Функция отправка информации о профиле
/*const sendProfileInfo = (nameInput, signatureInput) => {
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
/*const sendNewCard = (cardData) => {
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
/*const deleteCard = (cardID) => {
  return fetch(`${config.baseURL}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

// Функция отправки лайка на сервер
/*const likeCard = (cardID) => {
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

export { getProfileInfo, getInitialCards, sendAvatar, sendProfileInfo, sendNewCard, deleteCard, likeCard, deleteLikeCard };*/


