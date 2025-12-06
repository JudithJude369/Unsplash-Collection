import { useInputStore } from "@/store/inputStore";
import searchImg from "@/assets/images/Search.svg";

const SearchInput = () => {
  const inputValue = useInputStore((state) => state.inputValue);
  const setInputValue = useInputStore((state) => state.setInputValue);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearchImage = (e) => setInputValue(e.target.value);

  return (
    <main className="px-4 sm:px-8 flex flex-col items-center m-8">
      <form className="max-w-2xl w-full relative" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          placeholder="Enter your keywords..."
          className="p-4 w-full rounded-xl bg-white border-[3px] shadow-md border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-text"
          onChange={handleSearchImage}
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <img src={searchImg} alt="Search" />
        </button>
      </form>
    </main>
  );
};

export default SearchInput;
