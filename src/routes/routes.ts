export const publicRoutes = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/pricing",
  "/login",
  "/register",
];

export const protectedPrefixes = [
  "/dashboard",
  "/courier",
  "/admin",
  "/payment",
];

export const roleRoutes = {
  CUSTOMER: "/dashboard",
  COURIER: "/courier",
  ADMIN: "/admin",
} as const;
