import { Icon, type IconName } from "@/src/components/Icon";

const control = "h-[52px] w-full rounded border border-line bg-field px-4 text-sm text-ink outline-none placeholder:text-faint focus:border-brand disabled:opacity-60";

export function FormGrid({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto grid max-w-[780px] gap-x-[60px] gap-y-[30px] sm:grid-cols-2">{children}</div>;
}

export function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  mono = false,
  disabled = false,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: "text" | "number" | "password";
  placeholder?: string;
  mono?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="block text-sm font-semibold text-muted dark:text-ink">
      {label}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className={`mt-3 ${control} ${mono ? "font-mono" : ""}`}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function SelectField({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm font-semibold text-muted dark:text-ink">
      {label}
      <span className="relative mt-3 block">
        <select value={value} className={`${control} appearance-none pr-10`} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" size={16} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" />
      </span>
    </label>
  );
}

export function SubmitButton({ children, onClick, variant = "solid" }: { children: React.ReactNode; onClick: () => void; variant?: "solid" | "outline" }) {
  return (
    <button
      type="button"
      className={`h-14 w-[274px] rounded-xl text-lg font-bold ${variant === "solid" ? "bg-brand/90 text-white hover:bg-brand" : "border-2 border-brand text-brand hover:bg-brand/10"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function PhotoCircle({ icon, label }: { icon: IconName; label: string }) {
  return (
    <div className="mb-[34px] flex flex-col items-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ECECEE] text-[#414141] dark:bg-[#F5F6FA]">
        <Icon name={icon} size={28} />
      </span>
      <span className="mt-4 text-sm font-semibold text-brand">{label}</span>
    </div>
  );
}
