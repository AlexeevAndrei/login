import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "../css/style.css";

import UI from "./config/ui.config";
import UI_AUTH from "./config/ui.auth.config";
import { validate } from "./helpers/validate";
import { showInputError, removeInputError } from "./views/form";
import { login, auth } from "./services/auth.service";
import { notify } from "./views/notifications";
import { getNews } from "./services/news.service";
import getCountriesFromStore from "./store/country";
import { setCountriesToSelect, setCitiesToSelect } from "./views/auth.form";
import getCitiesFromStore from "./store/cities";

const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];

const {
  formAuth,
  emailAuth,
  passwordAuth,
  nicknameAuth,
  firstnameAuth,
  lastnameAuth,
  phoneAuth,
  genderAuth,
  countryAuth,
  cityAuth,
  birhDayAuth,
  birthMonthAuth,
  birthYearAuth,
} = UI_AUTH;

const inputsAuth = [
  emailAuth,
  passwordAuth,
  nicknameAuth,
  firstnameAuth,
  lastnameAuth,
  phoneAuth,
  genderAuth,
  countryAuth,
  cityAuth,
  birhDayAuth,
  birthMonthAuth,
  birthYearAuth,
];

//Events
document.addEventListener("DOMContentLoaded", () => {
  getCountriesFromStore().then((countries) => {
    setCountriesToSelect(countryAuth, countries);
  });
});

countryAuth.addEventListener("change", (e) => {
  const country_index = e.target.options[e.target.selectedIndex].dataset.index;
  getCitiesFromStore(country_index).then((cities) =>
    setCitiesToSelect(cityAuth, cities)
  );
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmitLoginForm();
});

formAuth.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmitAuthForm();
});

inputs.forEach((el) => {
  el.addEventListener("focus", () => {
    removeInputError(el);
  });
});

inputsAuth.forEach((el) => {
  el.addEventListener("focus", () => {
    removeInputError(el);
  });
});

//Handlers
async function onSubmitLoginForm() {
  const isValidForm = inputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    // await getNews();
    form.reset();
    notify({ msg: "Login success", className: "alert-success" });
  } catch (err) {
    notify({ msg: "Login faild", className: "alert-danger" });
  }
}

async function onSubmitAuthForm() {
  const isValidForm = inputsAuth.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await auth(
      emailAuth.value,
      passwordAuth.value,
      nicknameAuth.value,
      firstnameAuth.value,
      lastnameAuth.value,
      phoneAuth.value,
      genderAuth.value,
      cityAuth.value,
      countryAuth.value,
      birhDayAuth.value,
      birthMonthAuth.value,
      birthYearAuth.value
    );
    formAuth.reset();
    notify({ msg: `Authentication success`, className: "alert-success" });
  } catch (err) {
    notify({ msg: `${err.response.data.message}`, className: "alert-danger" });
  }
}
