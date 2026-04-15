import { motion } from "framer-motion";
import { Download } from "lucide-react"; // Importe o ícone de download
import { portfolioData } from "../data/portfolioData";
import apostilaPath from "../assets/ApostilaGit.pdf"; // Importação do PDF

export default function Featured() {
  const data = portfolioData.featured;
  const Icon = data.icon;

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto" id="featured">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-white">Projeto em Destaque</h2>
        <div className="h-px bg-zinc-800 flex-grow" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-br from-blue-900/10 to-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-10 overflow-hidden group hover:border-blue-500/30 transition-colors"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-blue-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-lg">
            <Icon size={40} />
          </div>
          
          <div className="flex-grow">
            <span className="text-blue-500 font-mono text-sm mb-2 block">{data.role}</span>
            <h3 className="text-2xl font-bold text-white mb-4">{data.title}</h3>
            <p className="text-zinc-300 leading-relaxed text-lg mb-6">
              {data.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex flex-wrap gap-2">
                {data.highlights.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-zinc-900 text-zinc-400 text-xs font-medium rounded-full border border-zinc-800">
                    {tag}
                  </span>
                ))}
              </div>

              {/* BOTÃO DE DOWNLOAD */}
<a 
                href={apostilaPath} 
                download="Apostila-Git-Github-GabrielFelix.pdf"
                className="flex items-center justify-center gap-3 px-8 py-3 w-full sm:w-auto sm:min-w-[240px] bg-blue-600 hover:bg-blue-500 text-white text-[15px] font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-900/20"
              >
                <Download size={20} />
                Baixar Apostila
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
