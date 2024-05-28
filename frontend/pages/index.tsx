import Link from "next/link";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-8`}
    >
      <div className="max-w-5xl w-full items-center justify-center">
        <h1 className="text-2xl font-bold text-center">Home</h1>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </main>
  )
}
