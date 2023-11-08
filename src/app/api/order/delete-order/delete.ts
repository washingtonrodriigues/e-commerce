"use server";

import { prismaClient } from "@/lib/prisma";

const handleDeleteOrder = async ({ order }: any) => {
  // First, delete the associated OrderProducts
  await prismaClient.orderProduct.deleteMany({
    where: {
      orderId: order.id,
    },
  });

  // Then, delete the Order itself
  await prismaClient.order.delete({
    where: {
      id: order.id,
    },
  });
};

export default handleDeleteOrder;
