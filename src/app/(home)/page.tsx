import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/product-list";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercent: {
        gt: 0,
      },
    },
  });
  return (
    <div>
      <Image
        src="/banner_home_01.png"
        width={0}
        height={0}
        sizes="100vw"
        alt="até 55% de desconto só esse mês!"
        className="h-auto w-full px-5"
      />
      <div className="mt-8 px-5">
        <Categories />
      </div>
      <div className="mt-8">
        <p className="mb-3 pl-5 font-bold uppercase">Ofertas</p>
        <ProductList products={deals} />
      </div>
      <Image
        src="/banner_home_02.png"
        width={0}
        height={0}
        sizes="100vw"
        alt="até 55% de desconto em mouses!"
        className="h-auto w-full px-5"
      />
    </div>
  );
}
