import { getCountries } from "../services/country.service";

export default async function getCountriesFromStore() {
  const response = await getCountries()
    .then((countries) => Object.values(countries))
    .catch((err) => console.log(err));
  return response;
}
