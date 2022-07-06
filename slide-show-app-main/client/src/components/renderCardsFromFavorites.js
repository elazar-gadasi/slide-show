import { CARDS_ROW_FROM_FAVORITES } from "../services/domService.js";

//// יצירת כרטיס במעודפים
const renderCardsFromFavorites = (id, cards = []) => {
  cards.map((card) => {
    const { _id, url, alt, price, credits } = card;

    if (id === _id) {
      CARDS_ROW_FROM_FAVORITES.innerHTML += `

      
              <div class="card col-12 col-md-6 col-xl-4 col-xxl-3 mb-2 px-0 "id="likeContainer${_id}">
              <img
                src="${url}"
                alt="${alt}"
                class="card-img-top"
              />
              <div class="card-body">
                <h5 class="card-title">${alt}</h5>
                <p>Credits: <span class="fw-bold">${credits}</span></p>
                <hr />
                <div class="justify-content-between d-flex">
                  <div>Price: <span class="fw-bold">${price}</span>$</div>
                  <div class="bi bi-cart cursor text-info " id="like2${_id}"></div>
                </div>
              </div>
            </div>
              `;
    }
  });
};

export default renderCardsFromFavorites;
