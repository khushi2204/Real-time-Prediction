"use client";
import { Cloud, LayoutDashboard, LifeBuoy, Newspaper, Settings, Wallet } from "lucide-react";
import Link from "next/link";
import { Toaster } from "sonner"; // Toast notifications
import { StatsChart } from "../components/stats-chart";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { VaultTable } from "../components/vault-table";
import { useWebSocket } from "../hooks/useWebSocket"; // Import WebSocket Hook

export default function Page() {
  const messages = useWebSocket(); // Use WebSocket Hook

  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster position="top-right" richColors />
      <div className="grid lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="border-r bg-black ">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <Wallet className="h-6 w-6" />
            <span className="font-bold">CryptoWeather Nexus</span>
          </div>
          <div className="px-4 py-4">
            <Input placeholder="Search" className="bg-black" />
          </div>
          <nav className="space-y-2 px-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/weather">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Cloud className="h-4 w-4" />
                Weather
              </Button>
            </Link>
            <Link href="/crypto">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Wallet className="h-4 w-4" />
                Crypto
              </Button>
            </Link>
            <Link href="/news">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Newspaper className="h-4 w-4" />
                News
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LifeBuoy className="h-4 w-4" />
              Support
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="p-6">
          <Card className="mt-6 p-6 bg-black">
            <div className="mb-4 flex items-center justify-between text-white">
              <h2 className="text-lg font-semibold">General Statistics</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">Today</Button>
                <Button size="sm" variant="ghost">Last week</Button>
                <Button size="sm" variant="ghost">Last month</Button>
                <Button size="sm" variant="ghost">Last 6 months</Button>
                <Button size="sm" variant="ghost">Year</Button>
              </div>
            </div>
            <StatsChart />
          </Card>

          {/* Vault Table */}
          <div className="mt-6">
            <VaultTable />
          </div>

          {/* WebSocket Message Display */}
          <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">WebSocket Messages</h3>
            <div className="h-32 overflow-auto border border-gray-600 p-2">
              {messages.length > 0 ? (
                messages.map((msg, index) => <p key={index}>{msg}</p>)
              ) : (
                <p className="text-gray-400">No messages received yet...</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
