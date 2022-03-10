export default class FormValidator {
  constructor(selectorsList, formElement) {
    this._selectorsList = selectorsList;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(`${this._selectorsList.inputSelector}`));
    this._buttonElement = this._formElement.querySelector(`${this._selectorsList.submitButtonSelector}`);
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(`${this._selectorsList.inactiveButtonClass}`);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(`${this._selectorsList.inactiveButtonClass}`);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(`${this._selectorsList.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._selectorsList.errorClass}`);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(`${this._selectorsList.inputErrorClass}`);
    errorElement.textContent = "";
    errorElement.classList.remove(`${this._selectorsList.errorClass}`);
  }
}
