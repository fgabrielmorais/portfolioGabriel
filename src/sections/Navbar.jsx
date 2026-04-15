import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl"
    >
      <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/50 rounded-full px-6 py-3 shadow-2xl flex items-center justify-center">
        <ul className="flex items-center gap-6 md:gap-8 text-sm font-medium text-zinc-400">
          <li><a href="#hero" className="hover:text-blue-400 transition-colors">Início</a></li>
          <li><a href="#experience" className="hover:text-blue-400 transition-colors">Experiência</a></li>
          <li><a href="#academic">Acadêmico</a></li>
          <li><a href="#projects" className="hover:text-blue-400 transition-colors">Projetos</a></li>
          <li><a href="#activities">Atividades/Conquistas</a></li>
        </ul>
      </div>
    </motion.nav>
  );
}