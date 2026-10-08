import { auth } from "@/auth";

export const proxy = auth;

export const config = {
  matcher: ["/products/:id/edit", "/products/:id/delete"],
};