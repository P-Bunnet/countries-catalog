import { Country } from "../models/country";

const getNativeName = (country: Country) => {
  if (country.name.nativeName) {
    // Check if there's a native name in a language other than English
    for (const [lang, name] of Object.entries(country.name.nativeName)) {
      if (lang !== "eng") {
        return name;
      }
    }
    // If only English native name exists, return it
    return country.name.nativeName["eng"] || "";
  }
  return "";
};

export default getNativeName;
