import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MessageSquare, Users, Award } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const steps = [
  {
    icon: <MessageSquare className="h-10 w-10 text-primary mb-4" />,
    title: "Tell Us About Your Trip",
    description: "Share your travel preferences, dates, and interests with us.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary mb-4" />,
    title: "Get Custom Quotes",
    description: "Receive personalized quotes from our network of top-rated local travel agents.",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-primary mb-4" />,
    title: "Choose Your Perfect Package",
    description: "Compare offers, agent profiles, and reviews to select the best deal for your adventure.",
  },
];

const benefits = [
  {
    icon: <Award className="h-6 w-6 text-accent" />,
    text: "Trusted Network Of 3000+ Agents.",
  },
  {
    icon: <Award className="h-6 w-6 text-accent" />,
    text: "Book everything together, including stay & transport.",
  },
  {
    icon: <Award className="h-6 w-6 text-accent" />,
    text: "Compare agent profiles & verified reviews.",
  },
];


export function HowItWorksSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">Plan Your Dream Trip with Experts</h2>
          <p className="text-lg text-muted-foreground mt-2">Connect with local travel agents for a customized Bir Billing experience.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6">
              <CardHeader className="items-center p-0 mb-2">
                {step.icon}
                <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-secondary p-8 rounded-lg shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-4">Why Book With Us?</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {benefit.icon}
                    <span className="text-secondary-foreground">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center md:text-right">
                <p className="text-secondary-foreground mb-4">Ready to get started?</p>
                <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                    <Link href="/agents">Find a Travel Agent</Link>
                </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
