"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { CustomerAuthGuard } from "@/components/customer-auth-guard"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  CreditCard,
  Truck,
  Shield,
  MapPin,
  Phone,
  User,
  Check,
} from "lucide-react"
import Header from "@/components/header"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Mock cart data - small, valid example
const cartItems = [
  { id: 1, name: "Essential Cotton Tee", price: 32, color: "White", size: "M", quantity: 2, image: "/placeholder.svg" },
  { id: 2, name: "Organic Denim Jacket", price: 128, color: "Classic Blue", size: "S", quantity: 1, image: "/placeholder.svg" },
]

const steps = [
  { id: 1, name: "Delivery", icon: MapPin },
  { id: 2, name: "Payment", icon: CreditCard },
  { id: 3, name: "Review", icon: Check },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    deliveryMethod: "standard",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    mobileMoneyProvider: "",
    mobileMoneyNumber: "",
    bankName: "",
    accountNumber: "",
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const customerAuth = localStorage.getItem("customerAuth")
    if (customerAuth) {
      try {
        const customer = JSON.parse(customerAuth)
        setFormData((prev: any) => ({ ...prev, email: customer.email || "", phone: customer.phone || "" }))
      } catch {}
    }
  }, [])

  const subtotal = cartItems.reduce((s, it) => s + it.price * it.quantity, 0)
  const deliveryFee = formData.deliveryMethod === "express" ? 15 : subtotal > 75 ? 0 : 8
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }))
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name required"
      if (!formData.lastName) newErrors.lastName = "Last name required"
      if (!formData.address) newErrors.address = "Address required"
    }
    if (step === 2 && formData.paymentMethod === "card") {
      if (!formData.cardNumber) newErrors.cardNumber = "Card number required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) setCurrentStep((s) => Math.min(3, s + 1))
  }
  const handlePrevious = () => setCurrentStep((s) => Math.max(1, s - 1))

  const handleSubmit = async () => {
    if (!validateStep(2)) return
    setIsProcessing(true)
    try {
      const order = { id: Date.now(), items: cartItems, customer: formData, total }
      const orders = JSON.parse(localStorage.getItem("customerOrders") || "[]")
      orders.push(order)
      localStorage.setItem("customerOrders", JSON.stringify(orders))
      router.push(`/checkout/success?orderId=${order.id}`)
    } catch (e) {
      console.error(e)
    } finally {
      setIsProcessing(false)
    }
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step.id ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground text-muted-foreground"}`}>
            {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
          </div>
          <span className={`ml-2 text-sm font-medium ${currentStep >= step.id ? "text-primary" : "text-muted-foreground"}`}>{step.name}</span>
          {idx < steps.length - 1 && <div className={`w-12 h-0.5 mx-4 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />}
        </div>
      ))}
    </div>
  )

  const renderDeliveryStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" />Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={formData.paymentMethod} onValueChange={(v) => handleInputChange("paymentMethod", v)}>
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="card" id="card" />
              <div className="flex-1">
                <Label htmlFor="card" className="font-medium">Credit/Debit Card</Label>
                <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
              </div>
            </div>
          </RadioGroup>

          {formData.paymentMethod === "card" && (
            <div className="mt-4">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" value={formData.cardNumber} onChange={(e) => handleInputChange("cardNumber", e.target.value)} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderReviewStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <CustomerAuthGuard redirectTo="/auth/login?redirect=/checkout">
      <div className="min-h-screen bg-background">
        <Header />
        <div className="border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              <div />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
            <div className="mb-8">
              <Button variant="ghost" asChild className="text-muted-foreground hover:text-primary">
                <Link href="/cart">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cart
                </Link>
              </Button>
            </div>

            {renderStepIndicator()}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {currentStep === 1 && renderDeliveryStep()}
                {currentStep === 2 && renderPaymentStep()}
                {currentStep === 3 && renderReviewStep()}

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                  </Button>
                  {currentStep < 3 ? (
                    <Button onClick={handleNext}>
                      Next <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={isProcessing} size="lg">
                      {isProcessing ? "Processing..." : `Place Order - $${total.toFixed(2)}`}
                    </Button>
                  )}
                </div>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.color} • Size {item.size} • Qty {item.quantity}</p>
                          </div>
                          <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delivery</span>
                        <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </CustomerAuthGuard>
  )
}
