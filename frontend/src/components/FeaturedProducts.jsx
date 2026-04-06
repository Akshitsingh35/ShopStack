import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const { addToCart } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  return (
    <section className='space-y-6 py-8'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='text-sm uppercase tracking-[0.32em] text-emerald-200/70'>Featured edit</p>
          <h2 className='text-3xl font-semibold tracking-tight text-white sm:text-4xl'>Current standouts</h2>
        </div>
        <p className='max-w-xl text-sm leading-7 text-slate-400'>
          High-contrast product cards with tighter pricing hierarchy and motion that feels intentional rather than
          decorative.
        </p>
      </div>

      <div className='relative'>
        <div className='overflow-hidden'>
          <motion.div
            className='flex'
            animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {featuredProducts?.map((product) => (
              <div key={product._id} className='w-full flex-shrink-0 px-2 sm:w-1/2 lg:w-1/3 xl:w-1/4'>
                <div className='surface-outline glass-card group h-full overflow-hidden rounded-[1.75rem]'>
                  <div className='relative overflow-hidden'>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='h-60 w-full object-cover transition duration-500 ease-out group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent' />
                    <div className='absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/45 px-3 py-1 text-xs uppercase tracking-[0.22em] text-emerald-100'>
                      Featured
                    </div>
                  </div>
                  <div className='space-y-4 p-5'>
                    <div className='flex items-start justify-between gap-4'>
                      <h3 className='text-lg font-semibold text-white'>{product.name}</h3>
                      <p className='text-lg font-semibold text-emerald-200'>${product.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className='flex w-full items-center justify-center gap-2 rounded-full bg-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-200'
                    >
                      <ShoppingCart className='h-4 w-4' />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <button
          onClick={prevSlide}
          disabled={isStartDisabled}
          className={`absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border transition duration-300 ${
            isStartDisabled
              ? "cursor-not-allowed border-white/10 bg-white/5 text-slate-500"
              : "border-white/10 bg-slate-950/70 text-white hover:bg-slate-900"
          }`}
        >
          <ChevronLeft className='h-5 w-5' />
        </button>

        <button
          onClick={nextSlide}
          disabled={isEndDisabled}
          className={`absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border transition duration-300 ${
            isEndDisabled
              ? "cursor-not-allowed border-white/10 bg-white/5 text-slate-500"
              : "border-white/10 bg-slate-950/70 text-white hover:bg-slate-900"
          }`}
        >
          <ChevronRight className='h-5 w-5' />
        </button>
      </div>
    </section>
  );
};
export default FeaturedProducts;
