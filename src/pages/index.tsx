import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link href="/dashboard">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
}
