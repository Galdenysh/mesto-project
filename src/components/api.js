export default class Api {
  constructor(options) {
    this._url = options.baseURL;
    this._headers = options.headers;
  }

  // Универсальная функция для проверки ответа от сервера
  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  // Функция получения информации о профиле с сервера
  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  // Функция получения карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  // Функция редактирования аватара
  sendAvatar(avatarInput) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarInput.value,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // Функция отправка информации о профиле
  sendProfileInfo(nameInput, signatureInput) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nameInput.value,
        about: signatureInput.value,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // Функция отправки новой карточки
  sendNewCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // Функция удаления карточки с сервера
  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  // Функция отправки лайка на сервер
  likeCard(cardID) {
    return fetch(`${this._url}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  // Функция удаления лайка с сервера
  deleteLikeCard(cardID) {
    return fetch(`${this._url}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
}
