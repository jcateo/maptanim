import React, { useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { trpc } from '../lib/trpc';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { cn } from '../lib/utils';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { data: notifications, refetch } = trpc.notifications.list.useQuery();
  const markRead = trpc.notifications.markRead.useMutation({
    onSuccess: () => refetch(),
  });
  const markAllRead = trpc.notifications.markAllRead.useMutation({
    onSuccess: () => refetch(),
  });

  const unreadCount = notifications?.filter(n => !n.isRead).length || 0;

  const handleMarkAllRead = () => {
    markAllRead.mutate();
  };

  const handleNotificationClick = (id: number) => {
    markRead.mutate({ id });
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="w-[40px] h-[40px] rounded-full bg-gray-100 hover:bg-gray-200 relative flex items-center justify-center transition-colors border-none outline-none">
          <Bell className="w-[20px] h-[20px] text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-red-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 bg-white rounded-xl shadow-modal border border-gray-200 p-0 overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-white">
          <span className="text-sm font-semibold text-gray-800">Notifications</span>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-xs text-brand-600 cursor-pointer hover:text-brand-700 outline-none border-none bg-transparent"
            >
              Mark all read
            </button>
          )}
        </div>

        <DropdownMenuGroup className="max-h-96 overflow-y-auto bg-white">
          {!notifications || notifications.length === 0 ? (
            <div className="py-10 text-center">
              <BellOff className="w-[32px] h-[32px] text-gray-300 mx-auto" />
              <div className="text-sm text-gray-400 mt-3">No new notifications</div>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                className={cn(
                  "px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex flex-col gap-0.5 relative outline-none focus:bg-gray-50",
                  !notification.isRead ? "bg-brand-50 border-l-3 border-l-brand-500" : "bg-white"
                )}
              >
                <span className="text-sm text-gray-700 line-clamp-2 leading-snug w-full">
                  {notification.body || notification.title}
                </span>
                <span className="text-xs text-gray-400 mt-0.5">
                  {notification.createdAt ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true }) : 'Just now'}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
