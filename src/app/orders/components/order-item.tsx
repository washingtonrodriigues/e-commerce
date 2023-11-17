"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import OrderProductItem from "./order-product-item";
import { Separator } from "@/components/ui/separator";
import { useMemo, useState } from "react";
import { computeProductTotalPrice } from "@/helpers/product";
import { getOrderStatus } from "../helpers/status";
import { CreditCardIcon, TrashIcon } from "lucide-react";
import handleDeleteOrder from "@/app/api/order/delete-order/delete";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: { product: true };
      };
    };
  }>;
  onEffectExecuted: () => void;
}

const OrderItem = ({ order, onEffectExecuted }: OrderItemProps) => {
  const [deletedOrder, setDeletedOrder] = useState(false);
  const subtotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    }, 0);
  }, [order.orderProducts]);

  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, product) => {
      const productWithTotalPrice = computeProductTotalPrice(product.product);
      return acc + productWithTotalPrice.totalPrice * product.quantity;
    }, 0);
  }, [order.orderProducts]);

  const totalDiscounts = subtotal - total;

  const handleClickDeleteOrder = () => {
    handleDeleteOrder({ order });
    setDeletedOrder(true);
    onEffectExecuted();
  };

  const handleMakePaymentClick = async () => {
    const orderId = order.id;

    const products = order.orderProducts.map((orderProduct) => {
      const product = orderProduct.product;

      return {
        name: product.name,
        description: product.description,
        imageUrls: product.imageUrls,
        totalPrice: computeProductTotalPrice(product).totalPrice,
        quantity: orderProduct.quantity,
      };
    });

    const checkout = await createCheckout(products as any, orderId);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

  return (
    <Card className="flex items-center justify-between gap-5 px-2">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex w-full text-left">
              <div className="flex flex-1 flex-col gap-1 text-left">
                <p className="text-sm font-bold uppercase lg:text-base">
                  Pedido com {order.orderProducts.length} produto(s)
                </p>
                <span className="text-xs opacity-60">
                  Feito em {format(order.createdAt, "d/MM/y 'às' HH:mm")}
                </span>
              </div>

              <div className="hidden flex-1 font-bold lg:block">
                <p className="text-xs lg:text-sm">Status</p>
                <p className="text-xs text-[#8162FF] lg:text-sm">
                  {getOrderStatus(order.status)}
                </p>
              </div>

              <div className="hidden flex-1 lg:block">
                <p className="text-xs font-bold lg:text-sm ">Data</p>
                <p className="text-xs opacity-60 lg:text-sm">
                  {format(order.createdAt, "d/MM/y")}
                </p>
              </div>

              <div className="hidden flex-1 lg:block">
                <p className="text-xs font-bold lg:text-sm">Pagamento</p>
                <p className="text-xs opacity-60 lg:text-sm">Cartão</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between lg:hidden">
                <div className="font-bold ">
                  <p className="text-xs lg:text-sm">Status</p>
                  <p className="mt-1 text-xs text-[#8162FF] lg:text-sm">
                    {getOrderStatus(order.status)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold lg:text-sm">Data</p>
                  <p className="mt-1 text-xs opacity-60 lg:text-sm">
                    {format(order.createdAt, "d/MM/y")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold lg:text-sm">Pagamento</p>
                  <p className="mt-1 text-xs opacity-60 lg:text-sm">Cartão</p>
                </div>
              </div>
              {order.orderProducts.map((orderProduct) => (
                <OrderProductItem
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                />
              ))}
              <div className="flex w-full flex-col gap-1 text-xs">
                <Separator />
                <div className="flex w-full justify-between py-3 lg:text-sm">
                  <p>Subtotal</p>
                  <p>R$ {subtotal.toFixed(2).replace(".", ",")}</p>
                </div>
                <Separator />
                <div className="flex w-full justify-between py-3 lg:text-sm">
                  <p>Entrega</p>
                  <p>GRÁTIS</p>
                </div>
                <Separator />
                <div className="flex w-full justify-between py-3 lg:text-sm">
                  <p>Descontos</p>
                  <p>-R$ {totalDiscounts.toFixed(2).replace(".", ",")}</p>
                </div>
                <Separator />
                <div className="flex w-full justify-between py-3 text-sm font-bold lg:text-base">
                  <p>Total</p>
                  <p>R$ {total.toFixed(2).replace(".", ",")}</p>
                </div>
              </div>
            </div>
            <div className="mx-auto w-full gap-5 lg:flex">
              {order.status === "WAITING_FOR_PAYMENT" && (
                <Button
                  className=" w-full gap-2"
                  onClick={handleMakePaymentClick}
                >
                  <CreditCardIcon size={18} /> Realizar pagamento
                </Button>
              )}
              <AlertDialog>
                <AlertDialogTrigger className="mt-4 flex h-[40px] w-full items-center justify-center gap-2 rounded-sm bg-[#9e2828] p-2 lg:mt-0 lg:h-[42px]">
                  <TrashIcon size={18} />
                  Deletar pedido
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Deletar pedido</AlertDialogTitle>
                    <AlertDialogDescription>
                      Você tem certeza que deseja deletar este pedido?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClickDeleteOrder}>
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
function clearCart() {
  throw new Error("Function not implemented.");
}
