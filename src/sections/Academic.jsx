import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import apostilaPath from "../assets/ApostilaGit.pdf";

export default function Academic() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto" id="academic">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-white">Trajetória Acadêmica</h2>
        <div className="h-px bg-zinc-800 flex-grow" />
      </div>

      <div className="space-y-8">
        {portfolioData.academic.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 md:p-8 hover:border-blue-500/30 transition-colors group"
            >
              {/* Badge de Categoria */}
              <div className="absolute -top-3 left-6 px-3 py-1 bg-zinc-950 border border-zinc-700 rounded-full">
                <span className="text-xs font-mono text-zinc-400">{item.category}</span>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start mt-2">
                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-blue-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-lg">
                  <Icon size={32} />
                </div>
                
                <div className="flex-grow">
                  <span className="text-blue-500 font-mono text-sm mb-1 block">{item.role}</span>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-base mb-6">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-zinc-900 text-zinc-500 text-xs font-medium rounded-full border border-zinc-800/50">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Renderiza o botão apenas se existir uma action definida no JSON */}
                    {item.action?.type === "download" && (
                      <a 
                        href={apostilaPath} 
                        download={item.action.fileName}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-900/20 whitespace-nowrap"
                      >
                        <Download size={18} />
                        {item.action.label}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}