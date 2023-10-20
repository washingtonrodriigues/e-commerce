"use client";

import { Button } from "@/components/ui/button";
import { DiscountBadge } from "@/components/ui/discount-badge";
import { ProductWithTotalPrice } from "@/helpers/product";
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    "basePrice" | "description" | "discountPercent" | "totalPrice" | "name"
  >;
}

const ProductInfo = ({
  product: { basePrice, totalPrice, description, discountPercent, name },
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };
  const handleIncreaseQuantityClick = () => {
    setQuantity((next) => next + 1);
  };
  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{name}</h2>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">
          R$ {totalPrice.toFixed(2).replace(".", ",")}
        </h1>
        {discountPercent > 0 && (
          <DiscountBadge>{discountPercent}</DiscountBadge>
        )}
      </div>
      {discountPercent > 0 && (
        <p className="text-sm line-through opacity-75">
          R$ {Number(basePrice).toFixed(2).replace(".", ",")}
        </p>
      )}
      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecreaseQuantityClick}
        >
          <ArrowLeftIcon size={16} />
        </Button>
        <span>{quantity}</span>
        <Button
          size="icon"
          variant="outline"
          onClick={handleIncreaseQuantityClick}
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>
      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-justify text-sm opacity-60">{description}</p>
      </div>
      <Button className="mt-8 font-bold uppercase">
        Adicionar ao carrinho
      </Button>
      <div className="mt-5 flex items-center justify-between rounded-lg bg-[#2A2A2A] px-5 py-2">
        <div className="flex items-center gap-2">
          <TruckIcon />
          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="text-bold">FSPacket®</span>
            </p>
            <p className="text-xs text-[#8162FF]">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>
        <div className="text-xs font-bold">Frete Grátis</div>
      </div>
    </div>
  );
};

export default ProductInfo;
