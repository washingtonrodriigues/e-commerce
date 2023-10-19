import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/product-list";
import Sectiontitle from "./components/section-title";
import PromoBanner from "./components/promo-banner";

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
  return (
    <div>
      <PromoBanner
        src="/banner_home_01.png"
        alt="até 55% de desconto só esse mês!"
      />
      <div className="mt-8 px-5">
        <Categories />
      </div>
      <div className="mt-8">
        <Sectiontitle>Ofertas</Sectiontitle>
        <ProductList products={deals} />
      </div>
      <PromoBanner
        src="/banner_home_02.png"
        alt="até 55% de desconto em mouses!"
      />
      <div className="mt-8">
        <Sectiontitle>Teclados</Sectiontitle>
        <ProductList products={keyboards} />
      </div>
    </div>
  );
}
