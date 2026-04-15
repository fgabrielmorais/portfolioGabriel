import { Code, Database, Smartphone, Users, Trophy, BookOpen, BrainCircuit } from "lucide-react";
export const portfolioData = {
  personal: {
    name: "Gabriel Morais Felix", // [cite: 1]
    role: "Software Developer", // [cite: 6]
    email: "fgabrielmorais05@gmail.com", // [cite: 2]
    phone: "(14) 99902-4340", // [cite: 3]
    github: "https://github.com/fgabrielmorais", 
    linkedin: "https://www.linkedin.com/in/gabriel-morais-felix-017152286/", 
    objective: "Estudante de Sistemas de Informação (UNICAMP) com experiência prática em Desenvolvimento Web (React) e Mobile (Flutter/Dart). Busco uma oportunidade de Estágio em TI para concretizar o primeiro contato profissional e aplicar conhecimento adquirido em projetos e pesquisa." // [cite: 8, 9]
  },
  skills: [
    { category: "Languages", items: ["Python", "Dart", "Java", "C", "JavaScript", "HTML/CSS"] }, // [cite: 12]
    { category: "Frameworks & Libs", items: ["React.js", "Node.js", "Flutter", "Pandas"] }, // [cite: 13, 14]
    { category: "Tools", items: ["Git/GitHub", "MySQL", "Scrum", "Leiden Algorithm"] } // [cite: 14, 15, 16, 17]
  ],
  experience: [
    {
      title: "Analista/Pesquisador (Bolsista)", // [cite: 28]
      company: "FCA Unicamp", // [cite: 27]
      period: "maio/2025 - Presente", // [cite: 27]
      description: "Pesquisa focada no ecossistema de engenharia da Unicamp. Tratamento de dados com Python/Pandas e análise de redes usando o algoritmo Leiden para auxiliar na tomada de decisão institucional.", // [cite: 29, 30, 31]
      icon: Database
    },
    {
      title: "Desenvolvedor", // [cite: 20]
      company: "Atria Jr", // [cite: 19]
      period: "abril/2025 - Presente", // [cite: 19]
      description: "Desenvolvimento mobile focado em Flutter/Dart, contribuindo para o alcance de metas e subida de rank da empresa júnior.", // [cite: 21, 22]
      icon: Smartphone
    },
    {
      title: "Diretor de Projetos/Desenvolvedor", // [cite: 24]
      company: "Comissão Discente de Informática", // [cite: 23]
      period: "abril/2025 - Presente", // [cite: 23]
      description: "Desenvolvimento e manutenção do site oficial da CDI utilizando React.js, implementando novas funcionalidades para a comunicação da instituição. Além de liderar a equipe para a realização de projetos. ", // [cite: 25, 26]
      icon: Code
    }
  ],
  projects: [
    {
      title: "GameStore System",
      description: "Sistema de vendas de jogos digitais e físicos focado na aplicação de conceitos avançados de POO, interfaces e polimorfismo em Java.",
      tags: ["Java", "OOP", "Architecture"]
    },
    {
      title: "PitchDev Event Manager", // [cite: 40]
      description: "Aplicativo móvel desenvolvido em Flutter para gerenciamento de eventos. Projeto vencedor de campeonato interno.", // [cite: 41]
      tags: ["Flutter", "Dart", "Mobile"]
    }
  ],
  activities: [
    {
      title: "Mentor Voluntário - DevMenthors", // [cite: 43]
      description: "Orientação e capacitação de estudantes no desenvolvimento de aplicações com Flutter/Dart, traduzindo conceitos complexos.", // [cite: 44, 45]
      icon: Users
    },
    {
      title: "Organizador de Visita Técnica - Tractian",
      description: "Gestão logística e negociação de patrocínios para levar 46 estudantes à sede da Tractian em São Paulo.",
      icon: Users
    },
    {
      title: "Campeão PitchDev", // [cite: 39]
      description: "Vencedor da competição desenvolvendo soluções funcionais sob pressão.", // [cite: 42]
      icon: Trophy
    },
    {
      title: "Mentoria para calouros da UNICAMP", // [cite: 39]
      description: "Auxílio aos calouros da faculdade sobre as matérias e coisas gerais da Unicamp.", // [cite: 42]
      icon: Users
    }
  ],
academic: [
    {
      category: "Iniciação Científica",
      title: "IA na Elicitação de Requisitos - Em andamento",
      role: "Pesquisador/Desenvolvedor",
      description: "Pesquisa focada na ajuda da elicitação de requisitos de software utilizando Processamento de Linguagem Natural (NLP) e Modelos de Linguagem de Grande Escala (LLMs) na entrevista com o cliente.",
      highlights: ["LLMs", "NLP", "Engenharia de Software", "Pesquisa Acadêmica"],
      icon: BrainCircuit,
      action: null // Não tem botão de download
    },
    {
      category: "Extensão & Ensino",
      title: "Workshop: Git & GitHub",
      role: "Idealizador e Instrutor",
      description: "Desenvolvimento e condução de um workshop técnico para novos alunos da universidade. O grande diferencial foi a arquitetura da informação: criei uma apostila completa do zero, traduzindo conceitos de versionamento para uma linguagem acessível.",
      highlights: ["Criação de Material Didático", "Comunicação Técnica", "Mentoria", "Liderança"],
      icon: BookOpen,
      action: {
        type: "download",
        label: "Baixar Apostila",
        fileName: "Apostila-Git-Github-GabrielFelix.pdf"
      }
    }
  ],
};