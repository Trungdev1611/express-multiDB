interface ErrorTextItemFormProps {
    message?: string;
  }
  
  const ErrorTextItemForm: React.FC<ErrorTextItemFormProps> = ({ message }) => {
    if (!message) return null; // Nếu không có lỗi, không hiển thị gì
  
    return <p className="text-red-500 text-sm mt-1">{message}</p>;
  };
  
  export default ErrorTextItemForm;
  