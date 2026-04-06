import { motion } from "framer-motion";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  return (
    <motion.header
      className='fixed top-0 left-0 z-40 w-full border-b border-white/8 bg-slate-950/55 backdrop-blur-2xl'
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8'>
        <Link
          to='/'
          className='surface-outline glass-panel flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold tracking-[0.28em] text-white transition duration-300 hover:-translate-y-0.5'
        >
          <span className='flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/16 text-emerald-300'>
            <Sparkles size={16} />
          </span>
          <span className='text-gradient text-base tracking-[0.32em]'>SHOPSTACK</span>
        </Link>

        <nav className='flex flex-wrap items-center gap-3 text-sm text-slate-200'>
          <Link
            to='/'
            className='rounded-full border border-white/10 px-4 py-2 text-slate-300 transition duration-300 hover:border-emerald-300/30 hover:bg-white/6 hover:text-white'
          >
            Home
          </Link>

          {user && (
            <Link
              to='/cart'
              className='surface-outline glass-card relative flex items-center gap-2 rounded-full px-4 py-2 text-white transition duration-300 hover:-translate-y-0.5'
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {cart.length > 0 && (
                <span className='flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-300 px-2 text-xs font-semibold text-slate-950'>
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {isAdmin && (
            <Link
              className='rounded-full border border-emerald-300/30 bg-emerald-400/12 px-4 py-2 font-medium text-emerald-100 transition duration-300 hover:bg-emerald-400/20'
              to='/secret-dashboard'
            >
              <span className='flex items-center gap-2'>
                <Lock size={16} />
                Dashboard
              </span>
            </Link>
          )}

          {user ? (
            <button
              className='rounded-full border border-white/10 bg-white/6 px-4 py-2 text-white transition duration-300 hover:border-red-300/30 hover:bg-red-400/10'
              onClick={logout}
            >
              <span className='flex items-center gap-2'>
                <LogOut size={16} />
                Log Out
              </span>
            </button>
          ) : (
            <>
              <Link
                to='/signup'
                className='rounded-full bg-emerald-300 px-4 py-2 font-medium text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-200'
              >
                <span className='flex items-center gap-2'>
                  <UserPlus size={16} />
                  Sign Up
                </span>
              </Link>
              <Link
                to='/login'
                className='rounded-full border border-white/10 bg-white/6 px-4 py-2 text-white transition duration-300 hover:border-white/20 hover:bg-white/10'
              >
                <span className='flex items-center gap-2'>
                  <LogIn size={16} />
                  Login
                </span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
};
export default Navbar;
