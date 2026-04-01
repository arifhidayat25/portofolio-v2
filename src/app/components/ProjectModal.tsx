import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Code, Star, GitFork } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  id?: number | string;
  title: string;
  description: string;
  image: string;
  tags?: string[];
  technologies?: string[];
  color?: string;
  fullDescription: string;
  features?: string[];
  role?: string;
  duration?: string;
  team?: string;
  github?: string;
  live?: string;
  stars?: number;
  forks?: number;
  language?: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white dark:bg-[#030213] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl my-8 border border-transparent dark:border-gray-800"
        >
          {/* Header Image */}
          <div className="relative h-64 md:h-96 overflow-hidden rounded-t-3xl border-b border-gray-100 dark:border-gray-800">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color || 'from-cyan-500 to-blue-500'} opacity-10`}></div>
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 shadow-lg transition-colors duration-300"
            >
              <X size={24} />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
            >
              {project.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {(project.technologies || project.tags || []).map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/50 dark:to-blue-900/50 text-cyan-700 dark:text-cyan-300 border border-cyan-100/50 dark:border-cyan-800/50 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              {(project.language || project.role) && (
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100/80 dark:from-gray-800/50 dark:to-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-cyan-600 shadow-sm border border-transparent dark:border-gray-700">
                    <Code size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{project.language ? 'Language' : 'Role'}</p>
                    <p className="font-bold text-gray-800 dark:text-gray-100">{project.language || project.role}</p>
                  </div>
                </div>
              )}

              {(project.stars !== undefined || project.duration) && (
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100/80 dark:from-gray-800/50 dark:to-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-yellow-500 shadow-sm border border-transparent dark:border-gray-700">
                    <Star size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{project.stars !== undefined ? 'Stars' : 'Duration'}</p>
                    <p className="font-bold text-gray-800 dark:text-gray-100">{project.stars !== undefined ? project.stars : project.duration}</p>
                  </div>
                </div>
              )}

              {(project.forks !== undefined || project.team) && (
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100/80 dark:from-gray-800/50 dark:to-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-blue-500 shadow-sm border border-transparent dark:border-gray-700">
                    <GitFork size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{project.forks !== undefined ? 'Forks' : 'Team Size'}</p>
                    <p className="font-bold text-gray-800 dark:text-gray-100">{project.forks !== undefined ? project.forks : project.team}</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Overview</h3>
              <div 
                className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg" 
                dangerouslySetInnerHTML={{ __html: project.fullDescription }} 
              />
            </motion.div>

            {/* Features (if present) */}
            {project.features && project.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Key Features</h3>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 min-w-[200px] px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ExternalLink size={20} />
                  <span>View Live Demo</span>
                </motion.a>
              )}
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 min-w-[200px] px-8 py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:border-cyan-600 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Github size={20} />
                  <span>View Code</span>
                </motion.a>
              )}
              {!project.live && !project.github && (
                <div className="flex-1 text-center py-4 text-gray-400 dark:text-gray-500 italic bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700 rounded-xl">
                  Pranala tidak tersedia
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
