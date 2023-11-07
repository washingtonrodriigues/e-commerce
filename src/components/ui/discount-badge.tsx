import { cn } from "@/lib/utils";
import { Badge, BadgeProps } from "./badge";
import { ArrowDownIcon } from "lucide-react";

export const DiscountBadge = ({
  children,
  className,
  ...props
}: BadgeProps) => {
  return (
    <Badge className={cn("px-2 py-[2px]", className)} {...props}>
      <ArrowDownIcon size={14} />
      {children}%
    </Badge>
  );
};
