import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    <div className='py-8 md:py-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <p className='text-sm uppercase tracking-[0.32em] text-emerald-200/70'>Cart</p>
            <h1 className='text-4xl font-semibold tracking-tight text-white sm:text-5xl'>Review your selections</h1>
          </div>
          <p className='max-w-xl text-sm leading-7 text-slate-400'>
            The cart now uses softer glass panels, clearer quantity controls, and a more premium checkout layout.
          </p>
        </div>

        <div className='mt-6 gap-6 lg:flex lg:items-start xl:gap-8'>
          <motion.div
            className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className='space-y-6'>
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
            {cart.length > 0 && <PeopleAlsoBought />}
          </motion.div>

          {cart.length > 0 && (
            <motion.div
              className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <OrderSummary />
              <GiftCouponCard />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CartPage;

const EmptyCartUI = () => (
  <motion.div
    className='glass-panel flex flex-col items-center justify-center space-y-4 rounded-[2rem] px-6 py-16 text-center'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className='flex h-24 w-24 items-center justify-center rounded-full bg-emerald-300/10 text-emerald-200'>
      <ShoppingCart className='h-10 w-10' />
    </div>
    <h3 className='text-3xl font-semibold text-white'>Your cart is empty</h3>
    <p className='max-w-md text-slate-400'>Looks like you {"haven't"} added anything yet. Start with the refreshed storefront.</p>
    <Link
      className='mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-300 px-6 py-3 font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-200'
      to='/'
    >
      Start Shopping
      <ArrowRight size={16} />
    </Link>
  </motion.div>
);
