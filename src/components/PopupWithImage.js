import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._pictureLink = this._popup.querySelector(".popup__big-image");
    this._pictureName = this._popup.querySelector(".popup__image-caption");
  }

  open({ link, name }) {
    this._pictureLink.src = link;
    this._pictureLink.alt = name;
    this._pictureName.textContent = name;

    super.open();
  }
}
