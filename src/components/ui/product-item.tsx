import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import { Badge } from "./badge";
import { ArrowDownIcon } from "lucide-react";
import styles from "../../styles/fonts.module.css";
import classNames from "classnames";
import Link from "next/link";
import { DiscountBadge } from "./discount-badge";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className={`poppins flex min-w-[156px] flex-col gap-4 ${styles.poppins}`}
    >
      <div className="relative flex  aspect-square h-[170px] w-full items-center justify-center rounded-lg bg-accent">
        <Image
          src={product.imageUrls[0]}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
          alt={product.name}
        />
        {product.discountPercent > 0 && (
          <DiscountBadge className="absolute left-3 top-3">
            {product.discountPercent}
          </DiscountBadge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {product.name}
        </p>
        <div className="flex items-center gap-2 whitespace-nowrap">
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
    </Link>
  );
};

export default ProductItem;
