const InvoicePreview = ({ invoiceData, items, subtotal, tax, taxRate, grandTotal }) => {
  return (
    <div
      id="invoice-preview"
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6"
    >
      
      <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-600 mb-1">INVOICE</h1>
          <p className="text-sm text-gray-400">#{invoiceData.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-600">Date: </span>
            {invoiceData.invoiceDate}
          </p>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">From</p>
          <p className="font-semibold text-gray-800">{invoiceData.fromName || '—'}</p>
          <p className="text-sm text-gray-500">{invoiceData.fromEmail || '—'}</p>
          <p className="text-sm text-gray-500 whitespace-pre-line">{invoiceData.fromAddress || '—'}</p>
        </div>
        <div className="sm:text-right">
          <p className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2">Bill To</p>
          <p className="font-semibold text-gray-800">{invoiceData.clientName || '—'}</p>
          <p className="text-sm text-gray-500">{invoiceData.clientEmail || '—'}</p>
          <p className="text-sm text-gray-500 whitespace-pre-line">{invoiceData.clientAddress || '—'}</p>
        </div>
      </div>

      
      <div className="mb-6">
        <div className="grid grid-cols-12 gap-2 text-xs font-bold text-white bg-blue-500 rounded-xl px-4 py-2 mb-2">
          <div className="col-span-5">Description</div>
          <div className="col-span-2 text-center">Qty</div>
          <div className="col-span-2 text-center">Rate</div>
          <div className="col-span-3 text-right">Amount</div>
        </div>

        {items.length === 0 ? (
          <p className="text-center text-gray-300 py-6 text-sm">No items added.</p>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-12 gap-2 px-4 py-2 text-sm rounded-lg ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <div className="col-span-5 text-gray-700">{item.description}</div>
              <div className="col-span-2 text-center text-gray-500">{item.quantity}</div>
              <div className="col-span-2 text-center text-gray-500">₹{parseFloat(item.rate).toFixed(2)}</div>
              <div className="col-span-3 text-right font-medium text-gray-800">
                ₹{parseFloat(item.amount).toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>

      
      <div className="flex justify-end">
        <div className="w-full sm:w-72 bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span className="font-medium text-gray-700">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Tax ({taxRate}%)</span>
            <span className="font-medium text-gray-700">₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2 mt-1">
            <span className="font-bold text-gray-800 text-base">Grand Total</span>
            <span className="font-bold text-blue-600 text-base">₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

     
      <div className="mt-8 pt-4 border-t border-gray-100 text-center text-xs text-gray-300">
        Thank you for your business! 🙏
      </div>
    </div>
  )
}

export default InvoicePreview