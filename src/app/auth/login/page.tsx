"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import styles from "../../../styles/fonts.module.css";
import classNames from "classnames";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert } from "@mui/material";
import { motion } from "framer-motion";

const Login = () => {
  const [error, setError] = useState("");
  const [showToastError, setShowToastError] = useState(false);
  const callbackUrl = "/";
  const { data: session } = useSession();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const router = useRouter();

  const handleGoogleLogin = async () => {
    signIn("google", { callbackUrl });
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log("CONSOLE LOG DATA: ", data);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log("CONSOLE RES: ", res);

    if (res?.error) {
      setError(res.error);
      setShowToastError(true);
    } else {
      // router.replace("/");
      router.refresh();
    }
  });

  return (
    <div className="flex h-full flex-col items-center justify-center gap-0">
      {showToastError && (
        <motion.div
          className="w-[80%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        </motion.div>
      )}

      {session?.user ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <Avatar className="h-[100px] w-[100px] rounded-[50%]">
            <AvatarImage src={session.user?.image as string} />
          </Avatar>
          <h1 className="text-lg">Seja bem-vindo(a)</h1>
          <h2 className="text-xl font-medium">{session.user?.name}</h2>
          <Link href="/" className="flex items-center gap-2 text-sm">
            <HomeIcon size={16} /> Ir para página inicial
          </Link>
          <Button
            variant="destructive"
            className="mt-2 w-[250px] rounded-l p-4 font-medium uppercase text-white"
            onClick={() => signOut()}
          >
            Fazer logout
          </Button>
        </div>
      ) : (
        <div
          className={`flex h-[520px] w-[80%] flex-col items-center justify-evenly ${
            showToastError ? "rounded-b-lg" : "rounded-lg"
          } bg-white py-4 text-black ${styles.poppins}`}
        >
          <button
            onClick={handleGoogleLogin}
            className="flex w-[250px] items-center justify-center gap-2 rounded-lg bg-red-500 p-3 text-[#fff]"
          >
            <Image
              src="/google.svg"
              alt="google icon"
              className="w-[30px] rounded-lg bg-[#fff] p-1"
              width={0}
              height={0}
              sizes="100vw"
            />{" "}
            Login com o Google
          </button>
          <p className="mx-auto my-4 flex w-[80%] items-center justify-evenly  before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            or
          </p>
          <p className="mb-4 ">Faça login com credenciais</p>
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center gap-4"
          >
            <div className=" flex flex-col">
              <label htmlFor="email" className="mb-2 text-sm text-slate-700">
                E-mail
              </label>
              <input
                onFocus={() => setShowToastError(false)}
                type="email"
                placeholder="seuemail@exemplo.com"
                className="outline-solid w-[250px] rounded-lg bg-[#E8F0FE] p-4 text-sm outline-2 outline-[#0390fc]"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Por favor, digite um e-mail válido!",
                  },
                })}
              />
              {errors.email && (
                <span className="mt-1 text-xs text-red-500">
                  {errors.email.message as any}
                </span>
              )}
            </div>

            <div className=" flex flex-col">
              <label htmlFor="password" className="mb-2 text-sm text-slate-700">
                Senha
              </label>
              <input
                onFocus={() => setShowToastError(false)}
                type="password"
                placeholder="Digite sua senha"
                className="outline-solid w-[250px] rounded-lg bg-[#E8F0FE] p-4 text-sm outline-2 outline-[#0390fc]"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Por favor, digite uma senha válida!",
                  },
                })}
              />
              {errors.password && (
                <span className="mt-1 text-xs text-red-500">
                  {errors.password.message as any}
                </span>
              )}
            </div>

            <button className="mt-2 w-[250px] rounded-lg bg-[#0390fc] p-4 font-medium uppercase text-white">
              Fazer login
            </button>
            <p className="flex gap-1 text-sm">
              Não possui conta?
              <a href="/auth/register" className=" text-[#0267b5]">
                Cadastre-se agora
              </a>
            </p>
            <a href="#" className="text-sm text-[#0267b5]">
              Esqueceu a senha?
            </a>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
