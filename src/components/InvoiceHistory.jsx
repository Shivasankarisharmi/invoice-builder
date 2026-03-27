import ExportButton from './ExportButton'
import { useState } from 'react'

function InvoiceHistory({ history, onLoad, onDelete }) {
  const [expandedId, setExpandedId] = useState(null)

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="text-5xl mb-4">🕒</div>
        <h3 className="text-lg font-semibold text-gray-500 mb-2">No Invoice History Yet</h3>
        <p className="text-sm text-gray-400">
          Go to <span className="font-medium text-blue-500">Edit Invoice</span> tab, fill your invoice details and click{' '}
          <span className="font-medium text-green-500">💾 Save to History</span> to record it here.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          🕒 Invoice History
          <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {history.length} invoice{history.length > 1 ? 's' : ''}
          </span>
        </h2>
      </div>

      <div className="space-y-4">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
           
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 gap-3">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-600 font-bold text-sm px-3 py-1.5 rounded-xl">
                  #{entry.invoiceData.invoiceNumber}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {entry.invoiceData.clientName || 'No Client Name'}
                  </p>
                  <p className="text-xs text-gray-400">
                    Invoice Date: {entry.invoiceData.invoiceDate} &nbsp;|&nbsp;
                    Saved: {new Date(entry.savedAt).toLocaleDateString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="text-right">
                  <p className="text-xs text-gray-400">Grand Total</p>
                  <p className="font-bold text-blue-600 text-base">₹{entry.grandTotal.toFixed(2)}</p>
                </div>

            
                <button
                  type="button"
                  onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium px-3 py-1.5 rounded-lg transition cursor-pointer"
                >
                  {expandedId === entry.id ? '🔼 Hide' : '🔽 View'}
                </button>

             
                <button
                  type="button"
                  onClick={() => onLoad(entry)}
                  className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-3 py-1.5 rounded-lg transition cursor-pointer"
                >
                  ✏️ Edit
                </button>

             
                <button
                  type="button"
                  onClick={() => onDelete(entry.id)}
                  className="text-xs bg-red-50 hover:bg-red-100 text-red-500 font-medium px-3 py-1.5 rounded-lg transition cursor-pointer"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>

        
            {expandedId === entry.id && (
              <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">

         
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">From</p>
                    <p className="text-sm font-semibold text-gray-700">{entry.invoiceData.fromName || '—'}</p>
                    <p className="text-xs text-gray-500">{entry.invoiceData.fromEmail || '—'}</p>
                    <p className="text-xs text-gray-500 whitespace-pre-line">{entry.invoiceData.fromAddress || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-green-500 uppercase tracking-widest mb-1">Bill To</p>
                    <p className="text-sm font-semibold text-gray-700">{entry.invoiceData.clientName || '—'}</p>
                    <p className="text-xs text-gray-500">{entry.invoiceData.clientEmail || '—'}</p>
                    <p className="text-xs text-gray-500 whitespace-pre-line">{entry.invoiceData.clientAddress || '—'}</p>
                  </div>
                </div>

             
                <div className="mb-4">
                  <div className="grid grid-cols-12 gap-2 text-xs font-bold text-white bg-blue-500 rounded-xl px-3 py-2 mb-1">
                    <div className="col-span-5">Description</div>
                    <div className="col-span-2 text-center">Qty</div>
                    <div className="col-span-2 text-center">Rate</div>
                    <div className="col-span-3 text-right">Amount</div>
                  </div>
                  {entry.items.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-3">No items</p>
                  ) : (
                    entry.items.map((item, index) => (
                      <div
                        key={item.id}
                        className={`grid grid-cols-12 gap-2 px-3 py-2 text-xs rounded-lg ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                        }`}
                      >
                        <div className="col-span-5 text-gray-700">{item.description}</div>
                        <div className="col-span-2 text-center text-gray-500">{item.quantity}</div>
                        <div className="col-span-2 text-center text-gray-500">₹{parseFloat(item.rate).toFixed(2)}</div>
                        <div className="col-span-3 text-right font-medium text-gray-800">₹{parseFloat(item.amount).toFixed(2)}</div>
                      </div>
                    ))
                  )}
                </div>

               
                <div className="flex justify-end mb-4">
                  <div className="w-full sm:w-64 space-y-1 text-xs">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>₹{entry.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Tax ({entry.taxRate}%)</span>
                      <span>₹{entry.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-1 font-bold text-gray-800 text-sm">
                      <span>Grand Total</span>
                      <span className="text-blue-600">₹{entry.grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

              
                <ExportButton
                  invoiceData={entry.invoiceData}
                  items={entry.items}
                  subtotal={entry.subtotal}
                  tax={entry.tax}
                  taxRate={entry.taxRate}
                  grandTotal={entry.grandTotal}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default InvoiceHistory