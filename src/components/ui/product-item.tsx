import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import { Badge } from "./badge";
import { ArrowDownIcon } from "lucide-react";
import styles from "../../styles/fonts.module.css";
import classNames from "classnames";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div
      className={`poppins flex max-w-[170px] flex-col gap-4 ${styles.poppins}`}
    >
      <div className="relative flex h-[170px] w-full items-center justify-center rounded-lg bg-accent">
        <Image
          src={product.imageUrls[0]}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{ objectFit: "contain" }}
          alt={product.name}
        />
        {product.discountPercent > 0 && (
          <Badge className="absolute left-3 top-3 px-2 py-[2px]">
            <ArrowDownIcon size={14} />
            {product.discountPercent}%
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {product.name}
        </p>
        <div className="flex items-center gap-2">
          {product.discountPercent > 0 ? (
            <>
              <p className="font-semibold">
                R$ {product.totalPrice.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-xs line-through opacity-75 ">
                R$ {Number(product.basePrice).toFixed(2).replace(".", ",")}
              </p>
            </>
          ) : (
            <p className="text-sm font-semibold">
              R$ {product.basePrice.toFixed(2).replace(".", ",")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
