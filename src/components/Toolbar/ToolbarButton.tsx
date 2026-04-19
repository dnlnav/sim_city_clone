import type { LucideIcon } from "lucide-react";
import type { ColorKey } from "../../state/useActions";

type ToolbarButtonProps = {
  label: string;
  icon: LucideIcon;
  color: ColorKey;
  selected: boolean;
  onClick: () => void;
  hide?: boolean;
};

const COLOR_STYLES: Record<
  ColorKey,
  {
    idle: string;
    hover: string;
    border: string;
    selectedBg: string;
    selectedBorder: string;
    text: string;
    selectedText: string;
  }
> = {
  slate: {
    idle: "bg-slate-600",
    hover: "hover:bg-slate-500",
    border: "border-slate-900",
    selectedBg: "bg-slate-400",
    selectedBorder: "border-slate-700",
    text: "text-slate-200",
    selectedText: "text-white",
  },
  emerald: {
    idle: "bg-emerald-700",
    hover: "hover:bg-emerald-600",
    border: "border-emerald-950",
    selectedBg: "bg-emerald-400",
    selectedBorder: "border-emerald-800",
    text: "text-emerald-100",
    selectedText: "text-white",
  },
  sky: {
    idle: "bg-sky-700",
    hover: "hover:bg-sky-600",
    border: "border-sky-950",
    selectedBg: "bg-sky-400",
    selectedBorder: "border-sky-800",
    text: "text-sky-100",
    selectedText: "text-white",
  },
  amber: {
    idle: "bg-amber-600",
    hover: "hover:bg-amber-500",
    border: "border-amber-900",
    selectedBg: "bg-amber-400",
    selectedBorder: "border-amber-700",
    text: "text-amber-100",
    selectedText: "text-amber-900",
  },
  violet: {
    idle: "bg-violet-700",
    hover: "hover:bg-violet-600",
    border: "border-violet-950",
    selectedBg: "bg-violet-400",
    selectedBorder: "border-violet-800",
    text: "text-violet-100",
    selectedText: "text-white",
  },
  zinc: {
    idle: "bg-zinc-600",
    hover: "hover:bg-zinc-500",
    border: "border-zinc-900",
    selectedBg: "bg-zinc-400",
    selectedBorder: "border-zinc-700",
    text: "text-zinc-100",
    selectedText: "text-white",
  },
  stone: {
    idle: "bg-stone-600",
    hover: "hover:bg-stone-500",
    border: "border-stone-900",
    selectedBg: "bg-stone-400",
    selectedBorder: "border-stone-700",
    text: "text-stone-100",
    selectedText: "text-white",
  },
};

const ToolbarButton = ({
  label,
  icon: Icon,
  color,
  selected,
  onClick,
  hide = false,
}: ToolbarButtonProps) => {
  if (hide) return null;

  const s = COLOR_STYLES[color];
  const bg = selected ? s.selectedBg : s.idle;
  const border = selected ? s.selectedBorder : s.border;
  const textColor = selected ? s.selectedText : s.text;
  const ring = selected ? "ring-4 ring-amber-300 ring-offset-2 ring-offset-slate-800" : "";
  const shadow = "shadow-[0_4px_0_0_rgba(0,0,0,0.35)] active:shadow-[0_1px_0_0_rgba(0,0,0,0.35)] active:translate-y-[3px]";

  return (
    <div className="group relative">
      <button
        title={label}
        aria-label={label}
        onClick={onClick}
        className={[
          "flex h-14 w-14 items-center justify-center",
          "rounded-xl border-4",
          "cursor-pointer transition-all duration-100",
          bg,
          s.hover,
          border,
          textColor,
          ring,
          shadow,
        ].join(" ")}
      >
        <Icon className="h-7 w-7" strokeWidth={2.5} />
      </button>
      <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md border-2 border-black/30 bg-black/85 px-2.5 py-1 text-xs font-bold tracking-widest text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
        {label}
      </span>
    </div>
  );
};

export default ToolbarButton;
