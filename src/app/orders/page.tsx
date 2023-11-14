"use client";

import { Badge } from "@/components/ui/badge";
import { PackageSearchIcon } from "lucide-react";
import OrderItem from "./components/order-item";
import getOrders from "../api/order/get-orders/route";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";

export const dynamic = "force-dynamic";

const OrderPage = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [effectExecuted, setEffectExecuted] = useState(false);

  const handleEffectExecuted = () => {
    setEffectExecuted(true);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const orders = await getOrders();
        setOrdersList(orders as any);
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
        <Loading className="mt-[50%]" />
      ) : (
        <div className="mt-5 flex flex-col gap-5">
          {ordersList.map((order) => {
            return (
              <OrderItem
                key={order.id}
                order={order}
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
