import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { useCartStore } from "./stores/useCartStore";
import AIChatbot from "./components/AIChatbot";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className='relative min-h-screen overflow-hidden text-white'>
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='ambient-grid absolute inset-0 opacity-30' />
        <div className='floating-orb -left-24 top-20 h-72 w-72 bg-emerald-400/25' />
        <div className='floating-orb right-[-5rem] top-64 h-96 w-96 bg-amber-300/10' />
        <div className='floating-orb bottom-[-6rem] left-1/3 h-80 w-80 bg-teal-300/10' />
      </div>

      <div className='relative z-50 pt-24'>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
          <Route
            path='/secret-dashboard'
            element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
          />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
          <Route
            path='/purchase-success'
            element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
          />
          <Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
        </Routes>
      </div>
      <AIChatbot />
      <Toaster />
    </div>
  );
}

export default App;
