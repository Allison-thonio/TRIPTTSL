"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Header from "@/components/header"
import { Minus, Plus, X, ShoppingBag, Truck, Shield, ArrowLeft } from "lucide-react"
import { SearchBar } from "@/components/search-bar"

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Essential Cotton Tee",
    price: 32,
    color: "White",
    size: "M",
    quantity: 2,
    image: "/placeholder.svg?height=120&width=100&text=Cotton+Tee",
  },
  {
    id: 2,
    name: "Organic Denim Jacket",
    price: 128,
    color: "Classic Blue",
    size: "S",
    quantity: 1,
    image: "/placeholder.svg?height=120&width=100&text=Denim+Jacket",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const shipping = subtotal > 75 ? 0 : 8
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-foreground">
                  TTTSL
                </Link>
              </div>

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <Link href="/shop" className="text-foreground hover:text-primary transition-colors">
                    Shop
                  </Link>
                  <Link href="/women" className="text-foreground hover:text-primary transition-colors">
                    Women
                  </Link>
                  <Link href="/men" className="text-foreground hover:text-primary transition-colors">
                    Men
                  </Link>
                  <Link href="/accessories" className="text-foreground hover:text-primary transition-colors">
                    Accessories
                  </Link>
                  <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <SearchBar />
                <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Account
                </Link>
                <span className="text-foreground hover:text-primary transition-colors">Cart (0)</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Empty Cart */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Button asChild size="lg">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-foreground">
                TTTSL
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/shop" className="text-foreground hover:text-primary transition-colors">
                  Shop
                </Link>
                <Link href="/women" className="text-foreground hover:text-primary transition-colors">
                  Women
                </Link>
                <Link href="/men" className="text-foreground hover:text-primary transition-colors">
                  Men
                </Link>
                <Link href="/accessories" className="text-foreground hover:text-primary transition-colors">
                  Accessories
                </Link>
                <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <SearchBar />
              <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Account
              </Link>
              <span className="text-foreground hover:text-primary transition-colors">Cart ({cartItems.length})</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Shopping */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-primary">
            <Link href="/shop">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

            <div className="space-y-6">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-24 h-30 object-cover rounded-md"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-foreground">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.color} • Size {item.size}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">${item.price} each</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount (WELCOME10)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                          <Header />
                  <div className="flex items-center gap-3 text-sm">
                    <Truck className="w-4 h-4 text-muted-foreground" />
                    <span>Free shipping on orders over $75</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span>30-day returns & exchanges</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
