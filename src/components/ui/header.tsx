"use client";
import {
  MenuIcon,
  ShoppingCartIcon,
  LogInIcon,
  PercentIcon,
  ListOrderedIcon,
  HomeIcon,
  LogOutIcon,
  PackageSearchIcon,
} from "lucide-react";
import styles from "../../styles/fonts.module.css";
import classNames from "classnames";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import Cart from "./cart";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";

const Header = () => {
  const handleLoginClick = async () => {
    await signIn();
  };
  const handleLogoutClick = async () => {
    await signOut();
  };

  const { products } = useContext(CartContext);

  const { status, data } = useSession();
  return (
    <Card
      className={`flex items-center justify-between p-[1.875rem] ${styles.poppins}`}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>
          {status === "authenticated" && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-4">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>
                  {data.user.image && (
                    <AvatarImage
                      className="w-[50px] rounded-[50%]"
                      src={data.user.image}
                    />
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-medium">{data.user.name}</p>
                  <p className="text-sm opacity-75">Boas compras!</p>
                </div>
              </div>
              <Separator />
            </div>
          )}
          <div className={`mt-4 flex flex-col gap-3 ${styles.poppins}`}>
            {status === "unauthenticated" && (
              <Button
                variant="outline"
                className="width-full justify-start gap-2"
                onClick={handleLoginClick}
              >
                <LogInIcon size={16} />
                Fazer Login
              </Button>
            )}
            {status === "authenticated" && (
              <Button
                variant="outline"
                className="width-full justify-start gap-2"
                onClick={handleLogoutClick}
              >
                <LogOutIcon size={16} />
                Fazer Logout
              </Button>
            )}
            <SheetClose asChild>
              <Link href="/">
                <Button
                  variant="outline"
                  className="width-full justify-start gap-2"
                >
                  <HomeIcon size={16} />
                  Início
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/orders">
                <Button
                  variant="outline"
                  className="width-full justify-start gap-2"
                >
                  <PackageSearchIcon size={16} />
                  Meus Pedidos
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/deals">
                <Button
                  variant="outline"
                  className="width-full justify-start gap-2"
                >
                  <PercentIcon size={16} />
                  Ofertas
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/catalog">
                <Button
                  variant="outline"
                  className="width-full justify-start gap-2"
                >
                  <ListOrderedIcon size={16} />
                  Catálogo
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/">
        <h1 className="text-lg font-semibold">
          <span className="text-primary">FSW</span> Store
        </h1>
      </Link>
      <Sheet>
        <SheetTrigger className="relative" asChild>
          <Button size="icon" variant="outline" className="relative">
            {products.length > 0 && (
              <span className="absolute right-[calc(-1.25rem/2)] top-[calc(-1.25rem/2)] flex h-6 w-6 items-center justify-center rounded-lg bg-primary font-sans text-sm font-bold">
                {products.length}
              </span>
            )}
            <ShoppingCartIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[350px]">
          <Cart />
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default Header;
