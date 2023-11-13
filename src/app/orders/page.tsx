"use client";

import { Badge } from "@/components/ui/badge";
import { PackageSearchIcon } from "lucide-react";
import OrderItem from "./components/order-item";
import getOrders from "../api/order/get-orders/route";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

const OrderPage = () => {
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getOrders();
        setOrdersList(orders);
      } catch (error) {
        console.log("Erro ao buscar pedidos: ", error);
      }
    };

    fetchOrders();
  }, []); // Executa apenas na montagem inicial

  return (
    <div className="p-5 lg:container lg:mx-auto lg:py-10">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <PackageSearchIcon size={16} />
        Meus pedidos
      </Badge>
      <div className="mt-5 flex flex-col gap-5">
        {ordersList.map((order) => {
          console.log(order); // Adicione esta linha
          return <OrderItem key={order.id} order={order} />;
        })}
      </div>
    </div>
  );
};

export default OrderPage;
