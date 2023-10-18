import Image from "next/image";
import Categories from "./components/categories";

export default function Home() {
  return (
    <div className="p-5">
      <Image
        src="/banner_home_01.png"
        width={0}
        height={0}
        sizes="100vw"
        alt="até 55% de desconto só esse mês!"
        className="h-auto w-full"
      />
      <div className="mt-8">
        <Categories />
      </div>
    </div>
  );
}
