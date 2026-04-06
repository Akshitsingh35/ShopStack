import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryItem = ({ category, index = 0 }) => {
  return (
    <motion.div
      className='group relative h-[22rem] w-full overflow-hidden rounded-[2rem]'
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link to={`/category${category.href}`} className='block h-full w-full'>
        <div className='surface-outline glass-card relative h-full cursor-pointer overflow-hidden rounded-[2rem]'>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/12 to-slate-950/90 z-10' />
          <img
            src={category.imageUrl}
            alt={category.name}
            className='h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:rotate-[0.8deg]'
            loading='lazy'
          />
          <div className='absolute inset-x-0 bottom-0 z-20 p-6'>
            <div className='mb-4 flex items-center justify-between text-xs uppercase tracking-[0.32em] text-slate-300/80'>
              <span>Category</span>
              <span className='rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] text-slate-100'>
                New mood
              </span>
            </div>
            <div className='flex items-end justify-between gap-4'>
              <div>
                <h3 className='text-3xl font-semibold tracking-tight text-white'>{category.name}</h3>
                <p className='mt-2 text-sm leading-6 text-slate-300'>Explore refined picks in {category.name}.</p>
              </div>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white/12 text-white transition duration-300 group-hover:bg-emerald-300 group-hover:text-slate-950'>
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryItem;
