'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import { FaPlus, FaTrash } from 'react-icons/fa'

export default function ResumeEditor() {
  const { resumeData, updatePersonalInfo, addExperience, removeExperience } = useResumeStore()
  const [activeTab, setActiveTab] = useState('personal')

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Your Resume</h2>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Personal Info Tab */}
      {activeTab === 'personal' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={resumeData.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={resumeData.personalInfo.location}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professional Summary
            </label>
            <textarea
              value={resumeData.personalInfo.summary}
              onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Experience Tab */}
      {activeTab === 'experience' && (
        <div className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg">Experience {index + 1}</h3>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={exp.company}
                  placeholder="Company Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  value={exp.position}
                  placeholder="Position"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="month"
                    value={exp.startDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="month"
                    value={exp.endDate}
                    disabled={exp.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <textarea
                  value={exp.description.join('\n')}
                  placeholder="Key achievements (one per line)"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          ))}

          <button
            onClick={() =>
              addExperience({
                id: Date.now().toString(),
                company: '',
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: [],
              })
            }
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center"
          >
            <FaPlus className="mr-2" /> Add Experience
          </button>
        </div>
      )}

      {/* Education & Skills tabs would go here */}
      {activeTab === 'education' && (
        <div className="text-center text-gray-500 py-8">
          Education section - Similar structure to Experience
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="text-center text-gray-500 py-8">
          Skills section - Tag input with proficiency levels
        </div>
      )}
    </div>
  )
}
