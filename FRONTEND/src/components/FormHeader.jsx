const FormHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-2xl font-bold text-gray-900">Create Short Link</h3>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <span>Ready</span>
      </div>
    </div>
  );
};

export default FormHeader;
