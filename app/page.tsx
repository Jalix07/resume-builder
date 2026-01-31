'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaFileAlt, FaPalette, FaDownload, FaCheckCircle } from 'react-icons/fa'
import ResumeEditor from '@/components/ResumeEditor'
import TemplateSelector from '@/components/TemplateSelector'
import ResumePreview from '@/components/ResumePreview'

export default function Home() {
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState('modern')

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              <FaFileAlt className="inline-block mr-2 text-blue-600" />
              Resume Builder
            </h1>
            <a 
              href="https://github.com/Jalix07/resume-builder" 
              target="_blank"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {step === 0 && (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
              Create Your Professional Resume
              <br />
              <span className="text-blue-600">in Minutes</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Choose from 50+ beautiful templates. No sign-up required. Export to PDF for free.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaPalette className="text-4xl text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">50+ Templates</h3>
                <p className="text-gray-600">Professional designs for every industry</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaFileAlt className="text-4xl text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Easy Editing</h3>
                <p className="text-gray-600">Real-time preview as you type</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaDownload className="text-4xl text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">PDF Export</h3>
                <p className="text-gray-600">Download high-quality PDF instantly</p>
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started - It's Free
            </button>
          </motion.div>
        </div>
      )}

      {/* Step Indicator */}
      {step > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-8">
            {[
              { num: 1, label: 'Choose Template' },
              { num: 2, label: 'Edit Content' },
              { num: 3, label: 'Download' },
            ].map((s) => (
              <div key={s.num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s.num
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step > s.num ? <FaCheckCircle /> : s.num}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Template Selection */}
      {step === 1 && (
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onSelectTemplate={setSelectedTemplate}
          onNext={() => setStep(2)}
        />
      )}

      {/* Editor & Preview */}
      {step === 2 && (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ResumeEditor />
            <ResumePreview template={selectedTemplate} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2026 Resume Builder. Made with ❤️ for job seekers worldwide.</p>
            <p className="text-sm">
              Free forever. No credit card required. Privacy-first.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
