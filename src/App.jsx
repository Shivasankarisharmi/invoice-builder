import { useState, useEffect } from 'react'
import ClientDetails from './components/ClientDetails'
import LineItems from './components/LineItems'
import InvoicePreview from './components/InvoicePreview'
import ExportButton from './components/ExportButton'

const defaultInvoiceData = {
  invoiceNumber: 'INV-001',
  invoiceDate: new Date().toISOString().split('T')[0],
  fromName: '',
  fromEmail: '',
  fromAddress: '',
  clientName: '',
  clientEmail: '',
  clientAddress: '',
}

function App() {
 
  const [invoiceData, setInvoiceData] = useState(() => {
    try {
      const saved = localStorage.getItem('invoiceData')
      return saved ? JSON.parse(saved) : defaultInvoiceData
    } catch {
      return defaultInvoiceData
    }
  })

  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('invoiceItems')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [activeTab, setActiveTab] = useState('edit')

  
  useEffect(() => {
    localStorage.setItem('invoiceData', JSON.stringify(invoiceData))
  }, [invoiceData])

 
  useEffect(() => {
    localStorage.setItem('invoiceItems', JSON.stringify(items))
  }, [items])

  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0)
  const taxRate = 18
  const tax = (subtotal * taxRate) / 100
  const grandTotal = subtotal + tax

  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the invoice? All data will be cleared.')) {
      setInvoiceData(defaultInvoiceData)
      setItems([])
      setActiveTab('edit')
      localStorage.removeItem('invoiceData')
      localStorage.removeItem('invoiceItems')
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#eef2f7' }}>

     
      <div
        id="main-header"
        className="no-print bg-white border-b border-gray-200 px-6 py-4 shadow-sm"
      >
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <div className="w-24" />
          <h1 className="text-2xl font-bold text-blue-600">🧾 Invoice Builder</h1>
          <div className="w-24 flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-red-400 hover:text-red-600 font-medium border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

   
      <div className="max-w-4xl mx-auto px-4 py-8">

      
        <div className="flex gap-2 mb-6 no-print">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
              activeTab === 'edit'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            ✏️ Edit Invoice
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            👁️ Preview & Export
          </button>
        </div>

        
        {activeTab === 'edit' && (
          <div key="edit-tab">
            <ClientDetails
              invoiceData={invoiceData}
              setInvoiceData={setInvoiceData}
            />
            <LineItems items={items} setItems={setItems} />

            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
                💰 Summary
              </h2>
              <div className="flex flex-col items-end gap-2 text-sm">
                <div className="flex justify-between w-full sm:w-72">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-700">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between w-full sm:w-72">
                  <span className="text-gray-500">Tax ({taxRate}%)</span>
                  <span className="font-medium text-gray-700">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between w-full sm:w-72 border-t border-gray-200 pt-2 mt-1">
                  <span className="text-base font-bold text-gray-800">Grand Total</span>
                  <span className="text-base font-bold text-blue-600">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

           
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-sm transition cursor-pointer"
            >
              👁️ Preview Invoice →
            </button>
          </div>
        )}

       
        {activeTab === 'preview' && (
          <div key="preview-tab">
            <div className="no-print">
              <ExportButton
                invoiceData={invoiceData}
                items={items}
                subtotal={subtotal}
                tax={tax}
                taxRate={taxRate}
                grandTotal={grandTotal}
              />
            </div>
            <InvoicePreview
              invoiceData={invoiceData}
              items={items}
              subtotal={subtotal}
              tax={tax}
              taxRate={taxRate}
              grandTotal={grandTotal}
            />
          </div>
        )}

      </div>
    </div>
  )
}

export default App