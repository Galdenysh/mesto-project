// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Выбираем элемент ошибки на основе уникального класса

  inputElement.classList.add("popup__form-item_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__form-item-error_active");
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Выбираем элемент ошибки на основе уникального класса

  inputElement.classList.remove("popup__form-item_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__form-item-error_active");
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

// Функция, добавляющая слушатель событий всем полям ввода внутри формы
const setFormEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__form-item")); // Массив из всех полей формы
  const buttonElement = formElement.querySelector(".popup__save-button");

  toggleButtonState(inputList, buttonElement); // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля

  // Каждому элементу добавляем слушатель
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Функция включения JS валидации для всех форм
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Отменим стандартное поведение
    });

    setFormEventListeners(formElement); // Для каждой формы вызовем функцию setFormEventListeners
  });
};

// Функция проверки наличия невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция включение кнопки при валидности полей
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save-button_inactive");
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove("popup__save-button_inactive");
    buttonElement.removeAttribute("disabled");
  }
};
