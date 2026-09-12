'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  User as UserIcon,
  Search,
  Menu,
  X,
  Package,
  MapPin,
  LogOut,
  ChevronDown,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout, switchDemoUser } = useAuth();
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Catalog', href: '/catalog' },
    { label: 'Audio', href: '/catalog?category=Audio' },
    { label: 'Wearables', href: '/catalog?category=Wearables' },
    { label: 'Computing', href: '/catalog?category=Computing' },
    { label: 'Living', href: '/catalog?category=Living' },
    { label: 'Orders & Tracking', href: '/orders' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-wider text-zinc-100 font-sans group-hover:text-white">
              AETHER
            </span>
            <span className="text-[10px] tracking-widest text-indigo-400 font-medium uppercase -mt-1">
              Atelier
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action icons (Search, Theme, Cart, User) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick catalog search button */}
          <Link
            href="/catalog"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Search Catalog"
          >
            <Search className="w-5 h-5" />
          </Link>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Cart button with live count */}
          <Link
            href="/cart"
            className="relative p-2.5 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 transition-colors group"
            title="View Cart"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-indigo-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>

          {/* User Account / Profile Menu */}
          {/* User Account / Profile Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all text-left"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden relative bg-indigo-900/60 border border-indigo-500/30 shrink-0">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-600 text-[11px] font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="text-xs font-semibold text-zinc-200 sm:inline max-w-[100px] truncate">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 mr-1" />
              </button>

              {/* Dropdown menu */}
              {userDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl dropdown-menu-panel p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-3 border-b border-white/10 mb-1">
                      <p className="text-sm font-bold text-white">{user.name}</p>
                      <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                      <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider dropdown-badge">
                        {user.role} account
                      </div>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-200 hover:text-white dropdown-item-hover rounded-xl transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-indigo-400" />
                      Profile & Saved Addresses
                    </Link>

                    <Link
                      href="/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-200 hover:text-white dropdown-item-hover rounded-xl transition-colors"
                    >
                      <Package className="w-4 h-4 text-sky-400" />
                      Orders & Live Tracking
                    </Link>

                    <div className="border-t border-white/10 my-1 pt-1">
                      <div className="px-3 py-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                        Switch Account
                      </div>
                      <button
                        onClick={() => {
                          switchDemoUser('user-001');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-zinc-300 dropdown-item-hover rounded-lg transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                          <span>Alex Mercer (Customer)</span>
                        </div>
                        {user.id === 'user-001' && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          switchDemoUser('user-002');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-zinc-300 dropdown-item-hover rounded-lg transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                          <span>Elena Rostova (Admin)</span>
                        </div>
                        {user.id === 'user-002' && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                        )}
                      </button>
                    </div>

                    <div className="border-t border-white/10 my-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Sign In</span>
                <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
              </button>

              {userDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl dropdown-menu-panel p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-3 border-b border-white/10 mb-1">
                      <p className="text-sm font-bold text-white">Welcome to Aether</p>
                      <p className="text-xs text-zinc-400">Sign in to track hardware orders</p>
                    </div>

                    <Link
                      href="/auth/login"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2 px-3 my-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
                    >
                      <UserIcon className="w-3.5 h-3.5" />
                      Sign In to Account
                    </Link>

                    <Link
                      href="/auth/register"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2 px-3 mb-2 rounded-xl dropdown-item-hover text-xs font-semibold text-zinc-200 hover:text-white transition-all border border-white/10"
                    >
                      Create Free Account
                    </Link>

                    <div className="border-t border-white/10 pt-2">
                      <div className="px-3 py-1 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                        Instant Demo Login
                      </div>
                      <button
                        onClick={() => {
                          switchDemoUser('user-001');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-zinc-300 dropdown-item-hover rounded-lg transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                          <span>Alex Mercer (Customer)</span>
                        </div>
                        <span className="text-[10px] text-indigo-400 font-semibold">Demo</span>
                      </button>
                      <button
                        onClick={() => {
                          switchDemoUser('user-002');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-zinc-300 dropdown-item-hover rounded-lg transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                          <span>Elena Rostova (Admin)</span>
                        </div>
                        <span className="text-[10px] text-sky-400 font-semibold">Admin</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-white/10 px-4 pt-3 pb-6 space-y-1 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2.5 rounded-xl text-base font-medium ${
                pathname === link.href
                  ? 'bg-white/10 text-white'
                  : 'text-zinc-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 space-y-1">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:bg-white/5"
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-600" />
                )}
                <span>{theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
              </span>
              <span className="text-xs uppercase text-zinc-400 font-mono">{theme}</span>
            </button>
          </div>
          {user && (
            <div className="pt-2 border-t border-white/10 space-y-1">
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm text-zinc-300 hover:bg-white/5"
              >
                <UserIcon className="w-4 h-4 text-indigo-400" />
                Profile & Saved Addresses
              </Link>
              <Link
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm text-zinc-300 hover:bg-white/5"
              >
                <Package className="w-4 h-4 text-sky-400" />
                My Orders
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
