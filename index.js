// Получение информации профиля
const profileBlock = document.querySelector(".profile");
const userName = profileBlock.querySelector(".profile__name");
const userSignature = profileBlock.querySelector(".profile__signature");

// Находим форму и поля формы пользователя
const popupEditBlock = document.querySelector("#js-popup-edit"); // Находим попап пользователя
const formEditElement = popupEditBlock.querySelector(".popup__form");
const nameInput = formEditElement.querySelector(".popup__form-item_select_name");
const signatureInput = formEditElement.querySelector(".popup__form-item_select_signature");

// Функция открытия попапа редактирования пользователя
function openPopupEdit() {
  popupEditBlock.classList.add("popup_opened");

  // Ниже заполнение полей форм из информации профиля
  nameInput.value = userName.textContent;
  signatureInput.value = userSignature.textContent;
}

// Функция закрытия попапа редактирования пользователя
function closePopupEdit() {
  popupEditBlock.classList.remove("popup_opened");
}

// Обработчик «отправки» формы данных пользователя
function formEditSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы

    // Записываем в профиль значение из полей форм
    userName.textContent = nameInput.value;
    userSignature.textContent = signatureInput.value;

    closePopupEdit();
}

// Находим форму добавления места
const popupAddBlock = document.querySelector("#js-popup-add"); // Находим попап добавления места
const formAddElement = popupAddBlock.querySelector(".popup__form");
const placeNameInput = formAddElement.querySelector(".popup__form-item_select_place-name");
const pictureUrlInput = formAddElement.querySelector(".popup__form-item_select_picture-url");

// Функция открытия попапа добавления места
function openPopupAdd() {
  popupAddBlock.classList.add("popup_opened");

  // Ниже опусташаем поля формы
  placeNameInput.value = "";
  pictureUrlInput.value = "";
}

// Функция закрытия попапа добавления места
function closePopupAdd() {
  popupAddBlock.classList.remove("popup_opened");
}

// Обработчик «отправки» формы добавления места
function formAddSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы

  // Записываем в переменные значение из полей форм
  const placeName = placeNameInput.value;
  const pictureUrl = pictureUrlInput.value;

  closePopupAdd();
  addCard(placeName, pictureUrl); // вызываем функцию добавления карточки и посылаем значения форм
}

// Функция добавления карточки
function addCard(placeName, pictureUrl) {
  const cardTemplate = document.querySelector("#js-cards").content;
  const cardElement = cardTemplate.querySelector(".cards__card").cloneNode(true);

  // Заполняем карточку
  cardElement.querySelector(".cards__title").textContent = placeName;
  cardElement.querySelector(".cards__place").src = pictureUrl;
  cardElement.querySelector(".cards__place").alt = placeName;

  // Реализация лайка
  cardElement.querySelector('.cards__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle("cards__like-button_active");
  });

  document.querySelector(".cards").append(cardElement); // Пушим карточку
}

// Находим кнопки
const openPopupEditBtn = profileBlock.querySelector(".profile__edit-button");
const openPopupAddBtn = profileBlock.querySelector(".profile__add-button");
const closePopupEditBtn = popupEditBlock.querySelector(".popup__close-button");
const closePopupAddBtn = popupAddBlock.querySelector(".popup__close-button")

// Слушаем кнопки
openPopupEditBtn.addEventListener("click", openPopupEdit);
openPopupAddBtn.addEventListener("click", openPopupAdd);
closePopupEditBtn.addEventListener("click", closePopupEdit);
closePopupAddBtn.addEventListener("click", closePopupAdd);

// Слушаем отправку формы
formEditElement.addEventListener("submit", formEditSubmitHandler);
formAddElement.addEventListener("submit", formAddSubmitHandler);