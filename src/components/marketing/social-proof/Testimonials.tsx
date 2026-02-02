const testimonials = [
  {
    quote:
      "With escrow, I only release payment after delivery. TrustFlow removed fear from buying online.",
    name: "Buyer",
    role: "Online Trader",
  },
  {
    quote:
      "My buyers trust me more because payments are guaranteed once delivery is confirmed.",
    name: "Seller",
    role: "Electronics Merchant",
  },
  {
    quote:
      "TrustFlow gives us structured delivery jobs with verified transactions.",
    name: "Logistics Partner",
    role: "Courier Service",
  },
];

export function Testimonials() {
  return (
    <div className="mt-16 grid md:grid-cols-3 gap-8">
      {testimonials.map((item, index) => (
        <div key={index} className="rounded-xl border bg-card p-6 text-left">
          <p className="text-muted-foreground">“{item.quote}”</p>

          <div className="mt-4">
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
