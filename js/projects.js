/*
 * Estudos de caso exibidos no modal de cada projeto.
 * Tudo aqui veio do currículo, do LinkedIn, do portfólio antigo e das imagens enviadas. Nada foi inventado.
 *
 * Campos vazios ('' ou []) não aparecem no site. Vale completar com o que só você sabe:
 *   decisions → por que escolheu X e não Y
 *   learned   → o que deu errado, o que mudaria, o que aprendeu
 *   evidence  → testes com usuários, métricas, feedback
 * coverPosition (opcional) → qual parte da foto aparece quando ela é cortada (CSS object-position)
 */
window.PROJECTS = {
  'profit': {
    kicker: 'Empresa · sócio',
    title: 'Profit: a empresa que nasceu dos nossos hackathons',
    summary: 'A Profit desenvolve software, automações e produtos digitais para transformar desafios operacionais de empresas em soluções úteis, personalizadas e preparadas para evoluir.',
    cover: 'assets/images/siteProfit/01_inicio.jpg',
    coverPosition: 'left top',
    context: 'Uma empresa que toco com amigos: Felipe Terossi, Kenzo Osako, Arthur Miele, Hyago Sampaio e eu. Sou um dos sócios. A Profit nasceu dos hackathons: foi trabalhando juntos neles que vimos como os nossos perfis se complementam.',
    problem: '',
    approach: [
      'Hackathon WeHandle (julho): uma proposta tecnológica construída em equipe, com análise, engenharia e visão de negócio. Os detalhes são confidenciais.',
      'Hackathon Hack2L (agosto): uma plataforma com trilhas, quizzes e simulações de negociação por voz com IA, para treinar equipes de cobrança.',
      'Depois dos hackathons: software e automações sob medida, começando pelo problema da operação de cada cliente.'
    ],
    challenge: '',
    role: 'Sócio. Atuo no desenvolvimento das soluções junto com o time.',
    result: 'Campeões do Hackathon WeHandle e destaque em oratória no Hackathon Hack2L.',
    decisions: [],
    learned: [],
    evidence: [],
    stack: ['Desenvolvimento web', 'Automação', 'IA', 'Produto digital'],
    gallery: [
      'assets/images/siteProfit/17_sobre_equipe.jpg',
      'assets/images/siteProfit/23_case_wehandle_fotos.jpg'
    ],
    links: [
      { label: 'Ver o site da Profit', href: 'https://profitsolucoes.vercel.app/' },
      { label: 'Case: Hackathon WeHandle', href: 'https://profitsolucoes.vercel.app/cases/hackathon-wehandle' },
      { label: 'Case: treinamento em cobrança com IA', href: 'https://profitsolucoes.vercel.app/cases/treinamento-ia-cobranca' }
    ]
  },

  'agente-requisitos': {
    kicker: 'Iniciação Científica · CNPq · 2026, em andamento',
    title: 'PolarisAI: um agente de IA que entrevista usuários para levantar requisitos',
    summary: 'Pesquisa sobre a capacidade de modelos de IA atuarem como entrevistadores durante a elicitação de requisitos, coletando informações de forma mais estruturada, completa e eficiente.',
    cover: 'assets/images/projects/agente-requisitos/ICinterface02.png',
    coverPosition: 'left top',
    context: 'Projeto de Iniciação Científica na Unicamp, com bolsa do CNPq, orientado pelos professores Plinio Vilela e Pedro Ivo Garcia Nunes. Começou como uma ideia minha antes de virar pesquisa.',
    problem: 'Entrevistas de requisitos costumam gerar respostas vagas, que viram requisitos ambíguos ou incompletos. A pergunta da pesquisa é se uma IA consegue conduzir essa conversa e chegar a especificações melhores.',
    approach: [
      'O usuário descreve o sistema num briefing e o agente conduz a entrevista, turno a turno.',
      'A cada turno, os requisitos extraídos aparecem ao vivo, com a origem (dito pelo usuário ou inferido pela IA) e a prioridade MoSCoW (Must, Should, Could, Won\'t).',
      'O processo segue as etapas Elicitação, Simulador, Revisão e Documento, e os requisitos podem ser exportados em Markdown.',
      'Por baixo: APIs de LLM, engenharia de prompts, RAG e uma arquitetura Just-in-Time (JIT).',
      'Validação seguindo a norma ISO/IEC/IEEE 29148, com os datasets PURE e PROMISE e o projeto DigitalHome como estudo de caso.'
    ],
    challenge: 'Medir a qualidade da abstração e a completude dos requisitos ao longo de toda a interação entre a IA e o usuário, e não só no resultado final.',
    role: 'Desenvolvimento da solução, engenharia de prompts, interface e avaliação experimental.',
    result: 'Em andamento. A interface já conduz entrevistas completas e gera a lista de requisitos priorizada.',
    decisions: [],
    learned: [],
    evidence: [],
    stack: ['Python', 'LLM APIs', 'RAG', 'Prompt Engineering', 'JIT', 'ISO/IEC/IEEE 29148'],
    gallery: [
      'assets/images/projects/agente-requisitos/ICinterface.png'
    ],
    links: [
      { label: 'Demonstração no LinkedIn', href: 'https://www.linkedin.com/in/gabriel-morais-felix-017152286/recent-activity/all/' }
    ]
  },

  'redes-complexas': {
    kicker: 'Pesquisa · Unicamp FCA · 2025',
    title: 'O mapa da pesquisa em engenharia da FCA, como uma rede',
    summary: 'Modelei as relações entre docentes e áreas de pesquisa da FCA/Unicamp como uma rede complexa, para apoiar decisões institucionais. O trabalho virou pôster num congresso da Unicamp.',
    cover: 'assets/images/projects/redes-complexas/redes01.jpg',
    coverPosition: 'center 22%',
    context: 'Projeto de pesquisa na Faculdade de Ciências Aplicadas (FCA) da Unicamp, em 2025.',
    problem: 'Entender como docentes e áreas de pesquisa se conectam, para que a instituição saiba onde investir e o que fortalecer.',
    approach: [
      'Scripts de extração e tratamento dos dados com pandas.',
      'Modelagem do grafo (docentes × áreas) e análise com igraph.',
      'Detecção de comunidades com o algoritmo Leiden, para encontrar grupos e padrões na rede.'
    ],
    challenge: '',
    role: 'Pesquisador responsável pela modelagem do grafo e pelos scripts de extração, processamento e análise.',
    result: 'Identificação de áreas de pesquisa com potencial de investimento e fortalecimento acadêmico. Os resultados foram apresentados em pôster.',
    decisions: [],
    learned: [],
    evidence: [],
    stack: ['Python', 'pandas', 'igraph', 'Leiden'],
    gallery: [
      'assets/images/projects/redes-complexas/redes02.jpg'
    ],
    links: []
  },

  'workshop-git': {
    kicker: 'Ensino · CDI · 2026',
    title: 'Workshop de Git & GitHub para calouros',
    summary: 'Um workshop para os calouros de TI da Unicamp, com uma apostila escrita do zero para quem está começando ter onde consultar depois.',
    cover: 'assets/images/workshopCDI/WorkshopCDI03.jpeg',
    coverPosition: 'center 40%',
    context: 'Organizado pela CDI e ministrado por mim e pelo Rafael Suetsugu para quem estava entrando em TI na Unicamp.',
    problem: '',
    approach: [
      'O fluxo de estados dos arquivos, antes dos comandos.',
      'Os comandos do dia a dia, a criação e a organização de projetos.',
      'Dicas para montar um bom perfil no GitHub.',
      'Uma apostila de apoio que traduz os conceitos de versionamento para uma linguagem acessível.'
    ],
    challenge: '',
    role: 'Idealizador e instrutor do workshop, e autor da apostila.',
    result: 'A apostila continua disponível para download, para quem quiser rever o conteúdo.',
    decisions: [],
    learned: [],
    evidence: [],
    stack: ['Git', 'GitHub', 'Material didático', 'Comunicação técnica'],
    gallery: [
      'assets/images/workshopCDI/workshopCDI02.jpeg',
      'assets/images/workshopCDI/workshopCDI.jpeg'
    ],
    links: [
      { label: 'Baixar a apostila (PDF)', href: 'assets/docs/apostila-git-github.pdf', download: true }
    ]
  },

  'visita-tractian': {
    kicker: 'Comunidade · TRACTIAN · 2026',
    title: 'Levar 46 estudantes da Unicamp para dentro da TRACTIAN',
    summary: 'Uma visita técnica à sede da TRACTIAN em São Paulo, para conhecer de perto como a empresa constrói IA para a indústria.',
    cover: 'assets/images/tractianPictures/tractianPicture03.jpg',
    coverPosition: 'center 62%',
    context: 'Um ano antes, nosso grupo tinha participado do hackathon da TRACTIAN. A visita nasceu dos próprios alunos e foi organizada por mim, Hyago Sampaio, Arthur Malveste, Kenzo Osako e Rafael Suetsugu.',
    problem: 'O que era um convite para 5 pessoas cresceu para quase 50 interessados, e isso exigia organizar transporte, custos e agenda.',
    approach: [
      'Gestão da logística da viagem até São Paulo.',
      'Negociação de patrocínios para viabilizar a ida do grupo.',
      'Alinhamento da programação com a TRACTIAN: palestras, networking e visita à sede.'
    ],
    challenge: '',
    role: 'Um dos organizadores, responsável por logística e patrocínios.',
    result: '46 estudantes visitaram a sede, assistiram a palestras sobre IA para a indústria e conversaram com o time da empresa.',
    decisions: [],
    learned: [],
    evidence: [],
    stack: ['Organização de eventos', 'Negociação', 'Liderança'],
    gallery: [
      'assets/images/tractianPictures/tractianPicture.jpg',
      'assets/images/tractianPictures/tractianPicture02.jpg'
    ],
    links: []
  }
};
