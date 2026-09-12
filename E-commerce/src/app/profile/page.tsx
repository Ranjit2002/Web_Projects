'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User as UserIcon,
  MapPin,
  Plus,
  Trash2,
  Edit2,
  Check,
  Shield,
  Phone,
  Mail,
  Package,
  Sparkles,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Address } from '@/types/user';

export default function ProfilePage() {
  const {
    user,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    switchDemoUser,
    logout,
  } = useAuth();
  const { toast } = useToast();

  // Profile Form state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Address Modal state
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState<Omit<Address, 'id'>>({
    label: 'Home',
    fullName: user?.name || '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phone: user?.phone || '',
    isDefault: false,
  });

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Not Signed In</h2>
        <p className="text-sm text-zinc-400">
          Sign in or switch to a demo profile to manage your personal data and addresses.
        </p>
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
        >
          Sign In / Demo Login
        </Link>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone, avatar });
    setIsEditingProfile(false);
    toast('Profile credentials updated successfully', 'success');
  };

  const handleOpenAddressModal = (addr?: Address) => {
    if (addr) {
      setEditingAddressId(addr.id);
      setAddressForm({
        label: addr.label,
        fullName: addr.fullName,
        street1: addr.street1,
        street2: addr.street2 || '',
        city: addr.city,
        state: addr.state,
        postalCode: addr.postalCode,
        country: addr.country,
        phone: addr.phone,
        isDefault: addr.isDefault,
      });
    } else {
      setEditingAddressId(null);
      setAddressForm({
        label: 'Home',
        fullName: user.name,
        street1: '',
        street2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
        phone: user.phone || '',
        isDefault: user.addresses.length === 0,
      });
    }
    setAddressModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.fullName || !addressForm.street1 || !addressForm.city || !addressForm.postalCode) {
      toast('Please complete all required address fields', 'error');
      return;
    }

    if (editingAddressId) {
      updateAddress(editingAddressId, addressForm);
      toast('Address updated successfully', 'success');
    } else {
      addAddress(addressForm);
      toast('New shipping destination added to address book', 'success');
    }

    setAddressModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header with User Overview */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500/40 bg-zinc-900 shadow-xl flex-shrink-0">
            {user.avatar ? (
              <Image src={user.avatar} alt={user.name} fill className="object-cover" />
            ) : (
              <UserIcon className="w-10 h-10 m-5 text-indigo-400" />
            )}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-zinc-400">{user.email}</p>
            {user.phone && <p className="text-xs text-zinc-400">{user.phone}</p>}
          </div>
        </div>

        {/* Quick Actions & Demo Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors flex items-center gap-1.5"
          >
            <Edit2 className="w-3.5 h-3.5" />
            {isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}
          </button>
          <Link
            href="/orders"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5 shadow-md"
          >
            <Package className="w-3.5 h-3.5" />
            My Orders
          </Link>
        </div>
      </div>

      {/* Edit Profile Panel (if open) */}
      {isEditingProfile && (
        <form
          onSubmit={handleSaveProfile}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/30 space-y-6 animate-in fade-in"
        >
          <h3 className="text-base font-bold text-white pb-3 border-b border-white/10 flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-indigo-400" /> Update Account Credentials
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Avatar Image URL</label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Address Book Management Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-400" /> Saved Address Book
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Add, update, or remove shipping locations for rapid one-click checkout.
            </p>
          </div>

          <button
            onClick={() => handleOpenAddressModal()}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Destination
          </button>
        </div>

        {/* Address Cards Grid */}
        {user.addresses && user.addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.addresses.map((addr) => (
              <div
                key={addr.id}
                className={`glass-card rounded-3xl p-6 border transition-all flex flex-col justify-between ${
                  addr.isDefault
                    ? 'border-indigo-500 bg-indigo-500/5 shadow-lg shadow-indigo-500/10'
                    : 'border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Default Address
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-zinc-300 space-y-1">
                    <p className="font-semibold text-white">{addr.fullName}</p>
                    <p>{addr.street1}</p>
                    {addr.street2 && <p>{addr.street2}</p>}
                    <p>
                      {addr.city}, {addr.state} {addr.postalCode}
                    </p>
                    <p>{addr.country}</p>
                    <p className="text-zinc-400 pt-1">Tel: {addr.phone}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenAddressModal(addr)}
                      className="text-zinc-400 hover:text-white p-1 rounded transition-colors"
                      title="Edit address"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="text-zinc-400 hover:text-rose-400 p-1 rounded transition-colors"
                      title="Delete address"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      Make Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl glass border border-white/10 space-y-3">
            <MapPin className="w-8 h-8 text-zinc-500 mx-auto" />
            <h3 className="text-sm font-bold text-white">No addresses saved yet</h3>
            <p className="text-xs text-zinc-400">
              Save your primary shipping address for instant auto-filling at checkout.
            </p>
            <button
              onClick={() => handleOpenAddressModal()}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Add Your First Address
            </button>
          </div>
        )}
      </div>

      {/* Address Form Modal */}
      {addressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">
                {editingAddressId ? 'Edit Address' : 'Add New Shipping Destination'}
              </h3>
              <button
                onClick={() => setAddressModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Label (e.g. Home, Work) *
                  </label>
                  <input
                    type="text"
                    value={addressForm.label}
                    onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    value={addressForm.fullName}
                    onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Street Address Line 1 *
                </label>
                <input
                  type="text"
                  value={addressForm.street1}
                  onChange={(e) => setAddressForm({ ...addressForm, street1: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Apartment, Suite, Unit (Optional)
                </label>
                <input
                  type="text"
                  value={addressForm.street2}
                  onChange={(e) => setAddressForm({ ...addressForm, street2: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">City *</label>
                  <input
                    type="text"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">State *</label>
                  <input
                    type="text"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Postal *</label>
                  <input
                    type="text"
                    value={addressForm.postalCode}
                    onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Country</label>
                  <select
                    value={addressForm.country}
                    onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="India">India</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Singapore">Singapore</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                  className="w-4 h-4 rounded bg-white/5 border-white/20 text-indigo-600"
                />
                <span className="text-xs text-zinc-300">Set as default shipping address</span>
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setAddressModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
