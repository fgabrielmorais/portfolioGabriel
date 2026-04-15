import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolioData";

export default function Activities() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto" id="activities">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-white">Atividades & Conquistas</h2>
        <div className="h-px bg-zinc-800 flex-grow" />
      </div>

      <div className="space-y-6">
        {portfolioData.activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-zinc-900/50 transition-colors"
            >
              <div className="mt-1 text-blue-500">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{activity.title}</h3>
                <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}