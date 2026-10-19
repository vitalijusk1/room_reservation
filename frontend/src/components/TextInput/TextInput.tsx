interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
  min?: string;
  required?: boolean;
  label?: string;
}

export const TextInput = ({ value, onChange, type = "text", min, required, label }: TextInputProps) => {
  return (
    <div>
      {label && <label className="mb-1 block text-sm font-medium text-slate-600">{label}</label>}
      <input
        type={type}
        min={min}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-slate-200 px-3"
      />
    </div>
  );
};
