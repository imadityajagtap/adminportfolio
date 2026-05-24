import { ReactNode } from 'react';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

export const dynamic = 'force-dynamic';

interface AdminLayoutProps {
  children: ReactNode;
}

/**
 * Admin Layout
 * Wraps admin pages with Sidebar (except /admin/login)
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
