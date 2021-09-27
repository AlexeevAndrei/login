import { getCities } from "../services/cities.service";

export default async function getCitiesFromStore(country_index) {
  const response = await getCities(country_index)
    .then((cities) => Object.values(cities))
    .catch((err) => console.log(err));
  return response;
}
