"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Check, Package, Truck, Mail, ArrowRight } from "lucide-react"

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem("customerOrders") || "[]")
      const foundOrder = orders.find((o: any) => o.id.toString() === orderId)
      setOrder(foundOrder)
    }
  }, [orderId])

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-foreground">
              TTTSL
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </p>

          {/* Order Details Card */}
          <Card className="text-left mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order #{order.id}</span>
                <Badge variant="secondary">Confirmed</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Items */}
              <div>
                <h3 className="font-medium mb-3">Items Ordered</h3>
                <div className="space-y-3">
                  {order.items.map((item: any) => (
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

              <Separator />

              {/* Delivery Information */}
              <div>
                <h3 className="font-medium mb-3">Delivery Information</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p>{order.customer.phone}</p>
                  <p>{order.customer.address}</p>
                  <p>
                    {order.customer.city}, {order.customer.state}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Order Total */}
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Paid</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="text-left mb-8">
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Order Confirmation</p>
                    <p className="text-xs text-muted-foreground">
                      You'll receive an email confirmation shortly with your order details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Package className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Processing</p>
                    <p className="text-xs text-muted-foreground">
                      Your order is being prepared for shipment. This usually takes 1-2 business days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Truck className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Shipping</p>
                    <p className="text-xs text-muted-foreground">
                      Once shipped, you'll receive tracking information to monitor your delivery.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button asChild>
              <Link href="/account/orders">
                View Order Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  )
}
