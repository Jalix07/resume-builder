import { create } from 'zustand'
import { ResumeData, Experience, Education, Skill } from '@/types/resume'

interface ResumeStore {
  resumeData: ResumeData
  updatePersonalInfo: (data: Partial<ResumeData['personalInfo']>) => void
  addExperience: (experience: Experience) => void
  updateExperience: (id: string, data: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addEducation: (education: Education) => void
  updateEducation: (id: string, data: Partial<Education>) => void
  removeEducation: (id: string) => void
  addSkill: (skill: Skill) => void
  updateSkill: (id: string, data: Partial<Skill>) => void
  removeSkill: (id: string) => void
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: {
    personalInfo: {
      fullName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.com',
      summary:
        'Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about creating scalable applications and leading technical teams.',
    },
    experience: [
      {
        id: '1',
        company: 'Tech Company Inc.',
        position: 'Senior Software Engineer',
        location: 'New York, NY',
        startDate: '2021-01',
        endDate: '',
        current: true,
        description: [
          'Led development of microservices architecture serving 1M+ users',
          'Mentored team of 5 junior developers',
          'Reduced API response time by 40% through optimization',
        ],
      },
      {
        id: '2',
        company: 'Startup XYZ',
        position: 'Full Stack Developer',
        location: 'San Francisco, CA',
        startDate: '2019-03',
        endDate: '2020-12',
        current: false,
        description: [
          'Built React/Node.js applications from scratch',
          'Implemented CI/CD pipelines using GitHub Actions',
          'Collaborated with designers on UI/UX improvements',
        ],
      },
    ],
    education: [
      {
        id: '1',
        school: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        location: 'Boston, MA',
        startDate: '2015-09',
        endDate: '2019-05',
        gpa: '3.8',
      },
    ],
    skills: [
      { id: '1', name: 'JavaScript/TypeScript', level: 5 },
      { id: '2', name: 'React/Next.js', level: 5 },
      { id: '3', name: 'Node.js', level: 4 },
      { id: '4', name: 'Python', level: 4 },
      { id: '5', name: 'SQL/NoSQL', level: 4 },
      { id: '6', name: 'AWS/Azure', level: 3 },
    ],
  },

  updatePersonalInfo: (data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        personalInfo: { ...state.resumeData.personalInfo, ...data },
      },
    })),

  addExperience: (experience) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: [...state.resumeData.experience, experience],
      },
    })),

  updateExperience: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.map((exp) =>
          exp.id === id ? { ...exp, ...data } : exp
        ),
      },
    })),

  removeExperience: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.filter((exp) => exp.id !== id),
      },
    })),

  addEducation: (education) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: [...state.resumeData.education, education],
      },
    })),

  updateEducation: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.map((edu) =>
          edu.id === id ? { ...edu, ...data } : edu
        ),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.filter((edu) => edu.id !== id),
      },
    })),

  addSkill: (skill) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: [...state.resumeData.skills, skill],
      },
    })),

  updateSkill: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.map((skill) =>
          skill.id === id ? { ...skill, ...data } : skill
        ),
      },
    })),

  removeSkill: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.filter((skill) => skill.id !== id),
      },
    })),
}))
