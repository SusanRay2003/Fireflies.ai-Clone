import { Suspense } from "react";

function NotebookLoading() {
  return (
    <div className="flex h-full items-center justify-center bg-[#FAFAFC]">
      <div className="h-8 w-8 animate-pulse rounded-full bg-[#F0F0F4]" />
    </div>
  );
}

export default function NotebookLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<NotebookLoading />}>{children}</Suspense>;
}
