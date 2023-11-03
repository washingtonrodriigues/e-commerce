import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "../../components/ui/product-list";
import Sectiontitle from "@/components/ui/section-title";
import PromoBanner from "./components/promo-banner";
import Link from "next/link";
import SearchInput from "./components/search-input";

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
      <SearchInput />
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
