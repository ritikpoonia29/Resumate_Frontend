import TEMPLATE_ONE_IMG from '../assets/template-one.png'
import TEMPLATE_TWO_IMG from '../assets/template-two.png'
import TEMPLATE_THREE_IMG from '../assets/template-three.png'

export const resumeTemplates = [
  {
    id:'01',
    thumbnailImg: TEMPLATE_ONE_IMG,
    colorPaletteCode: 'themeOne',
    isPremium: false
  },
  {
    id:'02',
    thumbnailImg: TEMPLATE_TWO_IMG,
    colorPaletteCode: 'themeTwo',
    isPremium: true
  },
  {
    id:'03',
    thumbnailImg: TEMPLATE_THREE_IMG,
    colorPaletteCode: 'themeThree',
    isPremium: true
  }
]

export const themeColorPalette = {
  themeOne: [
    ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],

    ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
    ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#8579D1", "#4B4B5C"],
    ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
    ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
    ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5", "#2D3748"],

    ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"],
    ["#FFF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"],
    ["#F9FCFF", "#E3F0F9", "#C0DDEE", "#6CA6CF", "#46545E"],
    ["#FFFDF6", "#FFF4D7", "#FFE7A0", "#FFD000", "#57534E"],
    ["#EFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#2B3A42"],

    ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
    ["#E3F2FD", "#90CAF9", "#a8d2f4", "#1E88E5", "#0D47A1"],
  ],
  themeTwo: [
    ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
    ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#8579D1", "#4B4B5C"],
    ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
    ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
    ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5", "#2D3748"],
    ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"],
    ["#FFF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"],
    ["#F9FCFF", "#E3F0F9", "#C0DDEE", "#6CA6CF", "#46545E"],
    ["#FFFDF6", "#FFF4D7", "#FFE7A0", "#FFD000", "#57534E"],
    ["#EFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#2B3A42"],
    ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
    ["#E3F2FD", "#90CAF9", "#a8d2f4", "#1E88E5", "#0D47A1"],
  ],
  themeThree: [
    ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#8579D1", "#4B4B5C"],
    ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
    ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
    ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5", "#2D3748"],
    ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"],
    ["#FFF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"],
    ["#F9FCFF", "#E3F0F9", "#C0DDEE", "#6CA6CF", "#46545E"],
    ["#FFFDF6", "#FFF4D7", "#FFE7A0", "#FFD000", "#57534E"],
    ["#EFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#2B3A42"],
    ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
    ["#E3F2FD", "#90CAF9", "#a8d2f4", "#1E88E5", "#0D47A1"],
    ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
  ]
};

export const DUMMY_RESUME_DATA = {
  profileInfo: {
    profileImg: null,
    previewUrl: "",
    fullName: "Ritik Poonia",
    designation: "Associate Software Engineer",
    summary:
      "Passionate and results-driven developer with 8+ years of experience building scalable web applications using modern technologies like Java, JavaScript, Spring Boot, Microservices.",
  },
  contactInfo: {
    email: "ritikpoonia2907@gmail.com",
    phone: "+9199814xxxxx",
    location:'Banglore, India',
    linkedin: "https://linkedin.com/in/ritik-poonia",
    github: "https://github.com/ritikpoonia29",
    website: "https://ritikpoonia.vercel.app/",
  },
  workExperience: [
    {
      company: "Dassault Systemes",
      role: "Associate Software Engineer",
      startDate: "2024-07",
      endDate: "present",
      description:
        "Passionate and results-driven developer with 8+ years of experience building scalable web applications using modern technologies like Java, JavaScript, Spring Boot, Microservices.",
    }
  ],
  education: [
    {
      degree: "Bachelors in Computer Science",
      institution: "KLE Technological University",
      startDate: "2020-07",
      endDate: "2024-07",
    }
  ],
  skills: [
    { name: "Java", progress: 85 },
    { name: "React", progress: 90 },
    { name: "SQL", progress: 75 },
    { name: "Problem Solving", progress: 70 },
    { name: "MongoDB", progress: 75 },
  ],
  projects: [
    {
      title: "ResuMate",
      description:
        "Architected a resume building platform using React, Vite, Tailwind CSS, and Lucide Icons, delivering a modern, responsive UI with live resume preview, customizable templates, theme personalization, intuitive dashboard navigation, and export-ready ATS-optimized resume layouts.",
      github: "https://github.com/ritikpoonia29",
    },
    {
      title: "Lossless Text Compression Using Recurrent Neural Networks",
      description:
        "Pioneered a novel lossless data compression technique by integrating Arithmetic Coding with an advanced RNN-based Encoder-Decoder Architecture. This innovative approach effectively captures complex data patterns and inherent dependencies within input streams.",
      liveDemo: "https://www.sciencedirect.com/science/article/pii/S1877050924009955",
    }
  ],
  certifications: [
    {
      title: "Problem Solving (Intermediate) Certificate",
      issuer: "HackerRank",
      year: "2023",
    },
    {
      title: "Overview of Cloud Computing with Azure",
      issuer: "Microsoft Azure",
      year: "2021",
    },
  ],
  languages: [
    { name: "English", progress: 100 },
    { name: "Hindi", progress: 100 },
  ],
  interests: ["Swimming", "Reading"],
};