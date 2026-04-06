import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
    const [userInputCode, setUserInputCode] = useState("");
    const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } = useCartStore();

    useEffect(() => {
        getMyCoupon();
    }, [getMyCoupon]);

    useEffect(() => {
        if (coupon) setUserInputCode(coupon.code);
    }, [coupon]);

    const handleApplyCoupon = () => {
        if (!userInputCode) return;
        applyCoupon(userInputCode);
    };

    const handleRemoveCoupon = async () => {
        await removeCoupon();
        setUserInputCode("");
    };

    return (
        <motion.div
            className='surface-outline glass-card space-y-4 rounded-[1.75rem] p-5 sm:p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className='space-y-4'>
                <div>
                    <label htmlFor='voucher' className='mb-2 block text-sm font-medium text-slate-300'>
                        Do you have a voucher or gift card?
                    </label>
                    <input
                        type='text'
                        id='voucher'
                        className='block w-full rounded-2xl border border-white/10 bg-slate-950/45 p-3 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:ring-emerald-400'
                        placeholder='Enter code here'
                        value={userInputCode}
                        onChange={(e) => setUserInputCode(e.target.value)}
                        required
                    />
                </div>

                <motion.button
                    type='button'
                    className='flex w-full items-center justify-center rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-emerald-200 focus:outline-none focus:ring-4 focus:ring-emerald-300/30'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleApplyCoupon}
                >
                    Apply Code
                </motion.button>
            </div>
            {isCouponApplied && coupon && (
                <div className='mt-4'>
                    <h3 className='text-lg font-medium text-white'>Applied Coupon</h3>

                    <p className='mt-2 text-sm text-slate-400'>
                        {coupon.code} - {coupon.discountPercentage}% off
                    </p>

                    <motion.button
                        type='button'
                        className='mt-3 flex w-full items-center justify-center rounded-full bg-red-400/14 px-5 py-3 text-sm font-medium text-red-100 transition duration-300 hover:bg-red-400/20 focus:outline-none focus:ring-4 focus:ring-red-300/20'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRemoveCoupon}
                    >
                        Remove Coupon
                    </motion.button>
                </div>
            )}

            {coupon && (
                <div className='mt-4'>
                    <h3 className='text-lg font-medium text-white'>Your Available Coupon:</h3>
                    <p className='mt-2 text-sm text-slate-400'>
                        {coupon.code} - {coupon.discountPercentage}% off
                    </p>
                </div>
            )}
        </motion.div>
    );
};
export default GiftCouponCard;
