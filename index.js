// Получение информации профиля
const profileBlock = document.querySelector(".profile");
let userName = profileBlock.querySelector(".profile__name");
let userSignature = profileBlock.querySelector(".profile__signature");

const popupEditBlock = document.querySelector("#js-popup-edit"); // Находим попап пользователя

// Находим форму и поля формы в DOM
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__form-item_select_name");
const signatureInput = formElement.querySelector(".popup__form-item_select_signature");

// Ниже заполнение полей форм из информации профиля
nameInput.value = userName.textContent;
signatureInput.value = userSignature.textContent;

// Функция открытия попапа редактирования пользователя
function openPopupEdit() {
  popupEditBlock.classList.add("popup_opened");
}

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы

    // Записываем в профиль значение из полей форм
    userName.textContent = nameInput.value;
    userSignature.textContent = signatureInput.value;

    closePopupEdit();
}

// Функция закрытия попапа редактирования пользователя
function closePopupEdit() {
  popupEditBlock.classList.remove("popup_opened");
}

const popupAddBlock = document.querySelector("#js-popup-add"); // Находим попап добавления места

// Функция открытия попапа добавления места
function openPopupAdd() {
  popupAddBlock.classList.add("popup_opened");
}

// Функция закрытия попапа добавления места
function closePopupAdd() {
  popupAddBlock.classList.remove("popup_opened");
}

const cardsBlock = document.querySelector(".cards");

function likeToggle() {
  let cardsLike = cardsBlock.querySelector(".cards__like-button");
  cardsLike.classList.toggle("cards__like-button_active");
}

// Находим кнопки
const openPopupEditBtn = profileBlock.querySelector(".profile__edit-button");
const openPopupAddBtn = profileBlock.querySelector(".profile__add-button");
const closePopupEditBtn = popupEditBlock.querySelector(".popup__close-button");
const closePopupAddBtn = popupAddBlock.querySelector(".popup__close-button")
const cardsLikeBtn = cardsBlock.querySelector(".cards__like-button");

// Слушаем кнопки
cardsLikeBtn.addEventListener("click", likeToggle);
openPopupEditBtn.addEventListener("click", openPopupEdit);
openPopupAddBtn.addEventListener("click", openPopupAdd);
closePopupEditBtn.addEventListener("click", closePopupEdit);
closePopupAddBtn.addEventListener("click", closePopupAdd);

// Слушаем отправку формы
formElement.addEventListener('submit', formSubmitHandler);