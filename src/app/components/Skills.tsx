import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function Skills() {
  const [skillCategories, setSkillCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/skills")
      .then((res) => res.json())
      .then((data) => setSkillCategories(data))
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  return (
    <section id="skills" className="min-h-screen py-20 bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-900 dark:via-[#030213] dark:to-[#030213]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Skills & Keahlian
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-600 to-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent dark:border-gray-800"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{category.category}</h3>
              <div className="space-y-6">
                {(category.items || category.skills || []).map((skill: any, skillIndex: number) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                        className="h-full bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full shadow-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
