interface ErrorMessageProps {
  message?: string | null;
}

const DEFAULT_ERROR_TEXT = "Something went wrong";

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const displayMessage = message || DEFAULT_ERROR_TEXT;

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
      {displayMessage}
    </div>
  );
};
