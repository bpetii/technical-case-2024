// components/Navbar.tsx
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4 text-white">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar