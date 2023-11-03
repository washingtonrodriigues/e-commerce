"use server";

import { prismaClient } from "@/lib/prisma";
import diacritics from "diacritics";

const searchProducts = async ({ searchText }: any) => {
  const normalizedSearchText = diacritics.remove(searchText);
  try {
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

    return products; // Retornar os resultados em vez de usar res
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error; // Lançar o erro para que possa ser tratado onde a função é chamada
  }
};

export default searchProducts;
