import { Gallery, SearchInput } from "@/components";

const Landing = () => {
  return (
    <main className="pt-50">
      <div className="text-center">
        <h1 className="text-[2.25rem] capitalize text-[#121826] font-bold">
          search
        </h1>
        <p className="text-[#6C727F]">
          Search high-resolution images from Unsplash
        </p>
      </div>
      <SearchInput />
      <Gallery />
    </main>
  );
};

export default Landing;
