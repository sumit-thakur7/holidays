import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-background to-secondary py-20 md:py-32">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://plus.unsplash.com/premium_photo-1686157758105-b100bd44945c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with actual hero image
          alt="Bir Billing Paragliding"
          layout="fill"
          objectFit="cover"
          priority
          data-ai-hint="paragliding mountains aerial"
        />
         <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary mb-6 shadow-sm">
          Discover Adventure in Bir Billing
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10">
          Experience thrilling paragliding, serene trekking, cozy stays, and unforgettable moments in the heart of the Himalayas.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Link href="/packages">
              Explore Packages <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-primary text-primary hover:bg-primary/10">
            <Link href="/attractions">
              Nearby Attractions
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
