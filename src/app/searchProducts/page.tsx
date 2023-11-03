"use client";

import { useSearchParams } from "next/navigation";
import searchProducts from "../search/search-function";
import { useEffect, useState } from "react";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductItem from "@/components/ui/product-item";
import { Badge } from "@/components/ui/badge";
import { SearchIcon } from "lucide-react";
import { Product } from "@prisma/client";
import SearchInput from "../(home)/components/search-input";

const SearchProductsPage = () => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [clickSearchBar, setClickSearchBar] = useState(false);
  const searchParams = useSearchParams();
  const searchText = searchParams.get("product");

  const handleClickSearchBar = () => {
    setClickSearchBar(!clickSearchBar);
  };

  // Chame a função de busca
  useEffect(() => {
    if (searchText) {
      setClickSearchBar(false);
      searchProducts({ searchText })
        .then((products) => {
          setProductsList(products as any);
          console.log("Produtos encontrados:", products);
        })
        .catch((error) => {
          console.error("Erro ao buscar produtos:", error);
        });
    }
  }, [searchText]);

  if (!productsList) return null;

  return (
    <div className="flex flex-col gap-8 p-5">
      {clickSearchBar ? (
        <SearchInput />
      ) : (
        <Badge
          className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
          variant="outline"
          onClick={handleClickSearchBar}
        >
          <SearchIcon />
          <p className="text-sm">
            Resultado para: <span>{searchText}</span>
          </p>
        </Badge>
      )}
      <div className="grid grid-cols-2 gap-8">
        {productsList.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchProductsPage;
