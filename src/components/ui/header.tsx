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
  SearchIcon,
  User2Icon,
  PackageSearch,
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
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "@/providers/cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Badge } from "./badge";
import { motion } from "framer-motion";
import SearchInput from "@/app/(home)/components/search-input";

const Header = () => {
  const [inputSearch, setInputSearch] = useState<boolean>(false);
  const { products } = useContext(CartContext);
  const searchInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Use type assertion to tell TypeScript that searchInputRef.current is not null
      const searchInputNode = searchInputRef.current;

      // Check if the click target is outside the search input
      if (searchInputNode && !searchInputNode.contains(event.target as Node)) {
        setInputSearch(false);
      }
    };

    // Add the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchInputRef]);

  const { status, data } = useSession();

  const handleLoginClick = async () => {
    await signIn();
  };
  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <Card
      className={`flex items-center justify-between p-[1.875rem]  ${styles.poppins}`}
    >
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
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
      <Link className="lg:mb-8" href="/">
        <h1 className="text-lg font-semibold lg:text-xl">
          <span className="font-bold text-primary">FSW</span>Store
        </h1>
      </Link>
      <div className="hidden items-center gap-2 lg:mb-8 lg:flex">
        <Link href="/">
          <Button variant="ghost" className="text-sm opacity-75">
            Início
          </Button>
        </Link>
        <Link href="/catalog">
          <Button variant="ghost" className="text-sm opacity-75">
            Catálogo
          </Button>
        </Link>
        <Link href="/deals">
          <Button variant="ghost" className="text-sm opacity-75">
            Ofertas
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2 lg:mb-8">
        <div className="relative" ref={searchInputRef}>
          {inputSearch && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "300px" }}
              exit={{ opacity: 0, width: 0 }}
              className="absolute right-[-5px] top-0 w-[300px]"
            >
              <SearchInput />
            </motion.span>
          )}
          <Button
            variant="outline"
            size="icon"
            className="hidden items-center justify-center lg:flex"
            onClick={() => setInputSearch(true)}
          >
            <SearchIcon />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="hidden items-center justify-center lg:flex"
              variant="outline"
              size="icon"
            >
              <User2Icon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            {data?.user && (
              <>
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 py-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {data.user.name?.[0].toUpperCase()}
                        </AvatarFallback>

                        {data.user.image && (
                          <AvatarImage src={data.user.image} />
                        )}
                      </Avatar>

                      <div className="flex flex-col">
                        <p className="text-sm font-medium">{data.user.name}</p>
                        <p className="text-xs opacity-75">Boas compras!</p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            {status === "unauthenticated" ? (
              <DropdownMenuItem
                onClick={handleLoginClick}
                className="flex items-center gap-2"
              >
                <LogInIcon size={16} /> Fazer login
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={handleLogoutClick}
                className="flex items-center gap-2"
              >
                <LogOutIcon size={16} /> Fazer logout
              </DropdownMenuItem>
            )}
            {data?.user && (
              <Link href="/orders">
                <DropdownMenuItem className="flex items-center gap-2">
                  <PackageSearch size={16} /> Meus pedidos
                </DropdownMenuItem>
              </Link>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              {products.length > 0 && (
                <Badge className="absolute -right-2 -top-2 flex h-5 w-6 items-center justify-center p-1 text-xs">
                  {products.length}
                </Badge>
              )}
              <ShoppingCartIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="min-w-[340px] lg:max-w-[550px]">
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </Card>
  );
};

export default Header;
