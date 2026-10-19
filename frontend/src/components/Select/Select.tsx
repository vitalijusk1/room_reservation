interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  required?: boolean;
  label?: string;
}

export const Select = ({ value, onChange, options, placeholder, required, label }: SelectProps) => {
  return (
    <div>
      {label && <label className="mb-1 block text-sm font-medium text-slate-600">{label}</label>}
      <select
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none focus:border-indigo-400"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
