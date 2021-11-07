// Получение информации профиля
const profileBlock = document.querySelector(".profile");
let userName = profileBlock.querySelector(".profile__name");
let userSignature = profileBlock.querySelector(".profile__signature");

const popupBlock = document.querySelector(".popup"); // Находим попап

// Находим форму и поля формы в DOM
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__form-item_select_name");
const signatureInput = formElement.querySelector(".popup__form-item_select_signature");

// Функция открытия попапа
function openPopup() {
  // Ниже заполнение полей форм из информации профиля
  nameInput.value = userName.textContent;
  signatureInput.value = userSignature.textContent;

  popupBlock.classList.add("popup_opened"); // Открытие попапа
}

// Функция закрытия попапа
function closePopup() {
  popupBlock.classList.remove("popup_opened");
}

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы

    // Записываем в профиль значение из полей форм
    userName.textContent = nameInput.value;
    userSignature.textContent = signatureInput.value;
}

const cardsBlock = document.querySelector(".cards");

function likeToggle() {
  let cardsLike = cardsBlock.querySelector(".cards__like-button");
  cardsLike.classList.toggle("cards__like-button_active");
}

// Находим кнопки
const openPopupBtn = profileBlock.querySelector(".profile__edit-button");
const closePopupBtn = popupBlock.querySelector(".popup__close-button");
const cardsLikeBtn = cardsBlock.querySelector(".cards__like-button");

// Слушаем кнопки
cardsLikeBtn.addEventListener("click", likeToggle);
openPopupBtn.addEventListener("click", openPopup);
closePopupBtn.addEventListener("click", closePopup);

// Слушаем отправку формы
formElement.addEventListener('submit', formSubmitHandler);