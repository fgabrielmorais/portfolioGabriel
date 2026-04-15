import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolioData";

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto" id="skills">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-white">Habilidades</h2>
        <div className="h-px bg-zinc-800 flex-grow" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {portfolioData.skills.map((skillGroup, index) => (
          <div key={index} className="bg-zinc-900/30 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-4">{skillGroup.category}</h3>
            <motion.div 
              className="flex flex-wrap gap-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {skillGroup.items.map((skill, i) => (
                <motion.span 
                  key={i}
                  variants={itemVariants}
                  className="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm rounded-full border border-zinc-700 hover:border-blue-500 hover:text-blue-400 transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}