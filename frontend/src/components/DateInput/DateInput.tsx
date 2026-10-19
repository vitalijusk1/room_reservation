interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  type?: "date" | "datetime-local";
  required?: boolean;
  label?: string;
}

export const DateInput = ({ value, onChange, type = "date", required, label }: DateInputProps) => {
  return (
    <div>
      {label && <label className="mb-1 block text-sm font-medium text-slate-600">{label}</label>}
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none focus:border-indigo-400"
      />
    </div>
  );
};
