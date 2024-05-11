"use server";

import bcrypt from "bcryptjs";

import { FormTypes } from "@/types/forms";
import { Validation } from "@config/validation";
import { Handlers } from "@handlers/main";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export async function register(payload: { values: FormTypes.Expect.Register }) {
  return Handlers.Service.action(async () => {
    if (
      payload.values.password.length <
      Validation.Authentication.Register.passwordMinLength
    )
      return Handlers.Service.sendResponse(400, {
        description: "Validation Failed",
        data: null,
      });

    const hashedPassword = await bcrypt.hash(payload.values.password, 10);
    await connectMongoDB();

    const existingUser = await User.findOne({ email: payload.values.email });

    if (!!existingUser)
      return Handlers.Service.sendResponse(409, {
        description: "A user with this email already exists",
        data: null,
      });

    await User.create({
      firstName: payload.values.firstName,
      lastName: payload.values.lastName,
      email: payload.values.email,
      password: hashedPassword,
    });

    return Handlers.Service.sendResponse(201, {
      description: `User created with email: ${payload.values.email}`,
      data: null,
    });
  });
}
