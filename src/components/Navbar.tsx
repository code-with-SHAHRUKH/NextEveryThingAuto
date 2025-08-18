'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  CircleUser,



} from 'lucide-react';





import { Button } from '@/components/ui/button';
import Image from 'next/image'; // Assuming Image component is used elsewhere or for actual logos
import useTokenStore from '@/store';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { decodeToken } from '@/utils/decodeToken';
const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const { token, setToken } = useTokenStore((state) => state);
  const userData = decodeToken(token);
  const role = userData?.role;


  const logout = () => {
    console.log('Logging out!');
    setToken('');
    toast.success("Logged out successfully!");
  };

  //user Login
  const login = () => {
    router.replace("/userlogin");
  };
  const gotoSettings = () => {
    router.replace("/admin/settings");
  };
  const gotoadminOrders = () => {
    router.replace("/admin/orders");
  };
  const gotouserOrders = () => {
    router.replace("/user/orders");
  };

  const gotoSettingsAndCloseMobileMenue = () => {
    router.replace("/admin/settings");
    closeMobileMenu();
  };
  const GotoOrdersAndCloseMobileMenue = () => {

    router.replace("/admin/orders");
    closeMobileMenu();

  };
  const GotoUserOrdersAndCloseMobileMenue = () => {
    router.replace("/user/orders");
    closeMobileMenu();
  };

  const logoutAndCloseMobileMenue = () => {
    console.log('Logging out!');
    setToken('');
    closeMobileMenu();
    toast.success("Logged out successfully!");
  };

  const loginAndCloseMobileMenue = () => {
    router.replace("/userlogin");
    closeMobileMenu();
  };
  return (
    <nav className="border-b shadow-sm bg-white relative z-30"> {/* Added z-30 for stacking context */}
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-6"> {/* Added px-4 for small screens */}
        <div className="flex items-center"> {/* Group logo and site name */}
          <Link href="/" className="flex items-center mr-14" onClick={closeMobileMenu}>
            <img
              src="/Mowed.itLogo.jpg"
              alt="TaskEasy Logo"
              width={122}
              height={70}
              className="object-contain mb-0"
            />
          </Link>
          <div className="hidden md:flex ml-8 space-x-8 text-lg text-gray-600"> {/* Navigation links for larger screens */}
            <Link href="/services" className="hover:text-gray-900">
              Services
            </Link>
            <Link href="/lawnmowing" className="hover:text-gray-900">
              Lawn Mowing
            </Link>

          </div>
        </div>

        {(token && role === 'superAdmin') ?
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full p-0 w-12 h-12">
                  <CircleUser className="h-10 w-10" />
                  {/* <span className="sr-only">Toggle user menu</span> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>


                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button onClick={gotoadminOrders} variant={'link'}>
                    Orders
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button onClick={gotoSettings} variant={'link'}>
                    Settings
                  </Button>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Button onClick={logout} variant={'link'}>
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> :
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full p-0 w-12 h-12">
                  <CircleUser className="h-10 w-10" />
                  {/* <span className="sr-only">Toggle user menu</span> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>


                <DropdownMenuSeparator />
                {
                  token && <DropdownMenuItem>
                    <Button onClick={gotouserOrders} variant={'link'}>
                      Orders
                    </Button>

                  </DropdownMenuItem>
                }
                {token ?
                  <DropdownMenuItem>
                    <Button onClick={logout} variant={'link'}>
                      Logout
                    </Button>
                  </DropdownMenuItem> :
                  <DropdownMenuItem>
                    <Button onClick={login} variant={'link'}>
                      Login
                    </Button>
                  </DropdownMenuItem>
                }
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        }
        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 p-2 rounded-md"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true" // For accessibility
        ></div>
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={closeMobileMenu}
            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 p-2 rounded-md"
            aria-label="Close mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav className="flex flex-col items-start px-4 py-2 space-y-4 text-lg text-gray-700">
          <Link href="/services" className="hover:text-gray-900 w-full" onClick={closeMobileMenu}>
            Services
          </Link>
          <Link href="/lawnmowing" className="hover:text-gray-900 w-full" onClick={closeMobileMenu}>
            Lawn Mowing
          </Link>
          {(token && role === 'superAdmin') && <span className="ml-1 text-[1.1rem] font-semibold text-gray-800 cursor-pointer" onClick={GotoOrdersAndCloseMobileMenue}>Orders</span>}
          {(token && role === 'user') && <span className="ml-1 text-[1.1rem] font-semibold text-gray-800 cursor-pointer" onClick={GotoUserOrdersAndCloseMobileMenue}>Orders</span>}
          {(token && role === 'superAdmin') && <span className="ml-1 text-[1.1rem] font-semibold text-gray-800 cursor-pointer" onClick={gotoSettingsAndCloseMobileMenue}>Settings</span>}
          {token && <span className="ml-1 text-[1.1rem] font-semibold text-gray-800 cursor-pointer" onClick={logoutAndCloseMobileMenue}>Logout</span>}
          {!token && <span className="ml-1 text-[1.1rem] font-semibold text-gray-800 cursor-pointer" onClick={loginAndCloseMobileMenue}>Login</span>}
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;