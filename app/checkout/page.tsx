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
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowLeft, ArrowRight, Lock, CreditCard, Truck, Shield, MapPin, Phone, User, Check } from "lucide-react"

// Mock cart data - in real app this would come from cart state/localStorage
const cartItems = [
  {
    id: 1,
    name: "Essential Cotton Tee",
    price: 32,
    color: "White",
    size: "M",
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80&text=Cotton+Tee",
  },
  {
    id: 2,
    name: "Organic Denim Jacket",
    price: 128,
    color: "Classic Blue",
    size: "S",
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80&text=Denim+Jacket",
  },
]

const steps = [
  { id: 1, name: "Delivery", icon: MapPin },
  { id: 2, name: "Payment", icon: CreditCard },
  { id: 3, name: "Review", icon: Check },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [customerInfo, setCustomerInfo] = useState<any>(null)
  const [formData, setFormData] = useState({
    // Delivery Information
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    deliveryInstructions: "",
    deliveryMethod: "standard",

    // Payment Information
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",

    // Mobile Money (for African markets)
    mobileMoneyProvider: "",
    mobileMoneyNumber: "",

    // Bank Transfer
    bankName: "",
    accountNumber: "",

    saveInfo: false,
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Load customer info if logged in
    const customerAuth = localStorage.getItem("customerAuth")
    if (customerAuth) {
      const customer = JSON.parse(customerAuth)
      setCustomerInfo(customer)
      setFormData((prev) => ({
        ...prev,
        firstName: customer.name?.split(" ")[0] || "",
        lastName: customer.name?.split(" ").slice(1).join(" ") || "",
        email: customer.email || "",
        phone: customer.phone || "",
      }))
    }
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = formData.deliveryMethod === "express" ? 15 : subtotal > 75 ? 0 : 8
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required"
      if (!formData.lastName) newErrors.lastName = "Last name is required"
      if (!formData.phone) newErrors.phone = "Phone number is required"
      if (!formData.email) newErrors.email = "Email is required"
      if (!formData.address) newErrors.address = "Address is required"
      if (!formData.city) newErrors.city = "City is required"
      if (!formData.state) newErrors.state = "State is required"
    }

    if (step === 2) {
      if (formData.paymentMethod === "card") {
        if (!formData.cardNumber) newErrors.cardNumber = "Card number is required"
        if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required"
        if (!formData.cvv) newErrors.cvv = "CVV is required"
        if (!formData.nameOnCard) newErrors.nameOnCard = "Name on card is required"
      } else if (formData.paymentMethod === "mobile_money") {
        if (!formData.mobileMoneyProvider) newErrors.mobileMoneyProvider = "Provider is required"
        if (!formData.mobileMoneyNumber) newErrors.mobileMoneyNumber = "Mobile number is required"
      } else if (formData.paymentMethod === "bank_transfer") {
        if (!formData.bankName) newErrors.bankName = "Bank name is required"
        if (!formData.accountNumber) newErrors.accountNumber = "Account number is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(2)) return

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Save order to localStorage (in real app, this would be API call)
      const order = {
        id: Date.now(),
        items: cartItems,
        customer: formData,
        total: total,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      }

      const orders = JSON.parse(localStorage.getItem("customerOrders") || "[]")
      orders.push(order)
      localStorage.setItem("customerOrders", JSON.stringify(orders))

      // Clear cart (in real app)
      // localStorage.removeItem("cart")

      // Redirect to success page
      router.push(`/checkout/success?orderId=${order.id}`)
    } catch (error) {
      alert("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step.id
                ? "bg-primary border-primary text-primary-foreground"
                : "border-muted-foreground text-muted-foreground"
            }`}
          >
            {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
          </div>
          <span
            className={`ml-2 text-sm font-medium ${currentStep >= step.id ? "text-primary" : "text-muted-foreground"}`}
          >
            {step.name}
          </span>
          {index < steps.length - 1 && (
            <div className={`w-12 h-0.5 mx-4 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  )

  const renderDeliveryStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+234 xxx xxx xxxx"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              placeholder="Enter your full address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lagos">Lagos</SelectItem>
                  <SelectItem value="abuja">Abuja</SelectItem>
                  <SelectItem value="kano">Kano</SelectItem>
                  <SelectItem value="rivers">Rivers</SelectItem>
                  <SelectItem value="oyo">Oyo</SelectItem>
                </SelectContent>
              </Select>
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
            <div>
              <Label htmlFor="zipCode">Postal Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="deliveryInstructions">Delivery Instructions (Optional)</Label>
            <Input
              id="deliveryInstructions"
              placeholder="e.g., Leave at gate, Call on arrival"
              value={formData.deliveryInstructions}
              onChange={(e) => handleInputChange("deliveryInstructions", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Delivery Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.deliveryMethod}
            onValueChange={(value) => handleInputChange("deliveryMethod", value)}
          >
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="standard" id="standard" />
              <div className="flex-1">
                <Label htmlFor="standard" className="font-medium">
                  Standard Delivery
                </Label>
                <p className="text-sm text-muted-foreground">3-5 business days • {subtotal > 75 ? "Free" : "$8"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="express" id="express" />
              <div className="flex-1">
                <Label htmlFor="express" className="font-medium">
                  Express Delivery
                </Label>
                <p className="text-sm text-muted-foreground">1-2 business days • $15</p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={(value) => handleInputChange("paymentMethod", value)}
          >
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="card" id="card" />
              <div className="flex-1">
                <Label htmlFor="card" className="font-medium">
                  Credit/Debit Card
                </Label>
                <p className="text-sm text-muted-foreground">Visa, Mastercard, Verve</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="mobile_money" id="mobile_money" />
              <div className="flex-1">
                <Label htmlFor="mobile_money" className="font-medium">
                  Mobile Money
                </Label>
                <p className="text-sm text-muted-foreground">MTN, Airtel, Glo, 9mobile</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="bank_transfer" id="bank_transfer" />
              <div className="flex-1">
                <Label htmlFor="bank_transfer" className="font-medium">
                  Bank Transfer
                </Label>
                <p className="text-sm text-muted-foreground">Direct bank transfer</p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {formData.paymentMethod === "card" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Card Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number *</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                className={errors.cardNumber ? "border-red-500" : ""}
              />
              {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  className={errors.expiryDate ? "border-red-500" : ""}
                />
                {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
              </div>
              <div>
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  className={errors.cvv ? "border-red-500" : ""}
                />
                {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="nameOnCard">Name on Card *</Label>
              <Input
                id="nameOnCard"
                value={formData.nameOnCard}
                onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                className={errors.nameOnCard ? "border-red-500" : ""}
              />
              {errors.nameOnCard && <p className="text-red-500 text-xs mt-1">{errors.nameOnCard}</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {formData.paymentMethod === "mobile_money" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Mobile Money Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="mobileMoneyProvider">Provider *</Label>
              <Select
                value={formData.mobileMoneyProvider}
                onValueChange={(value) => handleInputChange("mobileMoneyProvider", value)}
              >
                <SelectTrigger className={errors.mobileMoneyProvider ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                  <SelectItem value="airtel">Airtel Money</SelectItem>
                  <SelectItem value="glo">Glo Mobile Money</SelectItem>
                  <SelectItem value="9mobile">9mobile Money</SelectItem>
                </SelectContent>
              </Select>
              {errors.mobileMoneyProvider && <p className="text-red-500 text-xs mt-1">{errors.mobileMoneyProvider}</p>}
            </div>

            <div>
              <Label htmlFor="mobileMoneyNumber">Mobile Number *</Label>
              <Input
                id="mobileMoneyNumber"
                placeholder="+234 xxx xxx xxxx"
                value={formData.mobileMoneyNumber}
                onChange={(e) => handleInputChange("mobileMoneyNumber", e.target.value)}
                className={errors.mobileMoneyNumber ? "border-red-500" : ""}
              />
              {errors.mobileMoneyNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileMoneyNumber}</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {formData.paymentMethod === "bank_transfer" && (
        <Card>
          <CardHeader>
            <CardTitle>Bank Transfer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bankName">Bank Name *</Label>
              <Select value={formData.bankName} onValueChange={(value) => handleInputChange("bankName", value)}>
                <SelectTrigger className={errors.bankName ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gtbank">GTBank</SelectItem>
                  <SelectItem value="firstbank">First Bank</SelectItem>
                  <SelectItem value="zenith">Zenith Bank</SelectItem>
                  <SelectItem value="uba">UBA</SelectItem>
                  <SelectItem value="access">Access Bank</SelectItem>
                </SelectContent>
              </Select>
              {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
            </div>

            <div>
              <Label htmlFor="accountNumber">Account Number *</Label>
              <Input
                id="accountNumber"
                placeholder="1234567890"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                className={errors.accountNumber ? "border-red-500" : ""}
              />
              {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderReviewStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Delivery Information</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                {formData.firstName} {formData.lastName}
              </p>
              <p>{formData.phone}</p>
              <p>{formData.email}</p>
              <p>{formData.address}</p>
              <p>
                {formData.city}, {formData.state} {formData.zipCode}
              </p>
              <Badge variant="outline" className="mt-2">
                {formData.deliveryMethod === "express" ? "Express Delivery" : "Standard Delivery"}
              </Badge>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Payment Method</h4>
            <div className="text-sm text-muted-foreground">
              {formData.paymentMethod === "card" && "Credit/Debit Card"}
              {formData.paymentMethod === "mobile_money" && `Mobile Money (${formData.mobileMoneyProvider})`}
              {formData.paymentMethod === "bank_transfer" && `Bank Transfer (${formData.bankName})`}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Order Items</h4>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.color} • Size {item.size} • Qty {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <CustomerAuthGuard redirectTo="/auth/login?redirect=/checkout">
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
          {/* Back to Cart */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="text-muted-foreground hover:text-primary">
              <Link href="/cart">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
              </Link>
            </Button>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 1 && renderDeliveryStep()}
              {currentStep === 2 && renderPaymentStep()}
              {currentStep === 3 && renderReviewStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < 3 ? (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isProcessing} size="lg">
                    {isProcessing ? "Processing..." : `Place Order - $${total.toFixed(2)}`}
                  </Button>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.color}  Size {item.size}  Qty {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
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

                  {/* Security Features */}
                  <div className="space-y-2 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield className="w-3 h-3" />
                      <span>SSL encrypted checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Truck className="w-3 h-3" />
                      <span>Free returns within 30 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </CustomerAuthGuard>
  )
}
