import { motion } from "framer-motion";
import { FolderGit2 } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Projects() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto" id="projects">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-white">Projetos em Destaque</h2>
        <div className="h-px bg-zinc-800 flex-grow" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {portfolioData.projects.map((project, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-zinc-900 rounded-xl p-6 flex flex-col h-full border border-zinc-800 hover:border-blue-500 transition-all group"
          >
            <div className="flex justify-between items-center mb-4 text-blue-500">
              <FolderGit2 size={32} />
              {/* Future addition: Add GitHub / External Link icons here if URLs exist in your data */}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag, i) => (
                <span key={i} className="text-xs font-mono text-zinc-500">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}