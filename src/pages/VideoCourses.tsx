import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/LocalAuthContext';
import { VideoCourse } from '../types/bncc';

export const VideoCourses = () => {
  const { getVideoCourses, getUserProgress, updateUserProgress, user, getSchoolYears } = useAuth();
  const [videos, setVideos] = useState<VideoCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    const videoCourses = getVideoCourses();
    setVideos(videoCourses);
    setLoading(false);
  };

  const schoolYears = getSchoolYears();

  const getYearName = (yearId: string) => {
    const year = schoolYears.find(y => y.id === yearId);
    return year ? year.name : yearId;
  };

  const filteredVideos = filter === 'all'
    ? videos
    : videos.filter(v => v.schoolYears.includes(filter));

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

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
            Cursos de Vídeo
          </h1>
          <p className="text-gray-600">
            Aprenda com nossos cursos organizados por anos escolares
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

        {/* Atividades Reais - Destaque */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h2 className="text-lg font-semibold text-gray-800">Atividades Reais</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Conteúdo funcional desenvolvido pela Nova Edu
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredVideos.filter(video => 
                video.id === 'atv006' || video.id === 'atv007' || 
                video.id === 'atv008' || video.id === 'atv009'
              ).map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail_url}
                      alt={video.title}
                      className="w-full h-32 object-cover"
                      loading="lazy"
                    />
                    {/* Anos escolares sobre a miniatura */}
                    <div className="absolute bottom-2 left-2 right-2 flex gap-1 flex-wrap">
                      {video.schoolYears.map((yearId) => (
                        <span
                          key={yearId}
                          className="bg-white/90 text-gray-800 border border-gray-200 px-1.5 py-0.5 rounded text-[10px] font-medium shadow-sm"
                        >
                          {getYearName(yearId)}
                        </span>
                      ))}
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                        Real
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">
                        {Math.floor(video.duration / 60)} min
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Lista de Vídeos - Todos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Todos os Cursos</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/400x225/4F46E5/FFFFFF?text=${encodeURIComponent(video.title)}`;
                  }}
                />
                {/* Anos escolares sobre a miniatura */}
                <div className="absolute bottom-3 left-3 right-3 flex gap-1 flex-wrap">
                  {video.schoolYears.map((yearId) => (
                    <span
                      key={yearId}
                      className="bg-white/90 text-gray-800 border border-gray-200 px-2 py-0.5 rounded text-[11px] font-medium shadow-sm"
                    >
                      {getYearName(yearId)}
                    </span>
                  ))}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3">
                  <div className="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDuration(video.duration)}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {video.schoolYears.map(getYearName).join(', ')}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {video.description}
                </p>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors text-sm">
                    Assistir
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Favoritar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum curso encontrado
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