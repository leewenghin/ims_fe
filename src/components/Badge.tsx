export type Tone = "success" | "violet" | "danger" | "warning" | "magenta" | "brand";

const tones: Record<Tone, string> = {
  success: "bg-success/20 text-success dark:bg-success dark:text-white",
  violet: "bg-violet/20 text-violet dark:bg-violet dark:text-white",
  danger: "bg-danger/20 text-danger dark:bg-danger dark:text-white",
  warning: "bg-warning/20 text-warning dark:bg-warning dark:text-white",
  magenta: "bg-magenta/20 text-magenta dark:bg-magenta dark:text-white",
  brand: "bg-brand/20 text-brand dark:bg-brand dark:text-white",
};

export function Badge({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex h-[27px] min-w-[93px] items-center justify-center rounded-[4.5px] px-3 text-xs font-bold ${tones[tone]}`}>
      {children}
    </span>
  );
}
