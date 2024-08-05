import { Country } from "../models/country";
import getNativeName from "../utils/utils";

const CountryCard = ({
  country,
  onClick,
}: {
  country: Country;
  onClick: () => void;
}) => {
  const nativeName = getNativeName(country);

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden w-60">
      <img
        src={country.flags.png}
        alt={country.flags.alt ?? "Country flag"}
        className="object-contain rounded-t-lg h-40"
      />
      <div className="p-3 space-y-1">
        <h2 className="text-lg font-semibold cursor-pointer" onClick={onClick}>
          {country.name.official}
        </h2>
        <p className="text-xs text-gray-600">
          <span className="font-medium">Country Code (2):</span> {country.cca2}
        </p>
        <p className="text-xs text-gray-600">
          <span className="font-medium">Country Code (3):</span> {country.cca3}
        </p>
        {nativeName && (
          <p className="text-xs text-gray-600">
            <span className="font-medium">Native Name:</span>{" "}
            {nativeName.official}
          </p>
        )}
        {country.altSpellings.length > 0 && (
          <p className="text-xs text-gray-600">
            <span className="font-medium">Alternative Spellings:</span>{" "}
            {country.altSpellings.join(", ")}
          </p>
        )}
        <p className="text-xs text-gray-600">
          <span className="font-medium">Calling Codes:</span>{" "}
          {country.idd.root + country.idd.suffixes}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;
