'use client'

import { useRef } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import { FaDownload } from 'react-icons/fa'
import { exportToPDF } from '@/utils/pdfExport'

interface ResumePreviewProps {
  template: string
}

export default function ResumePreview({ template }: ResumePreviewProps) {
  const { resumeData } = useResumeStore()
  const resumeRef = useRef<HTMLDivElement>(null)

  const handleExport = async () => {
    if (resumeRef.current) {
      await exportToPDF(resumeRef.current, resumeData.personalInfo.fullName)
    }
  }

  return (
    <div className="sticky top-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Preview</h2>
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
          >
            <FaDownload className="mr-2" /> Export PDF
          </button>
        </div>

        {/* Resume Preview */}
        <div
          ref={resumeRef}
          className="border border-gray-300 bg-white p-8 aspect-[8.5/11] overflow-auto"
          style={{ fontSize: '12px' }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">
              {resumeData.personalInfo.fullName}
            </h1>
            <div className="text-sm text-gray-600 space-x-2">
              <span>{resumeData.personalInfo.email}</span>
              <span>•</span>
              <span>{resumeData.personalInfo.phone}</span>
              <span>•</span>
              <span>{resumeData.personalInfo.location}</span>
            </div>
            {resumeData.personalInfo.linkedin && (
              <div className="text-sm text-blue-600 mt-1">
                {resumeData.personalInfo.linkedin}
              </div>
            )}
          </div>

          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-sm">{resumeData.personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-3">
                EXPERIENCE
              </h2>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{exp.position}</h3>
                      <div className="text-sm italic">{exp.company}</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    {exp.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-3">
                EDUCATION
              </h2>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold">
                        {edu.degree} in {edu.field}
                      </h3>
                      <div className="text-sm">{edu.school}</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  {edu.gpa && (
                    <div className="text-sm mt-1">GPA: {edu.gpa}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-3">
                SKILLS
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="text-sm">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-600 ml-2">
                      {'★'.repeat(skill.level)}
                      {'☆'.repeat(5 - skill.level)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
