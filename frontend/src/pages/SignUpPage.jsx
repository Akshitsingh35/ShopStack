import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className='px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr]'>
        <motion.div
          className='flex flex-col justify-center'
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className='inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100'>
            <UserPlus className='h-4 w-4' />
            New account
          </div>
          <h1 className='mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl'>
            Create your profile for a
            <span className='text-gradient block'>sharper shopping flow.</span>
          </h1>
          <p className='mt-6 max-w-xl text-lg leading-8 text-slate-300'>
            Register once to unlock saved carts, coupon support, and the updated browsing experience.
          </p>
        </motion.div>

        <motion.div
          className='surface-outline glass-panel rounded-[2rem] p-6 sm:p-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          <div className='mb-8'>
            <h2 className='text-3xl font-semibold text-white'>Create account</h2>
            <p className='mt-2 text-sm leading-7 text-slate-400'>The signup flow now matches the updated storefront styling and spacing.</p>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-slate-300'>
                Full name
              </label>
              <div className='mt-2 relative rounded-2xl shadow-sm'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
                  <User className='h-5 w-5 text-slate-500' aria-hidden='true' />
                </div>
                <input
                  id='name'
                  type='text'
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className='block w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 pl-11 text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 sm:text-sm'
                  placeholder='John Doe'
                />
              </div>
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium text-slate-300'>
                Email address
              </label>
              <div className='mt-2 relative rounded-2xl shadow-sm'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
                  <Mail className='h-5 w-5 text-slate-500' aria-hidden='true' />
                </div>
                <input
                  id='email'
                  type='email'
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className='block w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 pl-11 text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 sm:text-sm'
                  placeholder='you@example.com'
                />
              </div>
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-slate-300'>
                Password
              </label>
              <div className='mt-2 relative rounded-2xl shadow-sm'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
                  <Lock className='h-5 w-5 text-slate-500' aria-hidden='true' />
                </div>
                <input
                  id='password'
                  type='password'
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className='block w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 pl-11 text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 sm:text-sm'
                  placeholder='••••••••'
                />
              </div>
            </div>

            <div>
              <label htmlFor='confirmPassword' className='block text-sm font-medium text-slate-300'>
                Confirm Password
              </label>
              <div className='mt-2 relative rounded-2xl shadow-sm'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
                  <Lock className='h-5 w-5 text-slate-500' aria-hidden='true' />
                </div>
                <input
                  id='confirmPassword'
                  type='password'
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className='block w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 pl-11 text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 sm:text-sm'
                  placeholder='••••••••'
                />
              </div>
            </div>

            <button
              type='submit'
              className='flex w-full justify-center rounded-full bg-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950 transition duration-150 ease-in-out hover:bg-emerald-200 focus:outline-none focus:ring-4 focus:ring-emerald-300/30 disabled:opacity-50'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                  Loading...
                </>
              ) : (
                <>
                  <UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
                  Sign up
                </>
              )}
            </button>
          </form>

          <p className='mt-8 text-center text-sm text-slate-400'>
            Already have an account?{" "}
            <Link to='/login' className='font-medium text-emerald-200 hover:text-emerald-100'>
              Login here <ArrowRight className='inline h-4 w-4' />
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
export default SignUpPage;
