"use client";

import { useForm } from "react-hook-form";
import styles from "../../../styles/fonts.module.css";
import classNames from "classnames";
import { UserCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "@mui/material";

const RegisterPage = () => {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const router = useRouter();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      setRegisterSuccess(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    }
    // const resJSON = await res.json();
    console.log(res);
  });

  return (
    <div className="flex h-full flex-col items-center justify-center gap-0">
      {registerSuccess && (
        <Alert
          className="mb-2 mt-2 w-[80%]"
          variant="filled"
          severity="success"
        >
          Usuário cadastrado com sucesso!
        </Alert>
      )}
      <form
        onSubmit={onSubmit}
        className={`flex h-[520px] w-[80%] flex-col items-center justify-evenly py-4 ${
          registerSuccess ? "rounded-b-lg" : "rounded-lg"
        } bg-white text-black ${styles.poppins}`}
      >
        <div className="mb-2 flex flex-col items-center gap-1">
          <UserCircleIcon className="opacity-[0.7]" />
          <h2>Fazer cadastro</h2>
        </div>

        <div className=" flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm text-slate-700">
            Nome completo
          </label>
          <input
            type="text"
            placeholder="Digite seu nome completo"
            className="outline-solid mb-2 w-[250px] rounded-lg bg-[#E8F0FE] p-4 text-sm outline-2 outline-[#0390fc]"
            {...register("name", {
              required: {
                value: true,
                message: "Por favor, digite o nome do usuário!",
              },
            })}
          />
          {errors.name && (
            <span className="mt-1 text-xs text-red-500">
              {errors.name.message as any}
            </span>
          )}
        </div>

        <div className=" flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm text-slate-700">
            E-mail
          </label>
          <input
            type="email"
            placeholder="seuemail@exemplo.com"
            className="outline-solid mb-2 w-[250px] rounded-lg bg-[#E8F0FE] p-4 text-sm outline-2 outline-[#0390fc]"
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
          <label htmlFor="password" className="mb-1 text-sm text-slate-700">
            Senha
          </label>
          <input
            type="password"
            placeholder="Digite sua senha"
            className="outline-solid mb-2 w-[250px] rounded-lg bg-[#E8F0FE] p-4 text-sm outline-2 outline-[#0390fc]"
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

        <div className=" flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="mb-2 text-sm text-slate-700"
          >
            Confirmar senha
          </label>
          <input
            type="password"
            placeholder="Confirme sua senha"
            className="outline-solid mb-2 w-[250px] rounded-lg bg-[#E8F0FE] p-4 text-sm outline-2 outline-[#0390fc]"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "As senhas não coincidem!",
              },
            })}
          />
          {password !== confirmPassword && (
            <span className="mt-1 text-xs text-red-500">
              As senhas não coincidem!
            </span>
          )}
        </div>
        <button className="mt-2 w-[250px] rounded-lg bg-[#0390fc] p-4 font-medium uppercase text-white">
          Cadastrar
        </button>
        <a className="mt-2 text-sm" href="/auth/login">
          Já possui conta? Faça login!
        </a>
      </form>
    </div>
  );
};

export default RegisterPage;
