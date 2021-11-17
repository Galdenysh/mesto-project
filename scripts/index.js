// Получение информации профиля
const profile = document.querySelector(".profile");
const userName = profile.querySelector(".profile__name");
const userSignature = profile.querySelector(".profile__signature");

const cards = document.querySelector(".cards"); // Находим секцию с карточками

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

// Находим попап с просмотром фотографии и его элементы
const popupImageFullscreen = document.querySelector(".popup_type_image");
const pictureLink = popupImageFullscreen.querySelector(".popup__big-image");
const pictureName = popupImageFullscreen.querySelector(".popup__image-caption");

// Находим кнопки
const openPopupEditBtn = profile.querySelector(".profile__edit-button");
const openPopupAddBtn = profile.querySelector(".profile__add-button");
const closePopupEditBtn = popupEditProfile.querySelector(".popup__close-button");
const closePopupAddBtn = popupAddNewCard.querySelector(".popup__close-button");
const closePopupImageBtn = popupImageFullscreen.querySelector(".popup__close-button");

// Добавление начальных карточек
initialCards.forEach(function (cardData) {
  addStartCard(cardData);
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
  pictureLink.src = cardData.link;
  pictureLink.alt = cardData.name;
  pictureName.textContent = cardData.name;

  openPopup(popupImageFullscreen);
}

// Функция закрытия попапа по клику вне модального окна
function closePopupOverlay(evt, popup) {
  if (evt.target == popup) {
    closePopup(popup);
  }
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

  addCard(cardData); // вызываем функцию добавления карточки и посылаем значения форм
  formAddElement.reset(); // Опусташаем поля формы

  closePopup(popupAddNewCard);
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

  setEventListeners(cardElement, cardData); // Вызываем функцию для прослушивания событий

  return cardElement;
}

// Функция добавления начальных карточек
function addStartCard(cardData) {
  const cardElement = createCard(cardData);

  cards.append(cardElement); // Пушим карточку
}

// Функция добавления карточки
function addCard(cardData) {
  const cardElement = createCard(cardData);

  cards.prepend(cardElement); // Пушим карточку
}

// Функция переключения лайка
function toggleLike(evt) {
  evt.target.classList.toggle("cards__like-button_active");
}

// Функция удаления карточки
function removeCard(cardElement) {
  cardElement.remove();
}

// Функция прослушивания взаимодействия с карточками
function setEventListeners(cardElement, cardData) {
  cardElement.querySelector(".cards__like-button").addEventListener("click", toggleLike);
  cardElement.querySelector(".cards__place").addEventListener("click", () => openPopupImage(cardData));
  cardElement.querySelector(".cards__remove-button").addEventListener("click", () => removeCard(cardElement));
}

// Слушаем клики вне модального окна
popupEditProfile.addEventListener("click", (evt) => closePopupOverlay(evt, popupEditProfile));
popupAddNewCard.addEventListener("click", (evt) => closePopupOverlay(evt, popupAddNewCard));
popupImageFullscreen.addEventListener("click", (evt) => closePopupOverlay(evt, popupImageFullscreen));

// Слушаем кнопки
openPopupEditBtn.addEventListener("click", openPopupEdit);
openPopupAddBtn.addEventListener("click", () => openPopup(popupAddNewCard));
closePopupEditBtn.addEventListener("click", () => closePopup(popupEditProfile));
closePopupAddBtn.addEventListener("click", () => closePopup(popupAddNewCard));
closePopupImageBtn.addEventListener("click", () => closePopup(popupImageFullscreen));

// Слушаем отправку формы
formEditElement.addEventListener("submit", formEditSubmitHandler);
formAddElement.addEventListener("submit", formAddSubmitHandler);
