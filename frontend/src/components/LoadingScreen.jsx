function LoadingScreen() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-lg">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-semibold text-gray-700">Carregando...</p>
        </div>
      </div>
    );
  }
  
  export default LoadingScreen;
  