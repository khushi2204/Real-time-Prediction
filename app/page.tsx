import { Cloud, LayoutDashboard, LifeBuoy, Newspaper, Settings, Wallet } from "lucide-react"
import Link from "next/link"
import { StatsChart } from "../components/stats-chart"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { VaultTable } from "../components/vault-table"

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid lg:grid-cols-[280px_1fr]">
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
        <main className="p-6">
          {/* <div className="mb-6 flex items-center justify-between  text-white bg-black">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Overview</h1>
              
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3 text-white bg-black">
            <MetricsCard
              title="Your Balance"
              value="$74,892"
              change={{ value: "$1,340", percentage: "-2.1%", isPositive: false }}
            />
            <MetricsCard
              title="Your Deposits"
              value="$54,892"
              change={{ value: "$1,340", percentage: "+13.2%", isPositive: true }}
            />
            <MetricsCard
              title="Accrued Yield"
              value="$20,892"
              change={{ value: "$1,340", percentage: "+1.2%", isPositive: true }}
            />
          </div> */}
          <Card className="mt-6 p-6 bg-black">
            <div className="mb-4 flex items-center justify-between text-white ">
              <h2 className="text-lg font-semibold ">General Statistics</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  Today
                </Button>
                <Button size="sm" variant="ghost">
                  Last week
                </Button>
                <Button size="sm" variant="ghost">
                  Last month
                </Button>
                <Button size="sm" variant="ghost">
                  Last 6 month
                </Button>
                <Button size="sm" variant="ghost">
                  Year
                </Button>
              </div>
            </div>
            <StatsChart />
          </Card>
          <div className="mt-6">
            <VaultTable />
          </div>
        </main>
      </div>
    </div>
  )
}

