// Note: A fully functional contact form requires a backend or a third-party service.
// This is a UI-only implementation as per the "no backend" constraint.

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // This is where you would typically send data to a backend or service.
    // For this UI-only version, we'll just show a success toast.
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
      variant: "default"
    });
    (event.target as HTMLFormElement).reset();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Contact Us</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">Get in Touch</h1>
        <p className="text-lg text-muted-foreground">We're here to help you plan your adventure. Reach out with any questions!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Send us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll respond as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Inquiry about paragliding package" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message here..." rows={5} required />
              </div>
              <Button type="submit" size="lg" className="w-full shadow-md hover:shadow-lg transition-shadow">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl text-primary">Contact Information</CardTitle>
                <CardDescription>You can also reach us directly through the following channels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-md">
                    <MapPin className="h-8 w-8 text-accent mt-1 shrink-0" />
                    <div>
                        <h3 className="font-semibold">Our Address</h3>
                        <p className="text-muted-foreground">{CONTACT_ADDRESS}</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-md">
                    <Mail className="h-8 w-8 text-accent mt-1 shrink-0" />
                    <div>
                        <h3 className="font-semibold">Email Us</h3>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted-foreground hover:text-primary transition-colors">
                            {CONTACT_EMAIL}
                        </a>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-md">
                    <Phone className="h-8 w-8 text-accent mt-1 shrink-0" />
                    <div>
                        <h3 className="font-semibold">Call Us</h3>
                        <a href={`tel:${CONTACT_PHONE}`} className="text-muted-foreground hover:text-primary transition-colors">
                            {CONTACT_PHONE}
                        </a>
                    </div>
                </div>
                 <div className="mt-6">
                    <h3 className="font-semibold mb-2 text-lg">Operating Hours</h3>
                    <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                    <p className="text-muted-foreground">Sunday: Closed (Adventure never sleeps, but our office does!)</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
