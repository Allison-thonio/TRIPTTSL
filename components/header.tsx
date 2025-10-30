"use client"

import Link from "next/link"
import { SearchBar } from "@/components/search-bar"

export default function Header() {
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-2xl font-bold text-foreground flex items-baseline gap-3">
              <span>TTTSL</span>
              <span className="swanky-brand text-sm leading-none">swanky by ellery</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/shop" className="text-foreground swanky-link">
                Shop
              </Link>
              <Link href="/women" className="text-foreground swanky-link">
                Women
              </Link>
              <Link href="/men" className="text-foreground swanky-link">
                Men
              </Link>
              <Link href="/about" className="text-foreground swanky-link">
                About
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <SearchBar />
            <Link href="/auth/login" className="text-sm text-muted-foreground swanky-link swanky-focus">
              Account
            </Link>
            <Link href="/cart" className="text-foreground swanky-link swanky-focus">
              Cart (0)
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
