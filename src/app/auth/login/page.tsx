"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import styles from "../../../styles/fonts.module.css";
import classNames from "classnames";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HomeIcon } from "lucide-react";
import { prismaClient } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import loginWithCredentials from "../../api/loginWithCredentials/route";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});

  const handleGoogleLogin = () => {
    signIn("google");
  };

  const handleCredentialsLogin = async (ev: React.FormEvent) => {
    ev.preventDefault();

    const isEmailValid = validateEmail(email);
    if (isEmailValid) {
      try {
        const loggedInUser = await loginWithCredentials(email, password);
        // setUser(loggedInUser as {});

        console.log("CONSOLE loggedInUser: ", loggedInUser);

        if (loggedInUser) {
          signIn("credentials", {
            user: loggedInUser,
          });
          console.log("CONSOLE DO STATE USER: ", user);

          setUser(loggedInUser as {});
          setIsLoggedIn(true);
          setError("");
        } else {
          setIsLoggedIn(false);
          setError("Credenciais inválidas!");
        }
        // signIn("credentials");
      } catch (error) {
        setIsLoggedIn(false);
        setError("Usuário não encontrado!");
        console.log("Não foi possível fazer login!", error);
      }
    }
  };

  const validateEmail = (value: any) => {
    if (value.length === 0) {
      setError("Preencha um e-mail!");
      return false;
    } else if (
      !/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/.test(
        value,
      )
    ) {
      setError("Preencha um e-mail válido!");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const handleBlur = ({ target }: any) => {
    validateEmail(target.value);
  };

  const handleChange = ({ target }: any) => {
    if (error) validateEmail(target.value);
    setEmail(target.value);
  };

  return (
    <div className="flex h-full justify-center">
      <form
        onSubmit={handleCredentialsLogin}
        className={`m-auto flex h-[500px] w-[80%] flex-col items-center justify-evenly rounded-lg bg-white text-black ${styles.poppins}`}
      >
        {!session || isLoggedIn ? (
          <>
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
            <p className="text-sm">ou</p>
            <p className="text-sm">Entre com as credenciais</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label>E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="outline-solid w-[250px] rounded-lg bg-[#E8F0FE] p-4 text-sm outline-2 outline-[#0390fc]"
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
              </div>
              <div className="flex flex-col">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-solid w-[250px] rounded-lg bg-[#E8F0FE] p-4 text-sm outline-2 outline-[#0390fc]"
                />
              </div>
            </div>
            <button
              className="w-[250px] rounded-lg bg-[#0390fc] p-4 font-medium uppercase text-white"
              type="submit"
              onClick={handleCredentialsLogin}
            >
              Fazer login
            </button>
            <Link className="text-sm" href="/auth/register">
              Não possui uma conta? Cadastre-se
            </Link>
          </>
        ) : (
          isLoggedIn && (
            <div className="flex flex-col items-center justify-center gap-2">
              <Avatar className="h-[100px] w-[100px]">
                <AvatarImage src={session.user?.image as string} />
              </Avatar>
              <h1 className="text-lg">Seja bem-vindo(a)</h1>
              <h2 className="text-xl font-medium">{session.user?.name}</h2>
              <Link href="/" className="flex items-center gap-2 text-sm">
                <HomeIcon size={16} /> Ir para página inicial
              </Link>
            </div>
          )
        )}
      </form>
    </div>
  );
};

export default Login;
