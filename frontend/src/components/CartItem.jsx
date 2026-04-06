import { motion } from "framer-motion";
import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <motion.div
      className='surface-outline glass-card rounded-[1.75rem] p-4 md:p-6'
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className='space-y-5 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
        <div className='shrink-0 md:order-1'>
          <img className='h-24 w-24 rounded-2xl object-cover md:h-32 md:w-32' src={item.image} alt={item.name} />
        </div>
        <label className='sr-only'>Choose quantity:</label>

        <div className='flex items-center justify-between md:order-3 md:justify-end'>
          <div className='flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-3 py-2'>
            <button
              className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-950/50 text-slate-200 transition duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500'
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >
              <Minus size={16} />
            </button>
            <p className='min-w-6 text-center text-sm font-medium text-white'>{item.quantity}</p>
            <button
              className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-950/50 text-slate-200 transition duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500'
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus size={16} />
            </button>
          </div>

          <div className='text-end md:order-4 md:w-32'>
            <p className='text-sm uppercase tracking-[0.2em] text-slate-400'>Price</p>
            <p className='mt-1 text-xl font-semibold text-emerald-200'>${item.price}</p>
          </div>
        </div>

        <div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
          <div className='space-y-2'>
            <p className='text-xl font-semibold text-white'>{item.name}</p>
            <p className='text-sm leading-6 text-slate-400'>{item.description}</p>
          </div>

          <div className='flex items-center gap-4'>
            <button
              className='inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-200 transition duration-300 hover:bg-red-400/16'
              onClick={() => removeFromCart(item._id)}
            >
              <Trash size={16} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default CartItem;
