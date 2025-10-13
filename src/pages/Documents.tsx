import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, File, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/LocalAuthContext';
import { Document } from '../types/bncc';

const fileTypeIcons = {
  pdf: '📄',
  docx: '📝',
  pptx: '📊',
};

const fileTypeColors = {
  pdf: 'bg-red-100 text-red-700',
  docx: 'bg-blue-100 text-blue-700',
  pptx: 'bg-orange-100 text-orange-700',
};

export const Documents = () => {
  const { getDocuments, getSchoolYears } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const docs = getDocuments();
    setDocuments(docs);
    setLoading(false);
  };

  const schoolYears = getSchoolYears();

  const getYearName = (yearId: string) => {
    const year = schoolYears.find(y => y.id === yearId);
    return year ? year.name : yearId;
  };

  const filteredDocuments = filter === 'all'
    ? documents
    : documents.filter(d => d.schoolYears.includes(filter));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Documentos de Apoio
          </h1>
          <p className="text-gray-600">
            Materiais pedagógicos organizados por anos escolares
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtrar por Ano Escolar</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={filter === 'all' ? { backgroundColor: '#005a93' } : {}}
            >
              Todos
            </button>
            {schoolYears.map((year) => (
              <button
                key={year.id}
                onClick={() => setFilter(year.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === year.id
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={filter === year.id ? { backgroundColor: '#005a93' } : {}}
              >
                {year.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Lista de Documentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{fileTypeIcons[doc.file_type]}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {doc.schoolYears.map(getYearName).join(', ')}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {doc.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${fileTypeColors[doc.file_type]}`}>
                      {doc.file_type.toUpperCase()}
                    </span>
                    <button className="flex items-center gap-1 text-sky-600 hover:text-sky-700 text-sm font-medium">
                      <Download className="w-4 h-4" />
                      Baixar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum documento encontrado
            </h3>
            <p className="text-gray-500">
              Tente selecionar um ano escolar diferente.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};