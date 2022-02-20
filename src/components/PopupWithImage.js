import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open({ link, name }) {
    const pictureLink = this._popup.querySelector(".popup__big-image");
    const pictureName = this._popup.querySelector(".popup__image-caption");

    pictureLink.src = link;
    pictureLink.alt = name;
    pictureName.textContent = name;

    super.open();
  }
}
