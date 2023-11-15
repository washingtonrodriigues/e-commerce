import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext, useState } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { createOrder } from "@/actions/order";
import BouncingDotsLoader from "@/animations/BouncingDotsLoader/bouncing-dots-loader";

const Cart = () => {
  const { data } = useSession();
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const { products, total, subtotal, totalDiscount, clearCart } =
    useContext(CartContext);

  const handleFinishPurchaseClick = async () => {
    if (!data?.user) {
      return;
    }

    const order = await createOrder(products, (data?.user as any).id);

    const checkout = await createCheckout(products, order.id);

    setRedirecting(true);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>
      <div className="flex h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          {products.length > 0 ? (
            products.map((product) => (
              <CartItem
                key={product.id}
                product={computeProductTotalPrice(product as any) as any}
              />
            ))
          ) : (
            <p className="text=center text-sm font-semibold">
              Carrinho vazio! Vamos fazer compras?
            </p>
          )}
        </ScrollArea>
      </div>
      <div className="flex flex-col gap-3">
        <Separator />
        <div className="flex items-center justify-between text-xs lg:text-sm">
          <p>Subtotal</p>
          <p>R$ {subtotal.toFixed(2).replace(".", ",")}</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-xs lg:text-sm">
          <p>Entrega</p>
          <p>GRÁTIS</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-xs lg:text-sm">
          <p>Descontos</p>
          <p>-R$ {totalDiscount.toFixed(2).replace(".", ",")}</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-sm font-bold lg:text-base">
          <p>Total</p>
          <p>R$ {total.toFixed(2).replace(".", ",")}</p>
        </div>
        <Button
          onClick={handleFinishPurchaseClick}
          className="mt-7 font-bold uppercase"
        >
          {redirecting ? <BouncingDotsLoader /> : <span>Finalizar compra</span>}
        </Button>
      </div>
    </div>
  );
};

export default Cart;
