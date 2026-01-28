export const SITE = {
  // Información Personal
  author: 'Cesar Arath Angeles Perez',
  title: 'Portafolio - Cesar Angeles',
  description: 'Portafolio profesional de Cesar Arath Angeles Perez - Ingeniero en Desarrollo y Gestión de Software Multiplataforma',

  // Contacto
  email: 'cesararath1976@gmail.com',
  phone: '+52 7751505705',
  location: 'Tulancingo, Hidalgo',

  // Redes Sociales
  github: 'https://github.com/CesarArathAP',
  linkedin: 'https://linkedin.com/in/cesar-angeles',

  // Hero Section
  hero: {
    title: 'Cesar Arath Angeles Perez',
    subtitle: 'Ingeniero en Desarrollo y Gestión de Software Multiplataforma',
    description: 'Estudiante apasionado por el desarrollo web y móvil, con experiencia en proyectos integradores y hackathons.',
  },

  // Navegación
  nav: [
    { text: 'Inicio', link: '#hero' },
    { text: 'Sobre Mí', link: '#about' },
    { text: 'Proyectos', link: '#projects' },
    { text: 'Habilidades', link: '#skills' },
    { text: 'Contacto', link: '#contact' },
  ],
} as const;

// Proyectos Destacados
export const FEATURED_PROJECTS = [
  {
    title: 'Sistema de Trazabilidad Agrícola',
    description: 'Sistema web para gestión y trazabilidad de productos agrícolas con tecnología blockchain.',
    technologies: ['Laravel', 'MySQL', 'Bootstrap'],
    github: 'https://github.com/CesarArathAP/Integradora',
    year: 2025,
    status: 'Concluido',
  },
  {
    title: 'Menbi - Reconocimiento de Emociones',
    description: 'Aplicación móvil para reconocimiento de emociones mediante IA. Ganador del Hackatón 2024.',
    technologies: ['React Native', 'Firebase', 'TensorFlow'],
    github: 'https://github.com/CesarArathAP/hakathon2023/tree/main',
    year: 2024,
    status: 'Concluido',
    badge: 'Ganador Hackatón 2024',
  },
  {
    title: 'Sistema de Compras - Embotelladora Mayol',
    description: 'Sistema de gestión de compras y proveedores para empresa embotelladora.',
    technologies: ['PHP', 'MySQL', 'JavaScript'],
    github: 'https://github.com/CesarArathAP/Sistema-de-Compras-Mayol',
    year: 2024,
    status: 'Concluido',
  },
  {
    title: 'CleanUp - Gestión de Residuos',
    description: 'Aplicación móvil para gestión y reciclaje de residuos urbanos con gamificación.',
    technologies: ['React Native', 'Firebase', 'Google Maps API'],
    github: 'https://github.com/CesarArathAP/CleanUp',
    year: 2024,
    status: 'En desarrollo',
  },
  {
    title: 'Jobly - Portal de Empleos',
    description: 'Plataforma web para búsqueda y postulación a ofertas laborales.',
    technologies: ['Laravel', 'MySQL', 'Bootstrap'],
    github: 'https://github.com/CesarArathAP/Hackathon2025',
    year: 2023,
    status: 'Concluido',
  },
  {
    title: 'SafeCheckSchool',
    description: 'Sistema de control de acceso escolar con reconocimiento facial.',
    technologies: ['Python', 'OpenCV', 'Flask', 'SQLite'],
    github: 'https://github.com/CesarArathAP/SafecheckSchoolWeb',
    year: 2023,
    status: 'Concluido',
  },
];

// Habilidades
export const SKILLS = {
  languages: ['Java', 'JavaScript', 'Python', 'PHP', 'C#'],
  frameworks: ['React', 'React Native', 'Laravel', 'Node.js', 'Express'],
  databases: ['MySQL', 'SQLite', 'Firebase', 'MongoDB'],
  tools: ['Git/GitHub', 'Docker', 'Postman', 'Figma', 'VS Code'],
  methodologies: ['SCRUM', 'Desarrollo Ágil'],
};

// Educación y Certificaciones
export const EDUCATION = [
  {
    title: 'Ingeniería en Desarrollo y Gestión de Software Multiplataforma',
    institution: 'Universidad Tecnológica de Tulancingo',
    year: '2022 - 2026',
    type: 'education',
  },
  {
    title: 'Profesional Técnico Bachiller en Informática',
    institution: 'Conalep Tulancingo',
    year: '2019 - 2022',
    type: 'education',
  },
];

export const CERTIFICATIONS = [
  { title: 'Python - FreeCodeCamp', year: 2026 },
  { title: 'Responsive Web Design (HTML/CSS) - FreeCodeCamp', year: 2026 },
  { title: 'Learn Prompting - Inteligencia Artificial', year: 2026 },
  { title: 'JavaScript Algorithms - FreeCodeCamp', year: 2025 },
  { title: 'React - FreeCodeCamp', year: 2025 },
  { title: 'Bases de Datos No Relacionales', year: 2024 },
  { title: 'Certificación Cisco', year: 2024 },
];
