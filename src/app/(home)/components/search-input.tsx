"use client";

import searchProducts from "@/app/api/search/search-function";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchInput = ({ className }: any) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    searchProducts({ searchText })
      .then((products: any) => {
        setSearchResults(products);
        router.push(`/searchProducts?product=${searchText}`);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative m-auto flex w-[90%] items-center justify-between rounded-lg border-[1px] border-solid border-[#949494] bg-accent p-2 placeholder:text-[#6e6e6e] focus-within:border-transparent focus-within:ring-2 focus-within:ring-[#6847ed]">
        <input
          type="search"
          placeholder="Digite o nome do produto"
          value={searchText}
          onChange={({ target }) => setSearchText(target.value)}
          name=""
          id=""
          className="w-full bg-transparent outline-none placeholder:text-[#949494]"
        />
        <button type="submit">
          {<SearchIcon size={20} color="#949494" />}
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
