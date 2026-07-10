import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

interface Props {
  title: string;
  icon: LucideIcon;
  href?: string;
  accentClass: string;
  onClick?: () => void;
}

export function QuickStartCard({ title, icon: Icon, href, accentClass, onClick }: Props) {
  const content = (
    <div className="group relative flex h-[72px] items-center justify-between rounded-[16px] border border-[#ECECEC] bg-white px-4 py-3.5 transition duration-150 ease-out hover:-translate-y-0.5 hover:border-[#D9D0FF] hover:shadow-[0_8px_24px_rgba(109,74,255,0.08)]">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-[12px] ${accentClass}`}>
          <Icon className="h-4.5 w-4.5" />
        </div>
        <p className="text-sm font-medium text-[#1F1F1F]">{title}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-[#666666] transition group-hover:text-[#6D4AFF]" />
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      {content}
    </button>
  );
}
