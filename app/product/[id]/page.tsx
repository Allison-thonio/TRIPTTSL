"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { SearchBar } from "@/components/search-bar"
import Link from "next/link"
import { Heart, Share2, Truck, Shield, Leaf } from "lucide-react"

// Mock product data - in a real app, this would come from an API
const getProduct = (id: string) => {
  const products = {
    "1": {
      id: 1,
      name: "Essential Cotton Tee",
      price: 32,
      originalPrice: null,
      category: "women",
      colors: [
        { name: "White", value: "white", hex: "#ffffff" },
        { name: "Black", value: "black", hex: "#000000" },
        { name: "Gray", value: "gray", hex: "#6b7280" },
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      images: [
        "/placeholder.svg?height=600&width=500&text=Cotton+Tee+Front",
        "/placeholder.svg?height=600&width=500&text=Cotton+Tee+Back",
        "/placeholder.svg?height=600&width=500&text=Cotton+Tee+Detail",
        "/placeholder.svg?height=600&width=500&text=Cotton+Tee+Lifestyle",
      ],
      description:
        "Our Essential Cotton Tee is crafted from 100% organic cotton for ultimate comfort and breathability. This versatile piece features a relaxed fit and classic crew neckline, making it perfect for layering or wearing on its own.",
      details: {
        material: "100% Organic Cotton",
        fit: "Relaxed fit",
        care: "Machine wash cold, tumble dry low",
        origin: "Made in Portugal",
      },
      sustainability: [
        "Made with 100% organic cotton",
        "GOTS certified production",
        "Carbon-neutral shipping",
        "Plastic-free packaging",
      ],
      isNew: true,
      isSale: false,
      inStock: true,
    },
    "2": {
      id: 2,
      name: "Organic Denim Jacket",
      price: 128,
      originalPrice: null,
      category: "women",
      colors: [
        { name: "Classic Blue", value: "blue", hex: "#3b82f6" },
        { name: "Black", value: "black", hex: "#000000" },
      ],
      sizes: ["XS", "S", "M", "L"],
      images: [
        "/placeholder.svg?height=600&width=500&text=Denim+Jacket+Front",
        "/placeholder.svg?height=600&width=500&text=Denim+Jacket+Back",
        "/placeholder.svg?height=600&width=500&text=Denim+Jacket+Detail",
      ],
      description:
        "A timeless denim jacket crafted from organic cotton denim. Features classic styling with modern sustainability practices.",
      details: {
        material: "100% Organic Cotton Denim",
        fit: "Regular fit",
        care: "Machine wash cold, hang dry",
        origin: "Made in Turkey",
      },
      sustainability: [
        "Organic cotton denim",
        "Water-saving production",
        "Ethical manufacturing",
        "Recyclable buttons",
      ],
      isNew: false,
      isSale: false,
      inStock: true,
    },
  }

  return products[id as keyof typeof products] || products["1"]
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    // Add to cart logic would go here
    alert(`Added ${quantity} ${product.name} (${selectedColor.name}, ${selectedSize}) to cart`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
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
              <Link href="/cart" className="text-foreground hover:text-primary transition-colors">
                Cart (0)
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-300"
              />
              {product.isNew && <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">New</Badge>}
              {product.isSale && (
                <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">Sale</Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={isWishlisted ? "text-red-500" : "text-muted-foreground"}
                  >
                    <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-3">
                Color: <span className="font-normal">{selectedColor.name}</span>
              </h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-colors ${
                      selectedColor.value === color.value ? "border-primary" : "border-border"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-3">Size</h3>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border rounded-md text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <Link href="/size-guide" className="text-sm text-primary hover:underline mt-2 inline-block">
                Size Guide
              </Link>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 border border-border rounded-md flex items-center justify-center hover:bg-muted transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 border border-border rounded-md flex items-center justify-center hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-4 h-4 text-muted-foreground" />
                <span>Free shipping on orders over $75</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span>30-day returns & exchanges</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Leaf className="w-4 h-4 text-muted-foreground" />
                <span>Sustainably made</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              <TabsTrigger value="care">Care & Fit</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4">Product Details</h3>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Material:</dt>
                          <dd>{product.details.material}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Fit:</dt>
                          <dd>{product.details.fit}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Origin:</dt>
                          <dd>{product.details.origin}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Features</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Soft, breathable organic cotton</li>
                        <li>• Pre-shrunk for consistent fit</li>
                        <li>• Reinforced seams for durability</li>
                        <li>• Classic crew neckline</li>
                        <li>• Machine washable</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sustainability" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Our Commitment to Sustainability</h3>
                  <div className="space-y-4">
                    {product.sustainability.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Leaf className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-6" />
                  <div className="text-sm text-muted-foreground">
                    <p>
                      We believe in transparency throughout our supply chain. This product is made in facilities that
                      meet our strict standards for worker welfare, environmental impact, and quality craftsmanship.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="care" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4">Care Instructions</h3>
                      <div className="space-y-2 text-sm">
                        <p>• {product.details.care}</p>
                        <p>• Do not bleach</p>
                        <p>• Iron on low heat if needed</p>
                        <p>• Do not dry clean</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Fit Guide</h3>
                      <div className="space-y-2 text-sm">
                        <p>• {product.details.fit}</p>
                        <p>• Model is 5'8" wearing size S</p>
                        <p>• Length: 25" (size M)</p>
                        <p>• Chest: 38" (size M)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
