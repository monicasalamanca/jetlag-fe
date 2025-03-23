export const revalidate = 86400; // 👈 Ensures ISR is enabled for the entire page

import Header from "../header/header";
import { fetchCountriesWithContinents } from "@/api/client";

const HeaderWrapper = async () => {
  const countriesAndContinentsList = await fetchCountriesWithContinents();
  return <Header destinations={countriesAndContinentsList} />;
};

export default HeaderWrapper;
