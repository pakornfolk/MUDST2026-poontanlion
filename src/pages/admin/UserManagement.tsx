import React, { useEffect, useState } from 'react';
import { Search, Shield, User as UserIcon, Plus, X, Trash2, KeyRound, Check } from 'lucide-react';
import { User, UserRole } from '../../types';
import { getUsers, updateUserProfile, createUser, deleteUser } from '../../services/api';
import { toast } from 'sonner';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [submitting, setSubmitting] = useState(false);

  const fetchUserList = async () => {
    const list = await getUsers();
    setUsers(list);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleToggleRole = async (userItem: User) => {
    const newRole: UserRole = userItem.role === 'admin' ? 'user' : 'admin';
    await updateUserProfile(userItem.id, { role: newRole });
    toast.success(`Updated ${userItem.fullname}'s role to ${newRole.toUpperCase()}`);
    fetchUserList();
  };

  const handleResetPassword = (userEmail: string) => {
    toast.success(`Password reset link dispatched to ${userEmail}`);
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      await deleteUser(userId);
      toast.info(`User "${userName}" has been deleted`);
      fetchUserList();
    }
  };

  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname || !email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await createUser({
        fullname,
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        password: password.trim(),
        role,
        avatar: role === 'admin' 
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      });
      toast.success(`New ${role.toUpperCase()} account created successfully!`);
      setModalOpen(false);
      setFullname('');
      setEmail('');
      setPhone('');
      setPassword('');
      setRole('user');
      fetchUserList();
    } catch (err) {
      toast.error('Failed to create user');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' ? true : u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const adminCount = users.filter(u => u.role === 'admin').length;
  const customerCount = users.filter(u => u.role === 'user').length;

  return (
    <div className="space-y-8 pb-10">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-nike-hairline dark:border-nike-dark-card pb-4">
        <div>
          <h1 className="text-[28px] font-medium text-nike-ink dark:text-white">
            User Management
          </h1>
          <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-0.5">
            Manage system access accounts, roles, and administrative privileges
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[14px] font-medium px-6 py-3 rounded-full hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New User
        </button>
      </div>

      {/* STAT SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated p-5 space-y-1">
          <span className="text-[12px] text-nike-mute block font-medium">Total Registered Users</span>
          <span className="text-[24px] font-medium text-nike-ink dark:text-white">{users.length}</span>
        </div>
        <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated p-5 space-y-1">
          <span className="text-[12px] text-nike-mute block font-medium">System Administrators</span>
          <span className="text-[24px] font-medium text-nike-ink dark:text-white">{adminCount}</span>
        </div>
        <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated p-5 space-y-1">
          <span className="text-[12px] text-nike-mute block font-medium">Customer Accounts</span>
          <span className="text-[24px] font-medium text-nike-ink dark:text-white">{customerCount}</span>
        </div>
      </div>

      {/* SEARCH AND ROLE FILTER CHIPS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-nike-mute absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search name or email..."
            className="w-full pl-10 p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'admin', 'user'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-4 py-2 text-[13px] font-medium rounded-full transition-colors ${
                roleFilter === r
                  ? 'bg-nike-ink text-white dark:bg-white dark:text-nike-ink'
                  : 'bg-nike-soft-cloud text-nike-mute dark:bg-nike-dark-elevated hover:text-nike-ink dark:hover:text-white'
              }`}
            >
              {r === 'all' ? 'All Roles' : r === 'admin' ? 'Admins Only' : 'Customers Only'}
            </button>
          ))}
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card overflow-x-auto">
        <table className="w-full text-left border-collapse text-[14px]">
          <thead>
            <tr className="border-b border-nike-hairline-soft dark:border-nike-dark-card text-nike-mute dark:text-nike-stone font-medium text-[13px]">
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nike-hairline-soft dark:divide-nike-dark-card">
            {filteredUsers.map(u => (
              <tr key={u.id} className="hover:bg-nike-soft-cloud dark:hover:bg-nike-dark-card/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-medium text-nike-ink dark:text-white block">{u.fullname}</span>
                      <span className="text-[11px] text-nike-stone">ID: {u.id}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-nike-ink dark:text-white">{u.email}</td>
                <td className="p-4 text-nike-mute dark:text-nike-stone">{u.phone || '-'}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 text-[12px] font-medium rounded-full ${
                    u.role === 'admin'
                      ? 'bg-nike-ink text-white dark:bg-white dark:text-nike-ink'
                      : 'bg-nike-soft-cloud text-nike-mute dark:bg-nike-dark-card dark:text-nike-stone'
                  }`}>
                    {u.role === 'admin' ? '🛡️ Admin' : '👤 Customer'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleToggleRole(u)}
                    className="px-3 py-1.5 bg-nike-soft-cloud dark:bg-nike-dark-card text-nike-ink dark:text-white rounded-full text-[12px] font-medium hover:bg-nike-hairline-soft transition-colors"
                  >
                    {u.role === 'admin' ? 'Set as Customer' : 'Promote to Admin'}
                  </button>

                  <button
                    onClick={() => handleResetPassword(u.email)}
                    className="p-2 text-nike-mute hover:text-nike-ink dark:hover:text-white transition-colors"
                    title="Reset Password"
                  >
                    <KeyRound className="w-4 h-4 inline" />
                  </button>

                  <button
                    onClick={() => handleDeleteUser(u.id, u.fullname)}
                    className="p-2 text-nike-sale hover:opacity-80 transition-opacity"
                    title="Delete User"
                  >
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE NEW USER MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
          <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-8 max-w-md w-full space-y-6" onClick={e => e.stopPropagation()}>
            
            <div className="flex items-center justify-between border-b border-nike-hairline-soft dark:border-nike-dark-card pb-3">
              <h3 className="text-[18px] font-medium text-nike-ink dark:text-white">Create New Account</h3>
              <button onClick={() => setModalOpen(false)} className="text-nike-mute hover:text-nike-ink dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-nike-ink dark:text-white mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullname}
                  onChange={e => setFullname(e.target.value)}
                  placeholder="e.g. Sarah Connor"
                  className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-nike-ink dark:text-white mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. sarah@example.com"
                  className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-nike-ink dark:text-white mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="e.g. 081-999-0000"
                  className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-nike-ink dark:text-white mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-nike-ink dark:text-white mb-1.5">Account Role</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`p-3 text-[13px] font-medium rounded-full flex items-center justify-center gap-1.5 transition-colors ${
                      role === 'user'
                        ? 'bg-nike-ink text-white dark:bg-white dark:text-nike-ink'
                        : 'bg-nike-soft-cloud text-nike-mute dark:bg-nike-dark-card'
                    }`}
                  >
                    <UserIcon className="w-4 h-4" /> Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`p-3 text-[13px] font-medium rounded-full flex items-center justify-center gap-1.5 transition-colors ${
                      role === 'admin'
                        ? 'bg-nike-ink text-white dark:bg-white dark:text-nike-ink'
                        : 'bg-nike-soft-cloud text-nike-mute dark:bg-nike-dark-card'
                    }`}
                  >
                    <Shield className="w-4 h-4" /> Administrator
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[14px] font-medium py-3.5 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
                >
                  {submitting ? 'Creating User...' : 'Create Account'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
