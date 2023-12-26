"use client";

import { Badge } from "@/components/ui/badge";
import { PackageSearchIcon } from "lucide-react";
import OrderItem from "./components/order-item";
import getOrders from "../api/order/get-orders/get-orders";
import { useEffect, useState } from "react";
import Loading from "@/animations/loading";
import { OrderProduct } from "@prisma/client";
import { useSession } from "next-auth/react";

export const dynamic = "force-dynamic";

const OrderPage = () => {
  const [ordersList, setOrdersList] = useState<OrderProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [effectExecuted, setEffectExecuted] = useState<boolean>(false);
  const { status, data } = useSession();

  const handleEffectExecuted = () => {
    setEffectExecuted(true);
  };

  console.log("CONSOLE DO SESSION", status, data);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const orders = await getOrders();
        const sortedOrders = orders.sort((a, b) => {
          // Supondo que 'createdAt' seja o campo de data de criação do pedido
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setOrdersList(sortedOrders as any);
      } catch (error) {
        console.log("Erro ao buscar pedidos: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    setEffectExecuted(false);
  }, [effectExecuted]);

  return (
    <div className="p-5 lg:container lg:mx-auto lg:py-10">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <PackageSearchIcon size={16} />
        Meus pedidos
      </Badge>
      {loading ? (
        <Loading className="mt-[50%] lg:mt-[20%]" />
      ) : (
        <div className="mt-5 flex flex-col gap-5">
          {ordersList.map((order) => {
            console.log(order);
            return (
              <OrderItem
                key={order?.id}
                order={order as any}
                onEffectExecuted={handleEffectExecuted}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
