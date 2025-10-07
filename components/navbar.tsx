
import { usePathname } from 'next/navigation'
import Link from 'next/link'
// import SearchBar from './SearchBar' // Adjust the path if SearchBar is in a different folder
// If SearchBar is in 'components/SearchBar.tsx', use:
// Update the import path below to the correct location of SearchBar, for example:
import { SearchBar } from '../components/search-bar'

const Navbar = () => {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  // For Next.js 13+, usePathname is preferred, but fallback for SSR
  // const pathname = usePathname ? usePathname() : (typeof window !== 'undefined' ? window.location.pathname : '')

  const navLinks = [
    { href: '/shop', label: 'SHOP' },
    { href: '/women', label: 'WOMEN' },
    { href: '/men', label: 'MEN' },
    { href: '/about', label: 'ABOUT' },
  ]

  return (
    <div>
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-light tracking-wide text-stone-900">
                TTTSL
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href === '/shop' && pathname === '/')
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={
                        isActive
                          ? 'text-stone-900 font-medium border-b-2 border-stone-900 pb-1'
                          : 'text-stone-600 hover:text-stone-900 transition-colors text-sm tracking-wide'
                      }
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <SearchBar />
              <Link
                href="/auth/login"
                className="text-stone-600 hover:text-stone-900 transition-colors text-sm tracking-wide"
              >
                ACCOUNT
              </Link>
              <Link
                href="/cart"
                className="text-stone-600 hover:text-stone-900 transition-colors text-sm tracking-wide"
              >
                CART (0)
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
