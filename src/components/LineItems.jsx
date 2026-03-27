import { useState } from 'react'

function LineItems({ items, setItems }) {
  const [editingId, setEditingId] = useState(null)

  const emptyItem = {
    id: Date.now(),
    description: '',
    quantity: 1,
    rate: 0,
    amount: 0,
  }

  const [newItem, setNewItem] = useState(emptyItem)


  const handleNewItemChange = (e) => {
    const { name, value } = e.target
    const updated = { ...newItem, [name]: value }
    updated.amount = (parseFloat(updated.quantity) || 0) * (parseFloat(updated.rate) || 0)
    setNewItem(updated)
  }

  
  const handleAddItem = () => {
    if (!newItem.description.trim()) return alert('Please enter a description!')
    setItems([...items, { ...newItem, id: Date.now() }])
    setNewItem({ ...emptyItem, id: Date.now() })
  }

  
  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  
  const handleEditStart = (item) => {
    setEditingId(item.id)
  }

  
  const handleEditChange = (e, id) => {
    const { name, value } = e.target
    setItems(items.map((item) => {
      if (item.id === id) {
        const updated = { ...item, [name]: value }
        updated.amount = (parseFloat(updated.quantity) || 0) * (parseFloat(updated.rate) || 0)
        return updated
      }
      return item
    }))
  }

  
  const handleEditSave = () => {
    setEditingId(null)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
        🛒 Line Items
      </h2>

     
      <div className="hidden sm:grid grid-cols-12 gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-2">
        <div className="col-span-5">Description</div>
        <div className="col-span-2 text-center">Qty</div>
        <div className="col-span-2 text-center">Rate (₹)</div>
        <div className="col-span-2 text-right">Amount (₹)</div>
        <div className="col-span-1"></div>
      </div>

      
      {items.length === 0 && (
        <div className="text-center text-gray-300 py-8 text-sm">
          No items added yet. Add your first item below ⬇️
        </div>
      )}

      {items.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-12 gap-2 items-center mb-2 bg-gray-50 rounded-xl px-2 py-2"
        >
          {editingId === item.id ? (
            <>
             
              <div className="col-span-12 sm:col-span-5">
                <input
                  type="text"
                  name="description"
                  value={item.description}
                  onChange={(e) => handleEditChange(e, item.id)}
                  className="w-full border border-blue-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="col-span-4 sm:col-span-2">
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleEditChange(e, item.id)}
                  className="w-full border border-blue-300 rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="col-span-4 sm:col-span-2">
                <input
                  type="number"
                  name="rate"
                  value={item.rate}
                  onChange={(e) => handleEditChange(e, item.id)}
                  className="w-full border border-blue-300 rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="col-span-3 sm:col-span-2 text-right text-sm font-medium text-gray-700">
                ₹{parseFloat(item.amount).toFixed(2)}
              </div>
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={handleEditSave}
                  className="text-green-500 hover:text-green-700 text-lg"
                  title="Save"
                >✓</button>
              </div>
            </>
          ) : (
            <>
              
              <div className="col-span-12 sm:col-span-5 text-sm text-gray-700 font-medium">
                {item.description}
              </div>
              <div className="col-span-4 sm:col-span-2 text-sm text-gray-500 text-center">
                {item.quantity}
              </div>
              <div className="col-span-4 sm:col-span-2 text-sm text-gray-500 text-center">
                ₹{parseFloat(item.rate).toFixed(2)}
              </div>
              <div className="col-span-3 sm:col-span-2 text-sm font-semibold text-gray-800 text-right">
                ₹{parseFloat(item.amount).toFixed(2)}
              </div>
              <div className="col-span-1 flex justify-end gap-1">
                <button
                  onClick={() => handleEditStart(item)}
                  className="text-blue-400 hover:text-blue-600 text-sm"
                  title="Edit"
                >✏️</button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-400 hover:text-red-600 text-sm"
                  title="Delete"
                >🗑️</button>
              </div>
            </>
          )}
        </div>
      ))}

      
      <div className="mt-4 bg-blue-50 rounded-xl px-2 py-3">
        <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-2 px-1">
          + Add New Item
        </p>
        <div className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-12 sm:col-span-5">
            <input
              type="text"
              name="description"
              value={newItem.description}
              onChange={handleNewItemChange}
              placeholder="Item description"
              className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
          </div>
          <div className="col-span-4 sm:col-span-2">
            <input
              type="number"
              name="quantity"
              value={newItem.quantity}
              onChange={handleNewItemChange}
              placeholder="Qty"
              min="1"
              className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
          </div>
          <div className="col-span-4 sm:col-span-2">
            <input
              type="number"
              name="rate"
              value={newItem.rate}
              onChange={handleNewItemChange}
              placeholder="Rate"
              min="0"
              className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
          </div>
          <div className="col-span-3 sm:col-span-2 text-right text-sm font-semibold text-blue-600">
            ₹{parseFloat(newItem.amount || 0).toFixed(2)}
          </div>
          <div className="col-span-1 flex justify-end">
            <button
              onClick={handleAddItem}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-8 h-8 flex items-center justify-center text-lg font-bold transition"
              title="Add Item"
            >+</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LineItems