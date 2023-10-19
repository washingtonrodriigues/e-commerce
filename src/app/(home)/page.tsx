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

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });
  return (
    <div className="flex flex-col gap-8">
      <PromoBanner
        src="/banner_home_01.png"
        alt="até 55% de desconto só esse mês!"
      />
      <div className=" px-5">
        <Categories />
      </div>
      <div>
        <Sectiontitle>Ofertas</Sectiontitle>
        <ProductList products={deals} />
      </div>
      <PromoBanner
        src="/banner_home_02.png"
        alt="até 55% de desconto em mouses!"
      />
      <div>
        <Sectiontitle>Teclados</Sectiontitle>
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
