"use server";

import { prismaClient } from "@/lib/prisma";
import diacritics from "diacritics";

export const searchProducts = async ({ searchText }: any) => {
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

    return products;
    // Faça algo com os produtos, como exibi-los
    console.log("Produtos encontrados:", products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};
