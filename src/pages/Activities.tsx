import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Monitor, Smartphone, Filter, Search, Brain, Globe, Users } from 'lucide-react';
import { useAuth } from '../contexts/LocalAuthContext';
import { Activity, SchoolYear, BNCCAxis } from '../types/bncc';

const typeIcons = {
  plugada: Monitor,
  desplugada: BookOpen,
};

const typeLabels = {
  plugada: 'Plugada',
  desplugada: 'Desplugada',
};

const typeColors = {
  plugada: 'bg-blue-100 text-blue-700',
  desplugada: 'bg-green-100 text-green-700',
};

const difficultyColors = {
  facil: 'bg-green-100 text-green-700',
  medio: 'bg-yellow-100 text-yellow-700',
  dificil: 'bg-red-100 text-red-700',
};

const difficultyLabels = {
  facil: 'Fácil',
  medio: 'Médio',
  dificil: 'Difícil',
};

export const Activities = () => {
  const { 
    getSchoolYears, 
    getBNCCAxes, 
    getActivities, 
    getActivitiesByYear, 
    getActivitiesByType, 
    getActivitiesByAxis 
  } = useAuth();
  
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedAxis, setSelectedAxis] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const schoolYears = getSchoolYears();
  const axes = getBNCCAxes();
  const allActivities = getActivities();

  // Filtrar atividades
  let filteredActivities = allActivities;

  if (selectedYear !== 'all') {
    filteredActivities = filteredActivities.filter(activity => 
      activity.schoolYears.includes(selectedYear)
    );
  }

  if (selectedType !== 'all') {
    filteredActivities = filteredActivities.filter(activity => 
      activity.type === selectedType
    );
  }

  if (selectedAxis !== 'all') {
    filteredActivities = filteredActivities.filter(activity => 
      activity.axisId === selectedAxis
    );
  }

  if (searchTerm) {
    filteredActivities = filteredActivities.filter(activity =>
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const getAxisName = (axisId: string) => {
    const axis = axes.find(a => a.id === axisId);
    return axis ? axis.name : axisId;
  };

  const getAxisIcon = (axisId: string) => {
    const axisIcons = {
      'pensamento-computacional': Brain,
      'mundo-digital': Globe,
      'cultura-digital': Users,
    };
    return axisIcons[axisId as keyof typeof axisIcons] || Brain;
  };

  const getYearName = (yearId: string) => {
    const year = schoolYears.find(y => y.id === yearId);
    return year ? year.name : yearId;
  };

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
            Atividades BNCC Computacional
          </h1>
          <p className="text-gray-600">
            Explore atividades plugadas e desplugadas organizadas por anos escolares
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Busca */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar atividades..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Ano Escolar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ano Escolar
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos os anos</option>
                {schoolYears.map((year) => (
                  <option key={year.id} value={year.id}>
                    {year.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de Atividade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos os tipos</option>
                <option value="plugada">Plugada</option>
                <option value="desplugada">Desplugada</option>
              </select>
            </div>

            {/* Eixo BNCC */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Eixo BNCC
              </label>
              <select
                value={selectedAxis}
                onChange={(e) => setSelectedAxis(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos os eixos</option>
                {axes.map((axis) => (
                  <option key={axis.id} value={axis.id}>
                    {axis.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Resultados */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4"
        >
          <p className="text-gray-600">
            {filteredActivities.length} atividade(s) encontrada(s)
          </p>
        </motion.div>

        {/* Lista de Atividades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity, index) => {
            const TypeIcon = typeIcons[activity.type];
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={activity.thumbnail_url}
                    alt={activity.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/400x225/4F46E5/FFFFFF?text=${encodeURIComponent(activity.title)}`;
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[activity.type]}`}>
                      {typeLabels[activity.type]}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[activity.difficulty]}`}>
                      {difficultyLabels[activity.difficulty]}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {(() => {
                      const AxisIcon = getAxisIcon(activity.axisId);
                      return <AxisIcon className="w-4 h-4 text-gray-500" />;
                    })()}
                    <span className="text-sm text-gray-500">
                      {getAxisName(activity.axisId)}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {activity.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {activity.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">Anos:</span>
                      <div className="flex flex-wrap gap-1">
                        {activity.schoolYears.map((yearId) => (
                          <span
                            key={yearId}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {getYearName(yearId)}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">Duração:</span>
                      <span className="text-sm text-gray-600">
                        {Math.floor(activity.duration / 60)} min
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {activity.video_url && (
                      <button className="flex-1 text-white px-4 py-2 rounded-lg transition-colors text-sm" style={{ backgroundColor: '#005a93' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#004a7a'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#005a93'}>
                        Ver Vídeo
                      </button>
                    )}
                    {activity.document_url && (
                      <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                        Baixar PDF
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredActivities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma atividade encontrada
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros para encontrar mais atividades.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
