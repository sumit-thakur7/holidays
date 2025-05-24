
"use client";

import Link from "next/link";
import { MessagesSquare } from "lucide-react";
import { CONTACT_PHONE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function WhatsAppButton() {
  // Remove non-numeric characters from phone number for wa.me link
  const whatsappNumber = CONTACT_PHONE.replace(/\D/g, "");
  // Assuming Indian number, prefix with 91 if not already present
  const internationalNumber = whatsappNumber.startsWith("91") ? whatsappNumber : `91${whatsappNumber}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`https://wa.me/${internationalNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50"
            aria-label="Chat on WhatsApp"
          >
            <Button
              size="icon"
              className="bg-[#25D366] hover:bg-[#1DAE54] text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all"
            >
              <MessagesSquare className="w-7 h-7" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-background text-foreground border-border shadow-md">
          <p>Chat with us on WhatsApp!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
