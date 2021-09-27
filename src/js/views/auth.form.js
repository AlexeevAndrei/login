export function setCountriesToSelect(countryAuth, countries) {
  countryAuth.innerHTML = "";
  let template = `<option selected>Choose your country...</option>`;
  countries.forEach((country, index) => {
    template += `<option value=${country} data-index=${
      index + 1
    }>${country}</option>`;
  });
  countryAuth.innerHTML += template;
}

export function setCitiesToSelect(cityAuth, cities) {
  cityAuth.innerHTML = "";
  cityAuth.removeAttribute("disabled");
  let template = `<option selected>Choose your city...</option>`;
  cities.forEach((city) => {
    template += `<option value=${city}>${city}</option>`;
  });
  cityAuth.innerHTML += template;
}
