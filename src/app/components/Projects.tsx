import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { ProjectModal } from './ProjectModal';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    fetch("http://localhost:3001/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);
  return (
    <section id="projek" className="min-h-screen py-20 bg-white dark:bg-[#030213]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Projek Terbaru
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-600 to-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.slice(0, visibleCount).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-white dark:bg-gray-800/50 border border-transparent dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color || 'from-cyan-500 to-blue-500'} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                {/* Click to view overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Klik untuk detail
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col h-[calc(100%-16rem)] min-h-[16rem]">
                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {(project.technologies || project.tags || []).slice(0, 4).map((tag: any, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-sm bg-gray-50 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-cyan-50 dark:hover:bg-cyan-900/50 hover:text-cyan-700 dark:hover:text-cyan-300 hover:border-cyan-100 dark:hover:border-cyan-800 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {(project.technologies || project.tags || []).length > 4 && (
                    <span className="px-3 py-1 text-sm bg-gray-50 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 text-gray-400 dark:text-gray-500 rounded-full">
                      +{(project.technologies || project.tags || []).length - 4}
                    </span>
                  )}
                </div>

                <div className="flex gap-4 mt-auto pt-4 border-t border-gray-50 dark:border-gray-700">
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium transition-colors duration-300"
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm">Live Demo</span>
                    </motion.a>
                  )}
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium transition-colors duration-300"
                    >
                      <Github size={18} />
                      <span className="text-sm">Code</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {visibleCount < projects.length && (
          <div className="text-center mt-12 pb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl shadow-sm hover:shadow-md hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300"
            >
              Muat Lebih Banyak
            </motion.button>
          </div>
        )}
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
