export class FormValidator {
  constructor(selectorsList, formElement) {
    this._selectorsList = selectorsList;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectorsList.inputSelector))
    this._buttonElement = this._formElement.querySelector(this._selectorList.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {

  }

  toggleButtonState () {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._selectorList.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(this._selectorList.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  };
}





// Функция, которая добавляет класс с ошибкой
const showInputError = (selectorList, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Выбираем элемент ошибки на основе уникального класса

  inputElement.classList.add(`${selectorList.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${selectorList.errorClass}`);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (selectorList, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Выбираем элемент ошибки на основе уникального класса

  inputElement.classList.remove(`${selectorList.inputErrorClass}`);
  errorElement.textContent = "";
  errorElement.classList.remove(`${selectorList.errorClass}`);
};

// Функция, которая проверяет валидность поля
const isValid = (selectorList, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(selectorList, formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(selectorList, formElement, inputElement);
  }
};

// Функция, добавляющая слушатель событий всем полям ввода внутри формы
const setEventListeners = (selectorList, formElement) => {
  /*const inputList = Array.from(formElement.querySelectorAll(`${selectorList.inputSelector}`)); // Массив из всех полей формы
  const buttonElement = formElement.querySelector(`${selectorList.submitButtonSelector}`);*/

  toggleButtonState(selectorList, inputList, buttonElement); // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля

  // Каждому элементу добавляем слушатель
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(selectorList, formElement, inputElement);
      toggleButtonState(selectorList, inputList, buttonElement);
    });
  });
};

// Функция проверки наличия невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция включение кнопки при валидности полей
/*const toggleButtonState = (selectorList, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${selectorList.inactiveButtonClass}`);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(`${selectorList.inactiveButtonClass}`);
    buttonElement.removeAttribute("disabled");
  }
};*/

// Функция включения JS валидации для всех форм
const enableValidation = (selectorList) => {
  const formList = Array.from(document.querySelectorAll(`${selectorList.formSelector}`));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Отменим стандартное поведение
    });

    setEventListeners(selectorList, formElement); // Для каждой формы вызовем функцию setEventListeners
  });
};

export { enableValidation, toggleButtonState };
