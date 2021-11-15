// Получение информации профиля
const profileBlock = document.querySelector(".profile");
const userName = profileBlock.querySelector(".profile__name");
const userSignature = profileBlock.querySelector(".profile__signature");

// Находим форму и поля формы пользователя
const popupEditProfile = document.querySelector(".popup_type_edit"); // Находим попап пользователя
const formEditElement = popupEditProfile.querySelector(".popup__form");
const nameInput = formEditElement.querySelector(".popup__form-item_select_name");
const signatureInput = formEditElement.querySelector(".popup__form-item_select_signature");

// Находим форму добавления места
const popupAddNewCard = document.querySelector(".popup_type_add"); // Находим попап добавления места
const formAddElement = popupAddNewCard.querySelector(".popup__form");
const placeNameInput = formAddElement.querySelector(".popup__form-item_select_place-name");
const pictureUrlInput = formAddElement.querySelector(".popup__form-item_select_picture-url");

const popupImageBlock = document.querySelector(".popup_type_image"); // Находим попап с просмотром фотографии

// Находим кнопки
const openPopupEditBtn = profileBlock.querySelector(".profile__edit-button");
const openPopupAddBtn = profileBlock.querySelector(".profile__add-button");
const closePopupEditBtn = popupEditProfile.querySelector(".popup__close-button");
const closePopupAddBtn = popupAddNewCard.querySelector(".popup__close-button");
const closePopupImageBtn = popupImageBlock.querySelector(".popup__close-button");

// Добавление начальных карточек
initialCards.forEach(function (cardData) {
  addCard(cardData);
});

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Функция открытия попапа пользователя и заполнения полей формы из информации профиля
function openPopupEdit() {
  nameInput.value = userName.textContent;
  signatureInput.value = userSignature.textContent;

  openPopup(popupEditProfile);
}

// Функция открытия попапа с просмотром фотографии
function openPopupImage(cardData) {
  popupImageBlock.querySelector(".popup__big-image").src = cardData.link;
  popupImageBlock.querySelector(".popup__big-image").alt = cardData.name;
  popupImageBlock.querySelector(".popup__image-caption").textContent = cardData.name;

  openPopup(popupImageBlock);
}

// Обработчик «отправки» формы данных пользователя
function formEditSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы

  // Записываем в профиль значение из полей форм
  userName.textContent = nameInput.value;
  userSignature.textContent = signatureInput.value;

  closePopup(popupEditProfile);
}

// Обработчик «отправки» формы добавления места
function formAddSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы

  // Записываем в целевой объект значение из полей форм
  const cardData = { name: placeNameInput.value, link: pictureUrlInput.value };

  closePopup(popupAddNewCard);
  addCard(cardData); // вызываем функцию добавления карточки и посылаем значения форм
  formAddElement.reset(); // Опусташаем поля формы
}

// Функция создания карточки
function createCard(cardData) {
  const cardTemplate = document.querySelector("#js-cards").content;
  const cardElement = cardTemplate.querySelector(".cards__card").cloneNode(true);
  const cardPlace = cardElement.querySelector(".cards__place");
  const cardTitle = cardElement.querySelector(".cards__title");

  // Заполняем карточку
  cardTitle.textContent = cardData.name;
  cardPlace.src = cardData.link;
  cardPlace.alt = cardData.name;

  return cardElement;
}

// Функция добавления карточки
function addCard(cardData) {
  const cardElement = createCard(cardData);

  document.querySelector(".cards").prepend(cardElement); // Пушим карточку

  // Слушаем взаимодействия с карточками
  cardElement.querySelector(".cards__like-button").addEventListener("click", likeCard);
  cardElement.querySelector(".cards__place").addEventListener("click", () => openPopupImage(cardData));
  cardElement.querySelector(".cards__remove-button").addEventListener("click", () => removeCard(cardElement));
}

// Функция переключения лайка
function likeCard(evt) {
  evt.target.classList.toggle("cards__like-button_active");
}

// Функция удаления карточки
function removeCard(cardElement) {
  cardElement.remove();
}

// Слушаем кнопки
openPopupEditBtn.addEventListener("click", openPopupEdit);
openPopupAddBtn.addEventListener("click", () => openPopup(popupAddNewCard));
closePopupEditBtn.addEventListener("click", () => closePopup(popupEditProfile));
closePopupAddBtn.addEventListener("click", () => closePopup(popupAddNewCard));
closePopupImageBtn.addEventListener("click", () => closePopup(popupImageBlock));

// Слушаем отправку формы
formEditElement.addEventListener("submit", formEditSubmitHandler);
formAddElement.addEventListener("submit", formAddSubmitHandler);
