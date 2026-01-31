import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function exportToPDF(element: HTMLElement, fileName: string) {
  try {
    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    })

    // Calculate dimensions
    const imgWidth = 210 // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const imgData = canvas.toDataURL('image/png')
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

    // Download
    pdf.save(`${fileName.replace(/\s+/g, '_')}_Resume.pdf`)

    return true
  } catch (error) {
    console.error('Error exporting PDF:', error)
    return false
  }
}

export function formatDate(dateString: string): string {
  if (!dateString) return ''
  const [year, month] = dateString.split('-')
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}
