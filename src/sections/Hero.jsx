import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { portfolioData } from "../data/portfolioData";
import fotoPerfil from "../assets/perfil.jpeg"; // 1. Importação da foto

export default function Hero() {
  const { name, role, objective, github, linkedin, email } = portfolioData.personal;

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 pt-20 gap-12">
      {/* Container da Imagem com Animação */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-blue-500 p-1 overflow-hidden">
          <img 
            src={fotoPerfil} 
            alt={name} 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        {/* Detalhe decorativo atrás da foto */}
        <div className="absolute -z-10 -bottom-2 -right-2 w-full h-full border-2 border-zinc-800 rounded-full" />
      </motion.div>

      <motion.div 
        className="max-w-2xl flex flex-col items-start gap-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <p className="text-blue-500 font-mono">Olá, meu nome é</p>
        <h1 className="text-5xl font-bold text-white tracking-tight">{name}</h1>
        <h2 className="text-2xl md:text-4xl font-bold text-zinc-400">{role}</h2>
        <p className="text-zinc-400 text-lg leading-relaxed">{objective}</p>
        
        <div className="flex gap-4 mt-6">
          <a href={github} target="_blank" rel="noreferrer" className="p-3 bg-zinc-900 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
            <FaGithub size={24} />
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer" className="p-3 bg-zinc-900 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
            <FaLinkedin size={24} />
          </a>
          <a href={`mailto:${email}`} className="p-3 bg-zinc-900 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
            <Mail size={24} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}