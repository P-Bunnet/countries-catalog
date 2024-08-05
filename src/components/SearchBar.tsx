import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="flex items-center w-[30rem] bg-white h-14 px-4 rounded-lg">
      <FontAwesomeIcon icon={faSearch} className="scale-125 mr-2" />
      <input
        type="text"
        className="w-full h-full focus:outline-none text-xl"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a country..."
      />
    </div>
  );
};

export default SearchBar;
