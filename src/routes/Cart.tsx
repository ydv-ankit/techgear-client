import { CartItems } from "@/components/CartItem";

export default function Cart() {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <h1 className="mx-auto text-center text-2xl">Cart Items</h1>
      <CartItems />
    </div>
  );
}
