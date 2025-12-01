import { useInputStore } from "@/store/inputStore";
import searchImg from "@/assets/images/Search.svg";

const SearchInput = () => {
  const inputValue = useInputStore((state) => state.inputValue);
  const setInputValue = useInputStore((state) => state.setInputValue);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearchImage = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <main className="px-8 flex items-center flex-col m-8">
      <form className="max-w-2xl w-full relative" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          placeholder="Enter your keywords..."
          className="p-4 w-full rounded-xl bg-[#FFFFFF]  border-[3px] shadow-md border-[#E5E7EB] cursor-pointer"
          onChange={handleSearchImage}
        />
        <img
          src={searchImg}
          alt=""
          className="absolute right-5 top-5 cursor-pointer"
        />
      </form>
    </main>
  );
};

export default SearchInput;
