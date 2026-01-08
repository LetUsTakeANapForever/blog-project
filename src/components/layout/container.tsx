import { cn } from "@/lib/utils"; // cn is the utility class function u can use

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

// className prop is for any extra classname we might add, which is optional.
export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("container mx-auto px-4", className)}>{children}</div>
  );
}
