export function getOrdersCountLabel(
  ordersCount: number,
  userType: "client" | "provider"
): string {
  const suffix =
    userType === "provider" ? "pedidos executados" : "pedidos feitos";
  return `${ordersCount} ${suffix}`;
}
