import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Leaf, Users, Globe, Award, Heart, Recycle } from "lucide-react"
import SearchBar from "@/components/ui/SearchBar" // Update the path if necessary

export default function AboutPage() {
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
                <Link href="/about" className="text-primary font-medium">
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

      {/* Hero Section */}
      <section className="relative py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Timeless Style, Transparent Values</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              We believe fashion should be beautiful, ethical, and built to last. Every piece we create tells a story of
              craftsmanship, sustainability, and the people who make it possible.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-balance">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  TTTSL was born from a simple belief: fashion should be transparent, ethical, and timeless. Founded in
                  2020, we set out to create clothing that transcends seasonal trends and stands the test of time.
                </p>
                <p>
                  Our journey began when our founders, frustrated by the lack of transparency in the fashion industry,
                  decided to build something different. We partnered with ethical manufacturers, sourced sustainable
                  materials, and committed to radical transparency in everything we do.
                </p>
                <p>
                  Today, we're proud to offer clothing that not only looks good but does good – for the people who make
                  it, the planet we share, and the customers who wear it.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600&text=Brand+Story+Image"
                alt="TTTSL founders and team"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Our Values</h2>
            <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
              These principles guide everything we do, from design to production to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We use organic, recycled, and responsibly sourced materials. Our production processes minimize waste
                  and environmental impact.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Ethical Production</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We partner with certified factories that provide fair wages, safe working conditions, and respect for
                  workers' rights.
                </p>
                {/* <Header /> Uncomment this line if Header is a valid component */}
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Recycle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Circularity</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We design for longevity and offer repair services, take-back programs, and recycling initiatives to
                  extend the life of our products.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Behind the Scenes</h2>
            <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
              Take a look at the people and processes that bring our vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600&text=Design+Process"
                alt="Design process at TTTSL"
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">Design Process</h3>
                <p className="text-sm opacity-90">From sketch to sample, every detail matters</p>
              </div>
            </div>

            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600&text=Manufacturing+Partners"
                alt="Our manufacturing partners"
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">Our Partners</h3>
                <p className="text-sm opacity-90">Meet the artisans who craft our pieces</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <img
                src="/placeholder.svg?height=300&width=400&text=Sustainable+Materials"
                alt="Sustainable materials"
                className="w-full h-60 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg" />
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-semibold mb-1">Sustainable Materials</h4>
                <p className="text-xs opacity-90">Organic cotton, recycled fibers</p>
              </div>
            </div>

            <div className="relative">
              <img
                src="/placeholder.svg?height=300&width=400&text=Quality+Control"
                alt="Quality control process"
                className="w-full h-60 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg" />
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-semibold mb-1">Quality Control</h4>
                <p className="text-xs opacity-90">Every piece inspected by hand</p>
              </div>
            </div>

            <div className="relative">
              <img
                src="/placeholder.svg?height=300&width=400&text=Packaging"
                alt="Sustainable packaging"
                className="w-full h-60 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg" />
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-semibold mb-1">Eco Packaging</h4>
                <p className="text-xs opacity-90">Plastic-free, recyclable materials</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Our Impact</h2>
            <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
              Numbers that matter – tracking our progress toward a more sustainable future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
              <p className="text-sm text-muted-foreground">Pounds of organic cotton used</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <p className="text-sm text-muted-foreground">Waste reduction in production</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1,200+</div>
              <p className="text-sm text-muted-foreground">Workers supported globally</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">Carbon</div>
              <p className="text-sm text-muted-foreground">Neutral shipping since 2021</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-balance">Join Our Mission</h2>
            <p className="text-muted-foreground mb-8 text-pretty leading-relaxed">
              Every purchase supports ethical manufacturing, sustainable practices, and timeless design. Together, we
              can change the fashion industry for the better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/shop">Shop Collection</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/sustainability">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TTTSL</h3>
              <p className="text-sm opacity-80 mb-4">
                Timeless style with transparent values. Fashion that makes a difference.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Instagram
                </a>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Twitter
                </a>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Facebook
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/women" className="hover:opacity-100 transition-opacity">
                    Women
                  </Link>
                </li>
                <li>
                  <Link href="/men" className="hover:opacity-100 transition-opacity">
                    Men
                  </Link>
                </li>
                <li>
                  <Link href="/accessories" className="hover:opacity-100 transition-opacity">
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link href="/sale" className="hover:opacity-100 transition-opacity">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/about" className="hover:opacity-100 transition-opacity">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/sustainability" className="hover:opacity-100 transition-opacity">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:opacity-100 transition-opacity">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:opacity-100 transition-opacity">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/help" className="hover:opacity-100 transition-opacity">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:opacity-100 transition-opacity">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:opacity-100 transition-opacity">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/size-guide" className="hover:opacity-100 transition-opacity">
                    Size Guide
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-60">
            <p>&copy; 2024 TTTSL. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
