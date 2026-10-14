interface PageHeaderProps {
  title: string;
  description: string;
  btnAction?: () => void;
  btnText?: string;
}

const PageHeader = ({
  title,
  description,
  btnAction,
  btnText,
}: PageHeaderProps) => {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-slate-500">{description}</p>
      </div>
      {btnAction && btnText && (
        <button
          onClick={btnAction}
          className="mt-4 h-10 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          {btnText}
        </button>
      )}
    </div>
  );
};

export default PageHeader;
