'use client';

import { Button } from "@/components/ui/button"
import Link from "next/link";

function NotFoundPage() {

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-extrabold mb-4 text-red-600">404</h1>
      <h2 className="text-2xl font-semibold mb-6 text-red-600">Page Not Found!</h2>
      <p className="text-muted-foreground mb-8 max-w-md text-white">
        The page you are looking doesn't exist.
      </p>
      <Button asChild>
         {/* The Link component is now the actual rendered element, 
          but it inherits all the Button styles and behaviors */}
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
    </div>
  );
};

export default NotFoundPage;