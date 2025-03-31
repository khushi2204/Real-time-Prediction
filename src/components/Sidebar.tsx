import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <ul>
        <li>
          <Link href="/dashboard" className="hover:text-gray-400">Dashboard</Link>
        </li>
      </ul>
    </aside>
  );
}
