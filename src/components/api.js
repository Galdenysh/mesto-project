import { addStartCard } from "./card.js";

const cardsRequest = () => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-6/cards", {
    headers: {
      authorization: "8aaf6757-8c7f-4d9e-9e64-5effc217e908",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      renderResult(result);
      console.log(result);
    });
};

function renderResult(result) {
  const initialCards = result;

  initialCards.forEach(function (cardData) {
    addStartCard(cardData);
  });
}

export { cardsRequest };
