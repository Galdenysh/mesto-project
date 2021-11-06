let popup = document.querySelector(".popup");
let profile = document.querySelector(".profile");
let openPopupBtn = profile.querySelector(".profile__edit-button");
let closePopupBtn = popup.querySelector(".popup__close-button");

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

openPopupBtn.addEventListener("click", openPopup);
closePopupBtn.addEventListener("click", closePopup);