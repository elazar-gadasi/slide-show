import {
  SLIDER_IMAGE,
  SLIDER_CREDITS,
  CONTENT_DETAILS_ID,
  CONTENT_DETAILS_TITEL,
  CONTENT_DETAILS_IMAGE,
  CONTENT_DETAILS_CREATED_AT,
  CONTENT_DETAILS_PRICE,
  CONTENT_DETAILS_CREATED_BY,
} from "../services/domService.js";

/********** הדפסה לדף הגולש **********/
export const renderSlider = (pictures, counter = 0) => {
  if (!pictures.length) return null;
  SLIDER_IMAGE.src = pictures[counter].url;
  SLIDER_IMAGE.alt = pictures[counter].alt;
  SLIDER_CREDITS.innerHTML = pictures[counter].credits;
};

export const onContentDetails = (pictures, url) => {
  let pic = pictures.find((pic) => pic.url === url);

  CONTENT_DETAILS_ID.innerHTML = pic._id;
  CONTENT_DETAILS_CREATED_AT.innerHTML = pic.createdAt;
  CONTENT_DETAILS_PRICE.innerHTML = pic.price;
  CONTENT_DETAILS_TITEL.innerHTML = pic.alt;
  CONTENT_DETAILS_CREATED_BY.innerHTML = pic.credits;
  CONTENT_DETAILS_IMAGE.src = pic.url;
};

// לולאה שמוזיזה את התמונות כל שתי שניות
let cunter = 0;
export const setCounterOtomats = (pictures) => {
  SLIDER_IMAGE.src = pictures[cunter].url;
  SLIDER_IMAGE.alt = pictures[cunter].alt;
  SLIDER_CREDITS.innerHTML = pictures[cunter].credits;

  if (cunter !== 0) {
    cunter--;
  } else {
    cunter = pictures.length - 1;
  }
};
