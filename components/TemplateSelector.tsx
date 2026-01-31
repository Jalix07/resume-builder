'use client'

import { motion } from 'framer-motion'
import { Template } from '@/types/resume'

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (templateId: string) => void
  onNext: () => void
}

const templates: Template[] = [
  { id: 'modern', name: 'Modern', thumbnail: '/templates/modern.png', isPremium: false },
  { id: 'professional', name: 'Professional', thumbnail: '/templates/pro.png', isPremium: false },
  { id: 'creative', name: 'Creative', thumbnail: '/templates/creative.png', isPremium: false },
  { id: 'minimal', name: 'Minimal', thumbnail: '/templates/minimal.png', isPremium: false },
  { id: 'executive', name: 'Executive', thumbnail: '/templates/exec.png', isPremium: true },
  { id: 'tech', name: 'Tech', thumbnail: '/templates/tech.png', isPremium: false },
]

export default function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
  onNext,
}: TemplateSelectorProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Template</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative cursor-pointer rounded-lg overflow-hidden shadow-lg ${
              selectedTemplate === template.id ? 'ring-4 ring-blue-600' : ''
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="aspect-[8.5/11] bg-white p-4 border-2 border-gray-200">
              <div className="text-center">
                <div className="h-3 bg-gray-300 rounded mb-2"></div>
                <div className="h-2 bg-gray-200 rounded mb-4 w-2/3 mx-auto"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded"></div>
                  <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-2 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-3">
              <h3 className="font-semibold text-center">{template.name}</h3>
              {template.isPremium && (
                <span className="text-xs text-yellow-600">⭐ Premium</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Continue with {templates.find((t) => t.id === selectedTemplate)?.name} Template
        </button>
      </div>
    </div>
  )
}
