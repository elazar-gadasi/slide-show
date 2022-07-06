import PAGES from "./models/pageModel.js";
import { onChangePage, setNavDisplay } from "./routes/router.js";
import {
  onContentDetails,
  renderSlider,
  setCounterOtomats,
} from "./components/renderSlider.js";
import { setCounter } from "./services/sliderService.js";
import initialData from "./initialData/initialData.js";

import {
  HOME_PAGE_LINK,
  ABOUT_PAGE_LINK,
  CREATE_PIC_PAGE_LINK,
  LOGIN_PAGE_LINK,
  LINK_TO_HOME_PAGE,
  SLIDER_PREV_BTN,
  SLIDER_NEXT_BTN,
  SIGNUP_PAGE_LINK,
  LOGOUT_LINK,
  TABLE_ICON,
  SLIDER_ICON,
  CARDS_ICON,
  SORT_DOWN_ICON,
  SORT_UP_ICON,
  SEARCH_BAR,
  USER_UPDATE_PAGE_LINK,
  EMAIL_USER_UPDATE_FIELD,
  EMAIL_LOGIN_FIELD,
  SLIDER_IMAGE,
  FROM_FAVORITES_PAGE_LINK,
  GOTO_LINK_CREATE_PIC,
  GOTO_LINK_TO_HOME_PAGE,
  NO_DATA_CONTAINER,
  DATA_CONTAINER,
} from "./services/domService.js";
import {
  handleCancelCreateNewPic,
  handleCreatePic,
  onCancelEditPic,
  onCreateNewPic,
  onEditPic,
} from "./services/picService.js";
import {
  handleCancelLogin,
  handleLogin,
  handleSignup,
  handleUserUpdate,
  onSignupNewUser,
  onUserUpdate,
} from "./services/userService.js";
import { removeItemFromLocalStorage } from "./services/localStorageService.js";
import DISPLAY from "./models/displayModel.js";
import {
  arrExcess,
  handleDisplayMode,
  listeningToDelete,
} from "./services/displayModeService.js";
import {
  filterArrayOfObjectsByTerm,
  sortArrayOfObject,
  sortReverseArrayOfObject,
} from "./utils/algoMethods.js";

let counter = 0;
let pictures;
let users;

/********** יצירת משתנים גלובליים **********/

const getData = async () => {
  try {
    const data = await initialData();

    users = data.users;
    pictures = data.pictures;

    /********** לוגיקה ***********/

    const handleSliderPicChange = (controller = "") => {
      counter = setCounter(pictures, counter, controller);
      renderSlider(pictures, counter);
    };

    /********** filter pictures **********/
    const handleFilterPictures = (term) => {
      const newPictures = filterArrayOfObjectsByTerm(term, pictures, "alt");
      handleDisplayMode(DISPLAY.TABLE, newPictures);
    };

    /********** האזנה לאירועים ***********/
    // ניתוב דפים
    HOME_PAGE_LINK.addEventListener("click", () => {
      onChangePage(PAGES.HOME);
    });
    SLIDER_IMAGE.addEventListener("click", () => {
      onChangePage(PAGES.CONTENT_DETAILS);
      onContentDetails(pictures, SLIDER_IMAGE.src);
    });

    ABOUT_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.ABOUT));
    CREATE_PIC_PAGE_LINK.addEventListener("click", () => {
      handleCreatePic();
    });

    FROM_FAVORITES_PAGE_LINK.addEventListener("click", () => {
      onChangePage(PAGES.CARDS_FROM_FAVORITES);
      listeningToDelete(arrExcess);
    });
    SIGNUP_PAGE_LINK.addEventListener("click", handleSignup);
    USER_UPDATE_PAGE_LINK.addEventListener("click", () => {
      handleUserUpdate(users);
    });

    LOGIN_PAGE_LINK.addEventListener("click", () => {
      handleLogin(users);
    });
    LOGOUT_LINK.addEventListener("click", () => {
      removeItemFromLocalStorage("user");
      setNavDisplay();
      handleCancelLogin();

      onChangePage(PAGES.HOME);
    });
    LINK_TO_HOME_PAGE.addEventListener("click", () => onChangePage(PAGES.HOME));
    GOTO_LINK_CREATE_PIC.addEventListener("click", () =>
      onChangePage(PAGES.CREATE_PIC)
    );
    GOTO_LINK_TO_HOME_PAGE.addEventListener("click", () => {
      NO_DATA_CONTAINER.className = "d-none";
      DATA_CONTAINER.className = "d-block";
    });

    // מצגת תמונות
    SLIDER_PREV_BTN.addEventListener("click", () =>
      handleSliderPicChange("prev")
    );
    SLIDER_NEXT_BTN.addEventListener("click", () =>
      handleSliderPicChange("next")
    );

    // Display Mode
    TABLE_ICON.addEventListener("click", () =>
      handleDisplayMode(DISPLAY.TABLE, pictures)
    );
    SLIDER_ICON.addEventListener("click", () => {
      handleDisplayMode(DISPLAY.SLIDER, pictures);
    });
    CARDS_ICON.addEventListener("click", () =>
      handleDisplayMode(DISPLAY.CARDS, pictures)
    );

    // Sorting
    SORT_DOWN_ICON.addEventListener("click", () => {
      pictures = sortArrayOfObject(pictures, "alt");
      handleDisplayMode(DISPLAY.TABLE, pictures);
    });

    SORT_UP_ICON.addEventListener("click", () => {
      pictures = sortReverseArrayOfObject(pictures, "alt");
      handleDisplayMode(DISPLAY.TABLE, pictures);
    });

    // שדה חיפוש
    SEARCH_BAR.addEventListener("input", (e) =>
      handleFilterPictures(e.target.value)
    );

    /********** אתחול ראשוני ***********/
    handleSliderPicChange();
    setNavDisplay();

    onChangePage(PAGES.HOME);
    handleDisplayMode(DISPLAY.SLIDER, pictures);

    // הפעלת הלולאה שרצה על התמונות
    window.setein = setInterval(() => setCounterOtomats(pictures), 2000);
  } catch (erro) {
    console.log(erro);
  }
};

getData();

/********* Create Picture **********/
export const handleSubmitNewPic = () => {
  clearInterval(setein);

  pictures = onCreateNewPic(pictures);
  window.setein = setInterval(() => setCounterOtomats(pictures), 2000);

  handleCancelCreateNewPic();
  handleDisplayMode(DISPLAY.TABLE, pictures);
};

/********* Delete Picture **********/
export const handleDeletePic = (id) => {
  pictures = pictures.filter((pic) => pic._id !== id);
  handleDisplayMode(DISPLAY.TABLE, pictures);
};

/********** Edit picture **********/
export const onSubmitEditPic = () => {
  pictures = onEditPic(pictures);

  onCancelEditPic(pictures);
  handleDisplayMode(DISPLAY.TABLE, pictures);
};
/********** user update **********/

export const onSubmitUserUpdate = () => {
  users = onUserUpdate(users);

  if (EMAIL_LOGIN_FIELD.value !== EMAIL_USER_UPDATE_FIELD.value) {
    removeItemFromLocalStorage("user");
    setNavDisplay();
    onChangePage(PAGES.LOGIN);
  } else {
    onChangePage(PAGES.HOME);
  }
};
USER_UPDATE_PAGE_LINK.addEventListener("click", () => {
  handleUserUpdate(users);
});

/********** Signup new User **********/
export const handleSubmitSignup = () => {
  users = onSignupNewUser(users);

  onChangePage(PAGES.HOME);
};
