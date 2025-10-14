import { motion } from 'framer-motion';
import { Users, Laptop, Tablet, BookOpen } from 'lucide-react';

const classroomImages = [
  {
    id: 1,
    src: '/images/hero/criancas-de-tiro-medio-com-tablet.jpg',
    alt: 'Crianças usando tablets em sala de aula moderna',
    title: 'Tecnologia na Educação',
    description: 'Alunos explorando o mundo digital com tablets e dispositivos educacionais'
  },
  {
    id: 2,
    src: '/images/hero/guy-e-garota-estao-sentados-a-mesa-garota-africana-na-aula-de-ciencia-da-computacao-criancas-jogando-jogos-de-computador.jpg',
    alt: 'Sala de aula colaborativa com tecnologia',
    title: 'Aprendizado Colaborativo',
    description: 'Ambientes modernos que promovem o trabalho em equipe e a criatividade'
  },
  {
    id: 3,
    src: '/images/hero/criancas-em-filmagem-media-olhando-para-um-tablet.jpg',
    alt: 'Crianças programando com robôs',
    title: 'Programação e Robótica',
    description: 'Desenvolvendo pensamento computacional através de atividades práticas'
  },
  {
    id: 4,
    src: '/images/hero/criancas-fazendo-licao-de-casa-em-close-up-de-um-laptop.jpg',
    alt: 'Sala de aula com lousa digital',
    title: 'Ambientes Digitais',
    description: 'Salas equipadas com tecnologia para uma educação inovadora'
  }
];

const stats = [
  {
    icon: Users,
    number: '10.000+',
    label: 'Professores Ativos',
    color: '#005a93',
    bgColor: '#e6f2ff'
  },
  {
    icon: Laptop,
    number: '500+',
    label: 'Atividades Disponíveis',
    color: '#00913b',
    bgColor: '#e6f7ed'
  },
  {
    icon: Tablet,
    number: '50+',
    label: 'Escolas Parceiras',
    color: '#ffbe00',
    bgColor: '#fff9e6'
  },
  {
    icon: BookOpen,
    number: '100%',
    label: 'Alinhado com BNCC',
    color: '#005a93',
    bgColor: '#e6f2ff'
  }
];

export const ClassroomGallery = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Educação Digital em Ação
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja como professores e alunos estão transformando a educação com tecnologia
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: stat.bgColor }}
              >
                <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
              </div>
              <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Image Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {classroomImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/600x400/f3f4f6/6b7280?text=Imagem+Educacional';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {image.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {image.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Faça parte desta transformação
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Junte-se a milhares de educadores que já estão preparando seus alunos 
              para o futuro digital com a BNCC Computacional
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-sky-600">
                <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                <span className="font-medium">Conteúdo alinhado com BNCC</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="font-medium">Atividades práticas e interativas</span>
              </div>
              <div className="flex items-center space-x-2 text-cyan-600">
                <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                <span className="font-medium">Suporte pedagógico completo</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
