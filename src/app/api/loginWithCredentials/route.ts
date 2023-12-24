"use server";

import { prismaClient } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const loginWithCredentials = async (email: string, password: string) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    // Usuário não encontrado
    console.error("Usuário não encontrado");
    return null;
  }

  const hashedPassword = user.password as string;

  // Verificar a senha
  const passwordMatch = await bcrypt.compare(password, hashedPassword);

  if (passwordMatch) {
    // Senha corresponde
    console.log("Login bem-sucedido");
    return user;
  } else {
    // Senha incorreta
    console.error("Senha incorreta");
    return null;
  }
};

export default loginWithCredentials;
