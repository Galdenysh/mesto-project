import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, selector) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__form-item");
    this._submitBtn = this._popup.querySelector(".popup__save-button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  open(formValues = {}) {
    super.open();
    this._inputList.forEach((input) => {
      input.value = formValues[input.name] || "";
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = "Сохранение...";
    } else {
      this._submitBtn.textContent = "Сохранить";
    }
  }

  _getInputValues = () => {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  };
}
