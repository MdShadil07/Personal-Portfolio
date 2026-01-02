import * as React from "react";

export interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = "" }: PageLayoutProps) {
  return (
    <div className={`flex-1 space-y-6 p-8 pt-6 ${className}`}>{children}</div>
  );
}
