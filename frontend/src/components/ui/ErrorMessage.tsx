interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  );
}; 