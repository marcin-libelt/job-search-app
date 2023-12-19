import { useJobItemsContext } from "../lib/hooks";

export default function SearchForm() {
  const { searchText, setSearchText } = useJobItemsContext();

  return (
    <form
      action="#"
      onSubmit={(ev) => {
        ev.preventDefault();
      }}
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={(ev) => {
          setSearchText(ev.target.value);
        }}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
