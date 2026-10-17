interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  type?: "date" | "datetime-local";
}

export const DateInput = ({ value, onChange, type = "date" }: DateInputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none focus:border-indigo-400"
    />
  );
};
