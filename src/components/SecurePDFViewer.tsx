import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download, Eye } from 'lucide-react';

interface SecurePDFViewerProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
  allowDownload?: boolean;
}

export const SecurePDFViewer = ({ pdfUrl, title, onClose, allowDownload = false }: SecurePDFViewerProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleDownload = () => {
    if (allowDownload) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = title;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Eye className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900 truncate">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage <= 1}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-600 px-2">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-600 px-2 min-w-[3rem] text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={handleRotate}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RotateCw className="h-4 w-4" />
            </button>
            {allowDownload && (
              <button
                onClick={handleDownload}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Download className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-hidden relative">
          <div 
            className="w-full h-full"
            onContextMenu={(e) => !allowDownload && e.preventDefault()}
            onDragStart={(e) => !allowDownload && e.preventDefault()}
            onSelectStart={(e) => !allowDownload && e.preventDefault()}
            style={{
              userSelect: allowDownload ? 'auto' : 'none',
              WebkitUserSelect: allowDownload ? 'auto' : 'none',
              MozUserSelect: allowDownload ? 'auto' : 'none',
              msUserSelect: allowDownload ? 'auto' : 'none'
            }}
          >
            <embed
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&page=${currentPage}&zoom=${zoom}&rotate=${rotation}&disableprint=1&disablesave=1`}
              type="application/pdf"
              className="w-full h-full"
              title={title}
              onLoad={() => {
                setTotalPages(10); // Valor fictício
              }}
            />
          </div>
          
          {!allowDownload && (
            <div className="absolute top-4 right-4 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              Modo Visualização
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              {!allowDownload && (
                <span className="flex items-center gap-1 text-orange-600 font-medium">
                  <Eye className="h-4 w-4" />
                  Modo de visualização - Download e impressão desabilitados
                </span>
              )}
              {allowDownload && (
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <Download className="h-4 w-4" />
                  Modo completo - Download disponível
                </span>
              )}
            </div>
            <div className="text-gray-500">
              Use os controles acima para navegar e ajustar a visualização
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
