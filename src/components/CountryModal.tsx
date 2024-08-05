import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Country } from "../models/country";
import getNativeName from "../utils/utils";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CountryModal = ({
  country,
  onClose,
}: {
  country: Country;
  onClose: () => void;
}) => {
  const nativeName = getNativeName(country);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg overflow-hidden w-[30rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 space-y-2 max-h-[80vh] overflow-y-auto">
          <div className="w-full flex justify-center mb-4">
            <img
              src={country.flags.png}
              alt={country.flags.alt ?? "Country flag"}
              className="object-contain rounded"
            />
          </div>

          <p className="text-sm">
            <span
              className="font-bold text-xl block truncate"
              title={country.name.official}
            >
              {country.name.official}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-bold">Country Code (2):</span> {country.cca2}
          </p>
          <p className="text-sm">
            <span className="font-bold">Country Code (3):</span> {country.cca3}
          </p>
          {nativeName && (
            <p className="text-sm">
              <span className="font-bold">Native Name:</span>{" "}
              <span className="block truncate" title={nativeName.official}>
                {nativeName.official}
              </span>
            </p>
          )}
          {country.altSpellings.length > 0 && (
            <p className="text-sm">
              <span className="font-bold">Alternative Spellings:</span>{" "}
              <span
                className="block truncate"
                title={country.altSpellings.join(", ")}
              >
                {country.altSpellings.join(", ")}
              </span>
            </p>
          )}
          <p className="text-sm">
            <span className="font-bold">Calling Codes:</span>{" "}
            <span
              className="block truncate"
              title={country.idd.root + country.idd.suffixes.join(", ")}
            >
              {country.idd.root + country.idd.suffixes.join(", ")}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-bold">Region:</span> {country.region}
          </p>
          {country.subregion && (
            <p className="text-sm">
              <span className="font-bold">Subregion:</span> {country.subregion}
            </p>
          )}
          {country.languages && (
            <p className="text-sm">
              <span className="font-bold">Languages:</span>{" "}
              <span
                className="block truncate"
                title={Object.values(country.languages).join(", ")}
              >
                {Object.values(country.languages).join(", ")}
              </span>
            </p>
          )}
          {country.currencies && (
            <p className="text-sm">
              <span className="font-bold">Currency:</span>{" "}
              <span
                className="block truncate"
                title={Object.values(country.currencies)
                  .map(
                    (currency) =>
                      currency.name + " (" + currency.symbol + ")" + " "
                  )
                  .join(", ")}
              >
                {Object.values(country.currencies)
                  .map(
                    (currency) =>
                      currency.name + " (" + currency.symbol + ")" + " "
                  )
                  .join(", ")}
              </span>
            </p>
          )}
          {country.capital && (
            <p className="text-sm">
              <span className="font-bold">Capital:</span>{" "}
              <span
                className="block truncate"
                title={country.capital.join(", ")}
              >
                {country.capital.join(", ")}
              </span>
            </p>
          )}
          <p className="text-sm">
            <span className="font-bold">Area:</span>{" "}
            {country.area.toLocaleString()} km<sup>2</sup>
          </p>
          {country.borders && (
            <p className="text-sm">
              <span className="font-bold">Borders:</span>{" "}
              <span
                className="block truncate"
                title={country.borders.join(", ")}
              >
                {country.borders.join(", ")}
              </span>
            </p>
          )}
          <p className="text-sm">
            <span className="font-bold">Google Maps:</span>{" "}
            <a
              href={country.maps.googleMaps}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              View on Google Maps
            </a>
          </p>
          {country.timezones && (
            <p className="text-sm">
              <span className="font-bold">Time Zones:</span>{" "}
              <span
                className="block truncate"
                title={country.timezones.join(", ")}
              >
                {country.timezones.join(", ")}
              </span>
            </p>
          )}
        </div>
        <button onClick={onClose} className="w-full bg-red-500 text-white py-2">
          <FontAwesomeIcon icon={faTimes} className="mr-2" />
          Close
        </button>
      </div>
    </div>
  );
};

export default CountryModal;
