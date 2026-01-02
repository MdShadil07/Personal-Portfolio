import * as React from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ShareButtonProps {
  onClick?: () => void;
  title?: string;
}

export default function ShareButton({ onClick, title = "Share" }: ShareButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={title}
      onClick={onClick}
      className="h-9 w-9 p-2"
    >
      <Share2 className="w-4 h-4" />
    </Button>
  );
}
