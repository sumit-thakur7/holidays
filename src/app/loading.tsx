
import { MountainSnow } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="flex flex-col items-center text-center p-8 rounded-lg">
        <div className="flex items-center gap-3 mb-6">
          <MountainSnow className="h-12 w-12 text-primary" />
          <span className="text-3xl font-bold text-primary">{SITE_NAME}</span>
        </div>
        
        <svg
          className="animate-spin h-10 w-10 text-primary mb-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        
        <p className="text-xl font-semibold text-primary">Loading Your Adventure...</p>
        <p className="text-sm text-muted-foreground mt-1">
          Please wait while we prepare your journey into the Himalayas.
        </p>
      </div>
    </div>
  );
}
