// components/layouts/DashboardLayout.tsx
import { ReactNode } from 'react';
import GridBackgroundDemo from '../../components/ui/grid-background-demo';
import { Sidebar } from '../../components/ui/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative flex min-h-screen bg-gray-900 text-white">
      <Sidebar>
        {/* Add appropriate content or leave empty if no children are needed */}
        <div>Sidebar Content</div>
      </Sidebar>
      <div className="flex-1 p-8">
        <GridBackgroundDemo />
        {children}
      </div>
    </div>
  );
}
