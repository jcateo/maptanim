import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { trpc } from '../../lib/trpc';
import { Search, Download, Edit2, Ban, ShieldAlert, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { withRoleProtection } from '../../components/withRoleProtection';

function ManageUsers() {
  const { data: users, isLoading, refetch } = trpc.admin.users.list.useQuery();
  const updateRoleMutation = trpc.admin.users.updateRole.useMutation({
    onSuccess: () => {
      toast.success("User role updated.");
      refetch();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update role");
    }
  });

  const [search, setSearch] = useState('');
  
  // State for inline editing
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [roleSelect, setRoleSelect] = useState<string>('');

  const filteredUsers = users?.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const startEditing = (user: any) => {
    setEditingUserId(user.id);
    setRoleSelect(user.role);
  };

  const handleUpdateClick = (userId: number) => {
    if (roleSelect) {
      updateRoleMutation.mutate({ userId, role: roleSelect as "farmer" | "extension_officer" | "admin" });
      setEditingUserId(null);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'farmer':
        return <span className="bg-earth-100 text-earth-700 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">Farmer</span>;
      case 'extension_officer':
        return <span className="bg-sky-100 text-sky-700 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">Extension Officer</span>;
      case 'admin':
        return <span className="bg-gray-100 text-gray-700 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">Admin</span>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 font-inter max-w-6xl mx-auto h-full flex flex-col">
        <div className="mb-6 shrink-0">
          <h1 className="text-2xl font-bold text-gray-800">Platform Users</h1>
          <p className="text-sm text-gray-500 mt-1">Manage user roles, access, and status across the platform.</p>
        </div>

        {/* TOOLBAR */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 shrink-0">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="pl-10 w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button onClick={() => toast.info('Export coming soon')} className="bg-white border border-gray-200 hover:border-brand-300 hover:bg-brand-50 text-gray-700 hover:text-brand-700 text-sm font-semibold rounded-lg px-4 py-2 flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* USERS TABLE */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12">
                      <div className="space-y-4">
                        <div className="skeleton h-12 w-full rounded-lg"></div>
                        <div className="skeleton h-12 w-full rounded-lg"></div>
                        <div className="skeleton h-12 w-full rounded-lg"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
                        <Search className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-600 font-medium text-base">No users found</p>
                      <p className="text-gray-400 text-sm mt-1">Try adjusting your search term.</p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers?.map((user: any) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* USER COLUMN */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center shrink-0
                            ${user.role === 'admin' ? 'bg-gray-100 text-gray-700' :
                              user.role === 'extension_officer' ? 'bg-sky-100 text-sky-700' :
                                'bg-earth-100 text-earth-700'}`}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-800">{user.name}</div>
                            <div className="text-[11px] text-gray-500 mt-0.5">Joined {user.createdAt ? format(new Date(user.createdAt), 'MMM yyyy') : 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      
                      {/* ROLE COLUMN */}
                      <td className="px-6 py-4">
                        {editingUserId === user.id ? (
                          <select
                            value={roleSelect}
                            onChange={(e) => setRoleSelect(e.target.value)}
                            className="bg-white border border-brand-300 rounded-lg px-2 py-1.5 text-xs text-gray-800 focus:ring-2 focus:ring-brand-500/20 outline-none w-full max-w-[140px]"
                          >
                            <option value="farmer">Farmer</option>
                            <option value="extension_officer">Officer</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          getRoleBadge(user.role)
                        )}
                      </td>
                      
                      {/* CONTACT COLUMN */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">{user.email}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{user.municipality || 'No location set'}</div>
                      </td>
                      
                      {/* STATUS COLUMN */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 w-max px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Active
                        </div>
                      </td>
                      
                      {/* ACTIONS COLUMN */}
                      <td className="px-6 py-4 text-right">
                        {editingUserId === user.id ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleUpdateClick(user.id)}
                              disabled={updateRoleMutation.isPending}
                              className="bg-brand-50 text-brand-700 hover:bg-brand-100 text-xs font-bold rounded-lg px-3 py-1.5 transition-colors disabled:opacity-50"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingUserId(null)}
                              className="bg-gray-100 text-gray-600 hover:bg-gray-200 text-xs font-bold rounded-lg px-3 py-1.5 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => startEditing(user)}
                              className="text-gray-500 hover:text-brand-600 hover:bg-brand-50 p-2 rounded-lg transition-colors flex items-center justify-center group"
                              title="Edit Role"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toast.error("Account suspension coming soon")}
                              className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center justify-center group"
                              title="Suspend User"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default withRoleProtection(ManageUsers, ["admin"]);
