import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "../../components/ui/product-list";
import Sectiontitle from "@/components/ui/section-title";
import PromoBanner from "./components/promo-banner";
import Link from "next/link";
import { SearchIcon } from "lucide-react";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercent: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });
  return (
    <div className="flex flex-col gap-8 py-8">
      {/* <div className="m-auto flex w-[90%] border-[1px] border-solid border-[#969696] py-2"> */}
      <div className="relative m-auto flex w-[90%] items-center justify-between rounded-lg border-[1px] border-solid border-[#949494] bg-accent p-2 transition-[.3s] placeholder:text-[#6e6e6e] focus-within:ring-2 focus-within:ring-[#6847ed]">
        <input
          type="search"
          placeholder="Pesquisar"
          name=""
          id=""
          className="w-full bg-transparent outline-none placeholder:text-[#949494]"
        />
        <button>{<SearchIcon size={20} color="#949494" />}</button>
      </div>

      <PromoBanner
        src="/banner_home_01.png"
        alt="até 55% de desconto só esse mês!"
      />
      <div className=" px-5">
        <Categories />
      </div>
      <div>
        <Link href="/deals">
          <Sectiontitle>Ofertas</Sectiontitle>
        </Link>
        <ProductList products={deals} />
      </div>
      <PromoBanner
        src="/banner_home_02.png"
        alt="até 55% de desconto em mouses!"
      />
      <div>
        <Link href="/category/keyboards">
          <Sectiontitle>Teclados</Sectiontitle>
        </Link>
        <ProductList products={keyboards} />
      </div>
      <div>
        <PromoBanner
          src="/banner_home_03.png"
          alt="até 55% de desconto em mouses!"
        />
      </div>
      <div>
        <Sectiontitle>Mouses</Sectiontitle>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}
