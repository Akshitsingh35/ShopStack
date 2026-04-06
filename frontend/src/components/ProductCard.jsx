import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ShoppingCart, ArrowUpRight } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    }

    addToCart(product);
  };

  return (
    <motion.div
      className='group flex w-full flex-col overflow-hidden rounded-[1.75rem]'
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -6 }}
    >
      <div className='surface-outline glass-card flex h-full flex-col overflow-hidden rounded-[1.75rem]'>
        <div className='relative m-3 flex h-64 overflow-hidden rounded-[1.35rem]'>
          <img className='w-full object-cover transition duration-500 ease-out group-hover:scale-105' src={product.image} alt={product.name} />
          <div className='absolute inset-0 bg-gradient-to-t from-slate-950/65 to-transparent' />
          <div className='absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/40 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-100'>
            New drop
          </div>
          <div className='absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white transition duration-300 group-hover:bg-emerald-300 group-hover:text-slate-950'>
            <ArrowUpRight size={18} />
          </div>
        </div>

        <div className='flex flex-1 flex-col px-5 pb-5 pt-2'>
          <h5 className='text-xl font-semibold tracking-tight text-white'>{product.name}</h5>
          <div className='mb-6 mt-3 flex items-center justify-between'>
            <p className='text-sm uppercase tracking-[0.2em] text-slate-400'>Curated pick</p>
            <span className='text-3xl font-semibold text-emerald-200'>${product.price}</span>
          </div>
          <button
            className='mt-auto flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-200 focus:outline-none focus:ring-4 focus:ring-emerald-300/30'
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
            Add to cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};
export default ProductCard;
