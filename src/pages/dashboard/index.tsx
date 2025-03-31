import Card from '@/components/Card';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Header />
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Weather" content="Weather Data Coming Soon" />
          <Card title="Cryptocurrency" content="Crypto Data Coming Soon" />
          <Card title="News" content="News Data Coming Soon" />
        </div>
      </main>
    </div>
  );
}
