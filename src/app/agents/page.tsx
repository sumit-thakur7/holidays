import { MOCK_AGENTS } from "@/data/mockData";
import { AgentCard } from "@/components/agents/AgentCard";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const metadata = {
  title: "Travel Agents for Bir Billing",
  description: "Connect with trusted local travel agents to plan your perfect Bir Billing trip. Get custom quotes and expert advice.",
};

export default function AgentsPage() {
  return (
    <div className="flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Travel Agents</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">
            Meet Our Expert Travel Agents
          </h1>
          <p className="text-lg text-muted-foreground">
            Get personalized assistance and the best deals for your Bir Billing adventure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {MOCK_AGENTS.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
      <HowItWorksSection />
    </div>
  );
}
