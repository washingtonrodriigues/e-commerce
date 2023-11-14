"use server";

import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const getOrders = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    console.log("Access denied! Please log in to view your orders.");
  }

  const userId = (session?.user as any).id;

  const orders = await prismaClient.order.findMany({
    where: {
      userId,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return orders;
};

export default getOrders;
