"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Header from "@/components/header"
import { Heart, Share2, Leaf } from "lucide-react"

// Mock product data - fallback when no admin product exists
const getProduct = (id: string) => {
  const products: any = {
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
      ],
      description: "Our Essential Cotton Tee is crafted from 100% organic cotton.",
      details: { material: "100% Organic Cotton", fit: "Relaxed fit", care: "Machine wash cold", origin: "Portugal" },
            sustainability: [
              "Made with 100% organic cotton",
              "GOTS certified production",
              "Carbon-neutral shipping",
            ],
            isNew: true,
            isSale: false,
            inStock: true,
          },
        }
        return products[id as keyof typeof products] || products["1"]
      }
      
      export default function ProductDetailPage({ params }: { params: { id: string } }) {
          const initial = getProduct(params.id)
          const [product, setProduct] = useState<any>(initial)
          const [selectedColor, setSelectedColor] = useState<any>(initial.colors?.[0] || { name: "Default", value: "default", hex: "#ffffff" })
          const [selectedSize, setSelectedSize] = useState("")
          const [selectedImage, setSelectedImage] = useState(0)
          const [quantity, setQuantity] = useState(1)
          const [isWishlisted, setIsWishlisted] = useState(false)

          useEffect(() => {
            try {
              const saved = JSON.parse(localStorage.getItem("adminProducts") || "[]")
              const found = saved.find((p: any) => String(p.id) === String(params.id))
              if (found) {
                if (!found.images && found.image) found.images = [found.image]
                setProduct(found)
              }
            } catch (e) {
              // ignore
            }
          }, [params.id])

          useEffect(() => {
            if (product?.colors && product.colors.length > 0) setSelectedColor(product.colors[0])
            setSelectedSize("")
            setSelectedImage(0)
          }, [product])

          const handleAddToCart = () => {
            if (!selectedSize) {
              alert("Please select a size")
              return
            }
            alert(`Added ${quantity} ${product.name} (${selectedColor.name}, ${selectedSize}) to cart`)
          }

          return (
            <div className="min-h-screen bg-background">
              <Header />

              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                  <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                  <span>/</span>
                  <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
                  <span>/</span>
                  <span className="text-foreground">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                      <img src={product.images?.[selectedImage] || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
                      {product.isNew && <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">New</Badge>}
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                      {(product.images || []).map((image: string, index: number) => (
                        <button key={index} onClick={() => setSelectedImage(index)} className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${selectedImage === index ? "border-primary" : "border-transparent"}`}>
                          <img src={image || "/placeholder.svg"} alt={`${product.name} ${index}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-foreground">${product.price}</span>
                          {product.originalPrice && <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setIsWishlisted(!isWishlisted)} className={isWishlisted ? "text-red-500" : "text-muted-foreground"}>
                            <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground"><Share2 className="w-4 h-4" /></Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Color: <span className="font-normal">{selectedColor?.name}</span></h3>
                      <div className="flex gap-2">
                        {(product.colors || []).map((color: any) => (
                          <button key={color.value} onClick={() => setSelectedColor(color)} className={`w-8 h-8 rounded-full border-2 transition-colors ${selectedColor?.value === color.value ? "border-primary" : "border-border"}`} style={{ backgroundColor: color.hex }} title={color.name} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Size</h3>
                      <div className="grid grid-cols-5 gap-2">
                        {(product.sizes || []).map((size: any) => (
                          <button key={size} onClick={() => setSelectedSize(size)} className={`py-2 px-3 border rounded-md text-sm font-medium transition-colors ${selectedSize === size ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>
                            {size}
                          </button>
                        ))}
                      </div>
                      <Link href="/size-guide" className="text-sm text-primary hover:underline mt-2 inline-block">Size Guide</Link>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Quantity</h3>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 border border-border rounded-md flex items-center justify-center hover:bg-muted transition-colors">-</button>
                        <span className="w-8 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 border border-border rounded-md flex items-center justify-center hover:bg-muted transition-colors">+</button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button onClick={handleAddToCart} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">Add to Cart - ${(product.price * quantity).toFixed(2)}</Button>
                      <Button variant="outline" className="w-full bg-transparent" size="lg">Buy Now</Button>
                    </div>
                  </div>
                </div>

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
                                  <dd>{product.details?.material}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-muted-foreground">Fit:</dt>
                                  <dd>{product.details?.fit}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-muted-foreground">Origin:</dt>
                                  <dd>{product.details?.origin}</dd>
                                </div>
                              </dl>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-4">Features</h3>
                              <ul className="space-y-2 text-sm">
                                <li>• Soft, breathable organic cotton</li>
                                <li>• Pre-shrunk for consistent fit</li>
                                <li>• Reinforced seams for durability</li>
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
                            {(product.sustainability || []).map((item: string, index: number) => (
                              <div key={index} className="flex items-start gap-3">
                                <Leaf className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                          <Separator className="my-6" />
                          <div className="text-sm text-muted-foreground">
                            <p>We believe in transparency throughout our supply chain.</p>
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
                                <p>• {product.details?.care}</p>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-4">Fit Guide</h3>
                              <div className="space-y-2 text-sm">
                                <p>• {product.details?.fit}</p>
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
            {/* Features */}
