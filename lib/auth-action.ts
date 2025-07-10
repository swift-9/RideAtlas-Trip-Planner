"use server";

import { signIn, signOut } from "@/auth";

export const login = async () => {
  return await signIn("github", {
    redirectTo: "/", // 👈 Redirect after successful login
  });
};

export const logout = async () => {
  return await signOut({
    redirectTo: "/", // 👈 Redirect after logout
  });
};
