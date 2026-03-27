import { useState } from 'react'
import jsPDF from 'jspdf'

function ExportButton({ invoiceData, items, subtotal, tax, taxRate, grandTotal }) {
  const [loading, setLoading] = useState(false)

  const handleExport = () => {
    setLoading(true)

    try {
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pageWidth = pdf.internal.pageSize.getWidth()
      let y = 20

      
      pdf.setFillColor(37, 99, 235)
      pdf.rect(0, 0, pageWidth, 20, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('INVOICE', 14, 9)
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Invoice No: ${invoiceData.invoiceNumber || 'INV-001'}`, 14, 16)
      pdf.text(`Date: ${invoiceData.invoiceDate || ''}`, pageWidth - 14, 16, { align: 'right' })

      y = 28
            
      pdf.setFillColor(245, 247, 250)
      pdf.rect(14, y, 82, 30, 'F')
      pdf.rect(114, y, 82, 30, 'F')

      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(37, 99, 235)
      pdf.text('FROM', 18, y + 6)
      pdf.setTextColor(22, 163, 74)
      pdf.text('BILL TO', 118, y + 6)

      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(10)
      pdf.setTextColor(30, 30, 30)
      pdf.text(invoiceData.fromName || '—', 18, y + 13)
      pdf.text(invoiceData.clientName || '—', 118, y + 13)

      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(9)
      pdf.setTextColor(100, 100, 100)
      pdf.text(invoiceData.fromEmail || '', 18, y + 19)
      pdf.text(invoiceData.clientEmail || '', 118, y + 19)

      const fromAddr = invoiceData.fromAddress || ''
      const clientAddr = invoiceData.clientAddress || ''
      pdf.text(fromAddr.substring(0, 35), 18, y + 25)
      pdf.text(clientAddr.substring(0, 35), 118, y + 25)

      y += 38

     
      pdf.setFillColor(37, 99, 235)
      pdf.rect(14, y, pageWidth - 28, 9, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Description', 18, y + 6)
      pdf.text('Qty', 110, y + 6, { align: 'center' })
      pdf.text('Rate', 145, y + 6, { align: 'center' })
      pdf.text('Amount', pageWidth - 18, y + 6, { align: 'right' })

      y += 9

      
      if (items.length === 0) {
        pdf.setTextColor(150, 150, 150)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(9)
        pdf.text('No items added.', pageWidth / 2, y + 7, { align: 'center' })
        y += 12
      } else {
        items.forEach((item, index) => {
          if (index % 2 === 0) {
            pdf.setFillColor(248, 250, 252)
            pdf.rect(14, y, pageWidth - 28, 9, 'F')
          }
          pdf.setTextColor(50, 50, 50)
          pdf.setFont('helvetica', 'normal')
          pdf.setFontSize(9)
          pdf.text(String(item.description || ''), 18, y + 6)
          pdf.text(String(item.quantity || ''), 110, y + 6, { align: 'center' })
          pdf.text(`Rs.${parseFloat(item.rate || 0).toFixed(2)}`, 145, y + 6, { align: 'center' })
          pdf.text(`Rs.${parseFloat(item.amount || 0).toFixed(2)}`, pageWidth - 18, y + 6, { align: 'right' })
          y += 9
        })
      }

      y += 6

      
      pdf.setDrawColor(220, 220, 220)
      pdf.line(pageWidth - 90, y, pageWidth - 14, y)
      y += 6

      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(100, 100, 100)
      pdf.text('Subtotal', pageWidth - 90, y)
      pdf.text(`Rs.${subtotal.toFixed(2)}`, pageWidth - 14, y, { align: 'right' })
      y += 7

      pdf.text(`Tax (${taxRate}%)`, pageWidth - 90, y)
      pdf.text(`Rs.${tax.toFixed(2)}`, pageWidth - 14, y, { align: 'right' })
      y += 4

      pdf.setDrawColor(220, 220, 220)
      pdf.line(pageWidth - 90, y, pageWidth - 14, y)
      y += 6

      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(11)
      pdf.setTextColor(30, 30, 30)
      pdf.text('Grand Total', pageWidth - 90, y)
      pdf.setTextColor(37, 99, 235)
      pdf.text(`Rs.${grandTotal.toFixed(2)}`, pageWidth - 14, y, { align: 'right' })

      y += 16

      
      pdf.setDrawColor(220, 220, 220)
      pdf.line(14, y, pageWidth - 14, y)
      y += 6
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(8)
      pdf.setTextColor(150, 150, 150)
      pdf.text('Thank you for your business!', pageWidth / 2, y, { align: 'center' })

      pdf.save(`${invoiceData.invoiceNumber || 'invoice'}.pdf`)

    } catch (err) {
      console.error('PDF export error:', err)
      alert(`PDF export failed: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => window.print()

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      <button
        type="button"
        onClick={handleExport}
        disabled={loading}
        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? '⏳ Generating PDF...' : '📥 Download PDF'}
      </button>
      <button
        type="button"
        onClick={handlePrint}
        className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl shadow-sm border border-gray-200 transition flex items-center justify-center gap-2 cursor-pointer"
      >
        🖨️ Print Invoice
      </button>
    </div>
  )
}

export default ExportButton