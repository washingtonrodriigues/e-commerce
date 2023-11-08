"use server";

import { prismaClient } from "@/lib/prisma";
import diacritics from "diacritics";

const searchProducts = async ({ searchText }: any) => {
  const normalizedSearchText = diacritics.remove(searchText);
  const products = await prismaClient.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: normalizedSearchText,
            mode: "insensitive",
          },
        },
        {
          slug: {
            contains: normalizedSearchText,
            mode: "insensitive",
          },
        },
        {
          category: {
            name: {
              contains: normalizedSearchText,
              mode: "insensitive",
            },
          },
        },
      ],
    },
  });

  if (!products) return console.log("Erro ao buscar produtos");

  return products; // Retornar os resultados em vez de usar res
};

export default searchProducts;
