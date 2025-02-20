const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-20">
      <div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
