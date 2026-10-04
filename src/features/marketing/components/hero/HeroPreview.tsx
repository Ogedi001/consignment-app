import { CheckCircle, CreditCard, Package, Truck } from "lucide-react";

export function HeroPreview() {
  const steps = [
    { icon: Package, label: "Order created", state: "Completed" },
    { icon: CreditCard, label: "Payment protected", state: "Current" },
    { icon: Truck, label: "Delivery confirmation", state: "Next" },
    { icon: CheckCircle, label: "Funds released", state: "Upcoming" },
  ];

  return (
    <div className="relative">
      <div className="border border-border bg-card p-6 md:p-8">
        <div className="mb-7 flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Example transaction
            </p>
            <h3 className="mt-2 text-xl font-semibold text-foreground">
              Payment protected; delivery confirmation is next
            </h3>
          </div>

          {/* <div className="border border-border px-3 py-1 text-xs font-semibold text-foreground">
            Current state
          </div> */}
        </div>

        <div className="border border-border bg-surface p-5">
          <p className="text-sm font-semibold text-foreground">
            What this means
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The payment is protected while the seller prepares shipment. Both
            parties can follow the delivery and provide evidence if needed.
          </p>
        </div>

        <div className="mt-7">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">
              Transaction flow
            </p>
            <p className="text-xs font-medium text-muted-foreground">
              State and next step
            </p>
          </div>

          <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.label}
                className="border border-border bg-background p-4 text-center"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center bg-primary/10">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>

                <span className="block text-xs font-semibold text-foreground sm:text-sm">
                  {step.label}
                </span>
                <span className="mt-2 block text-xs text-muted-foreground">
                  {step.state}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-l-2 border-primary bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
          Next responsibility: seller provides shipment information.
        </div>
      </div>
    </div>
  );
}
