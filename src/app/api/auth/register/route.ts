import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log(data);

    const foundUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (foundUser) {
      return NextResponse.json(
        {
          message: "Esse e-mail já está cadastrado!",
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(newUser);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
