"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  LineChart,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Header from "./Header";
import { siteConfig } from "@/configs/config";
import Hero from "./Hero";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      {/* ================= FEATURES ================= */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center">
            Everything you need to run consignments
          </h2>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            Built with operational clarity in mind — fewer spreadsheets, more
            control.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Truck className="h-6 w-6" />}
              title="Inventory Tracking"
              description="Track items from intake to sale with full audit history."
            />
            <FeatureCard
              icon={<LineChart className="h-6 w-6" />}
              title="Automated Payouts"
              description="Accurate commission splits and settlement reports."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Role-Based Access"
              description="Secure access for admins, staff, and consignors."
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6" />}
              title="Real-Time Insights"
              description="Sales, margins, and inventory health at a glance."
            />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section id="who" className="py-28">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">Who We Are</h2>
          <p className="mt-6 text-muted-foreground text-lg">
            We build operational software for consignment businesses that need
            accuracy, transparency, and scale. Our platform replaces
            spreadsheets with real-time systems you can trust.
          </p>
        </div>
      </section>

      <section id="services" className="py-28 bg-muted/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center">
            Our Services
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              title="Consignment Intake"
              description="Digitize item intake with full lifecycle tracking."
            />
            <ServiceCard
              title="Sales & Settlement"
              description="Automated commission splits and payout accuracy."
            />
            <ServiceCard
              title="Reporting & Insights"
              description="Real-time visibility into inventory and margins."
            />
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="container mx-auto px-6">
          <div className="rounded-3xl bg-primary text-primary-foreground px-10 py-20 text-center shadow-xl">
            <h3 className="text-3xl md:text-4xl font-bold">
              Ready to modernize your consignment workflow?
            </h3>
            <p className="mt-6 max-w-2xl mx-auto text-primary-foreground/90">
              Launch faster, reduce disputes, and scale operations with
              confidence.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" variant="secondary">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline">
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ConsignPro. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ServiceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-6">
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full rounded-2xl">
        <CardContent className="p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
          <h4 className="mt-6 font-semibold text-lg">{title}</h4>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
