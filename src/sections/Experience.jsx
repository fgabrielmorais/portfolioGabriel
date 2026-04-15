import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolioData";

export default function Experience() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto" id="experience">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-white">Experiência</h2>
        <div className="h-px bg-zinc-800 flex-grow" />
      </div>

      <div className="space-y-12">
        {portfolioData.experience.map((exp, index) => {
          const Icon = exp.icon;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-4 md:gap-8 items-start">
                {/* Timeline Marker (Mobile hidden, Desktop visible) */}
                <div className="hidden md:flex flex-col items-end pt-1">
                  <span className="text-sm font-mono text-zinc-500">{exp.period}</span>
                </div>
                
                {/* Content Card */}
                <div className="md:col-span-3 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                      <p className="text-blue-500 font-medium">{exp.company}</p>
                    </div>
                  </div>
                  <span className="text-sm font-mono text-zinc-500 md:hidden mb-4 block">{exp.period}</span>
                  <p className="text-zinc-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}