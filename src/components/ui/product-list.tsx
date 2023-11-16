"use client";

import ProductItem from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";
import { Suspense } from "react";
import ProductListSkeleton from "../product-list-skeleton";
import classNames from "classnames";
import styles from "../../styles/styles.module.css";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <div className="flex">
        <div
          className={classNames(
            [styles.custom_scrollbar],
            "lg:overflow-scrolling-touch flex w-full gap-4 overflow-x-auto p-5 lg:gap-7 lg:overflow-auto",
          )}
        >
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={computeProductTotalPrice(product)}
            />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default ProductList;
