import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedPackages } from "@/components/home/FeaturedPackages";
import { RecommendedAttractions } from "@/components/home/RecommendedAttractions";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedPackages />
      <RecommendedAttractions />
      <HowItWorksSection />
      {/* A section for bus ticket booking link to Redbus */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Book Your Bus Tickets</h2>
            <p className="text-lg mb-8">Plan your travel to Bir Billing seamlessly. Book your bus tickets via Redbus.</p>
            <a 
                href="https://www.redbus.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md shadow-lg text-lg font-medium transition-colors"
            >
                Go to Redbus.in
            </a>
        </div>
      </section>
    </div>
  );
}
