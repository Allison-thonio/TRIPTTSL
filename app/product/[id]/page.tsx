"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Header from "@/components/header"
import { Search, Filter, Grid, List, Heart } from "lucide-react"

// Mock search results data
const mockProducts = [
  {
    id: 1,
    name: "Essential Cotton Tee",
    price: 32,
    originalPrice: null,
    category: "women",
    image: "/placeholder.svg?height=400&width=300&text=Cotton+Tee",
    description: "Our Essential Cotton Tee is crafted from 100% organic cotton.",
    isNew: true,
    isSale: false,
    inStock: true,
  },
  {
    id: 2,
    name: "Organic Denim Jacket",
    price: 128,
    originalPrice: null,
    category: "women",
    image: "/placeholder.svg?height=400&width=300&text=Denim+Jacket",
    description: "A timeless denim jacket crafted from organic cotton denim.",
    isNew: false,
    isSale: false,
    inStock: true,
  },
  {
    id: 3,
    name: "Linen Blend Shirt",
    price: 68,
    originalPrice: 85,
    category: "men",
    image: "/placeholder.svg?height=400&width=300&text=Linen+Shirt",
    description: "Lightweight linen blend shirt for warm weather.",
    isNew: false,
    isSale: true,
    inStock: true,
  },
  {
    id: 4,
    name: "Wool Blend Sweater",
    price: 98,
    originalPrice: null,
    category: "men",
    image: "/placeholder.svg?height=400&width=300&text=Wool+Sweater",
    description: "Warm and comfortable wool blend sweater.",
    isNew: true,
    isSale: false,
    inStock: false,
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [wishlistedItems, setWishlistedItems] = useState<number[]>([])

  // Filter products based on search and filters
  useEffect(() => {
    let results = [...products]

    // Apply search filter
    if (searchQuery) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      results = results.filter(product => product.category === selectedCategory)
    }

    // Apply price range filter
    if (priceRange !== "all") {
      switch (priceRange) {
        case "under-50":
          results = results.filter(product => product.price < 50)
          break
        case "50-100":
          results = results.filter(product => product.price >= 50 && product.price <= 100)
          break
        case "over-100":
          results = results.filter(product => product.price > 100)
          break
      }
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        results.sort((a, b) => b.price - a.price)
        break
      case "newest":
        results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "name":
        results.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    setFilteredProducts(results)
  }, [searchQuery, selectedCategory, priceRange, sortBy, products])

  const toggleWishlist = (productId: number) => {
    setWishlistedItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setPriceRange("all")
    setSortBy("relevance")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Search Products</h1>
          
          {/* Search Input */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary">
                Clear All
              </Button>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="font-medium mb-3">Category</h4>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="men">Men</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="font-medium mb-3">Price Range</h4>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-50">Under $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="over-100">Over $100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Options */}
            <div>
              <h4 className="font-medium mb-3">Sort By</h4>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle */}
            <div>
              <h4 className="font-medium mb-3">View</h4>
              <div className="flex border border-border rounded-md p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="flex-1"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="flex-1"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }>
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group overflow-hidden">
                    <CardContent className="p-0">
                      <div className={viewMode === "grid" ? "" : "flex"}>
                        {/* Product Image */}
                        <div className={
                          viewMode === "grid" 
                            ? "relative aspect-[3/4] overflow-hidden"
                            : "relative w-48 aspect-[3/4] overflow-hidden flex-shrink-0"
                        }>
                          <Link href={`/product/${product.id}`}>
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </Link>
                          
                          {/* Badges */}
                          <div className="absolute top-2 left-2 space-y-1">
                            {product.isNew && (
                              <Badge className="bg-accent text-accent-foreground">New</Badge>
                            )}
                            {product.isSale && (
                              <Badge className="bg-red-500 text-white">Sale</Badge>
                            )}
                            {!product.inStock && (
                              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                                Out of Stock
                              </Badge>
                            )}
                          </div>

                          {/* Wishlist Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                            onClick={() => toggleWishlist(product.id)}
                          >
                            <Heart
                              className="w-4 h-4"
                              fill={wishlistedItems.includes(product.id) ? "currentColor" : "none"}
                            />
                          </Button>
                        </div>

                        {/* Product Info */}
                        <div className={viewMode === "grid" ? "p-4" : "p-6 flex-1"}>
                          <div className="flex justify-between items-start mb-2">
                            <Link href={`/product/${product.id}`}>
                              <h3 className="font-medium hover:text-primary transition-colors line-clamp-2">
                                {product.name}
                              </h3>
                            </Link>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {product.description}
                          </p>

                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs capitalize">
                              {product.category}
                            </Badge>
                            <Button variant="swanky" size="sm" disabled={!product.inStock} className="swanky-focus">
                              {product.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}