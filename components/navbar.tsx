
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { SearchBar } from './search-bar'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div>
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-light tracking-wide text-stone-900 flex flex-col md:flex-row items-start md:items-baseline gap-0 md:gap-3">
                <span>TTTSL</span>
                <span className="swanky-brand text-sm leading-none block md:inline mt-0.5">swanky by ellery</span>
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
                          : 'text-stone-600 swanky-link transition-colors text-sm tracking-wide'
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
              {/* Account icon on small screens, text on md+ */}
              <Link href="/auth/login" className="md:hidden swanky-focus">
                <svg className="w-5 h-5 text-stone-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><path d="M4 21v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="7" r="4"/></svg>
              </Link>
              <Link href="/auth/login" className="hidden md:inline text-stone-600 swanky-link swanky-focus text-sm tracking-wide">
                ACCOUNT
              </Link>

              {/* Cart icon on small screens, text on md+ */}
              <Link href="/cart" className="md:hidden swanky-focus">
                <svg className="w-5 h-5 text-stone-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              </Link>
              <Link href="/cart" className="hidden md:inline text-stone-600 swanky-link swanky-focus text-sm tracking-wide">
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
