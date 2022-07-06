import DISPLAY from "../models/displayModel.js";
import { onChangeDisplayMode, onChangePage } from "../routes/router.js";
import renderTable from "../components/renderTable.js";
import renderCards from "./../components/renderCards.js";
import { handleDeletePic } from "../app.js";
import { handleEditPic } from "./picService.js";

import renderCardsFromFavorites from "../components/renderCardsFromFavorites.js";
import { onContentDetails } from "../components/renderSlider.js";
import PAGES from "../models/pageModel.js";
import { FROM_FAVORITES_PAGE_LINK } from "./domService.js";

export const handleDisplayMode = (display, pictures) => {
  onChangeDisplayMode(display, pictures);
  if (display === DISPLAY.TABLE) {
    renderTable(pictures);
    pictures.forEach((pic) => {
      addOnDelete(pic._id);
      addOnEditPic(pictures, pic._id);
    });
  }
  if (display === DISPLAY.CARDS) {
    renderCards(pictures);
    pictures.forEach((pic) => {
      addOnFromFavoritesCards(pic._id, pictures);
      addOnFromContentDetailsCards(pic.url, pictures, pic._id);
    });
  }
};

// הוספת מאזין למחיקת תמונה
const addOnDelete = (id) => {
  document
    .getElementById("delete" + id)
    .addEventListener("click", () => handleDeletePic(id));
};

// הוספת מאזין לעריכת תמונה
export const addOnEditPic = (pictures, id) => {
  document
    .getElementById(`edit${id}`)
    .addEventListener("click", () => handleEditPic(pictures, id));
};

//פרטי תוכן בכרטיסים //
export const addOnFromContentDetailsCards = (url, pictures, id) => {
  document.getElementById(`image${id}`).addEventListener("click", () => {
    onChangePage(PAGES.CONTENT_DETAILS);

    onContentDetails(pictures, url);
  });
};

// סימון העגלת מעודפים
const addCardWagonArry = (wagon) => {
  wagon.classList = "text-info bi bi-cart";

  FROM_FAVORITES_PAGE_LINK.classList =
    "text-info nav-link active cursor bi bi-cart";
};

//  מחיקת סימון העגלת מעודפים

const delitCardWagonArry = (id, wagon) => {
  wagon.classList = "text-black bi bi-cart";

  let card = document.getElementById(`likeContainer${id}`);
  card.remove();

  if (!arrExcess.length) {
    FROM_FAVORITES_PAGE_LINK.classList =
      "nav-link active cursor bi bi-cart text-light";
  }
};

// מאזין למעודפים כרטיסים בדף הראשוני ///

export let arrExcess = [];

export const addOnFromFavoritesCards = (id, pictures) => {
  let wagon = document.getElementById(`like${id}`);

  wagon.addEventListener("click", () => {
    let pic = pictures.find((pic) => pic._id === id);
    let pic2 = arrExcess.find((pic2) => pic2._id === id);
    if (pic2 !== pic) {
      arrExcess.push(pic);
      renderCardsFromFavorites(id, arrExcess);
      addCardWagonArry(wagon);
    } else {
      let pic = arrExcess.filter((pic) => pic._id !== id);
      arrExcess = pic;
      delitCardWagonArry(id, wagon);
    }
  });
};
/// מחיקת הכרטיסים בתוך הדף המעודפים ///
export const delidInSahid = (id, pic) => {
  let wagon1 = document.getElementById(`like2${id}`);
  wagon1.addEventListener("click", () => {
    delitCardWagonArry(id, wagon1);
    arrExcess.pop(pic);
    let wagon = document.getElementById(`like${id}`);
    wagon.classList = "text-black bi bi-cart";
    if (!arrExcess.length) {
      FROM_FAVORITES_PAGE_LINK.classList =
        "nav-link active cursor bi bi-cart text-light";
    }
  });
};

/// אם המערך של המעודפים מלא אז להאזין למחיקת כרטיסים //

export const listeningToDelete = (arrExcess) => {
  if (arrExcess.length) {
    arrExcess.forEach((pic) => {
      delidInSahid(pic._id, pic);
    });
  }
};
