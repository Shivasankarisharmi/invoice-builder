function ClientDetails({ invoiceData, setInvoiceData }) {
  const handleChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
        📋 Invoice Details
      </h2>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Invoice Number
          </label>
          <input
            type="text"
            name="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={handleChange}
            placeholder="INV-001"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Invoice Date
          </label>
          <input
            type="date"
            name="invoiceDate"
            value={invoiceData.invoiceDate}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
            From (Your Business)
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Business Name
              </label>
              <input
                type="text"
                name="fromName"
                value={invoiceData.fromName}
                onChange={handleChange}
                placeholder="Your Company Name"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Email
              </label>
              <input
                type="email"
                name="fromEmail"
                value={invoiceData.fromEmail}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Address
              </label>
              <textarea
                name="fromAddress"
                value={invoiceData.fromAddress}
                onChange={handleChange}
                placeholder="Your business address"
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white resize-none"
              />
            </div>
          </div>
        </div>

       
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-green-600 mb-3 uppercase tracking-wide">
            To (Client)
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Client Name
              </label>
              <input
                type="text"
                name="clientName"
                value={invoiceData.clientName}
                onChange={handleChange}
                placeholder="Client Name"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Client Email
              </label>
              <input
                type="email"
                name="clientEmail"
                value={invoiceData.clientEmail}
                onChange={handleChange}
                placeholder="client@example.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Client Address
              </label>
              <textarea
                name="clientAddress"
                value={invoiceData.clientAddress}
                onChange={handleChange}
                placeholder="Client address"
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientDetails