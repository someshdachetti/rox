import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";

export const SearchTransaction = (props) => {
  const { setSearchFilter } = props;

  return (
    <>
      <div className="search">
        <div className="search-container">
          <input
            className="input"
            type="search"
            placeholder="search Data...."
            onChange={setSearchFilter}
          />
          <FontAwesomeIcon className="search-icon" icon={faSearch} />
        </div>
      </div>
    </>
  );
};
