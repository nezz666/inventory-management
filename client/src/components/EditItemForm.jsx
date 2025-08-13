import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const EditItemForm = ({ item, onUpdateSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: ""
  });

  const username = Cookies.get("username");

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        category: item.category,
        stock: item.stock
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/items/${item._id}`, {
        ...formData,
        createdBy: username
      });
      alert("Item berhasil diupdate ✅");
      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (err) {
      console.error(err);
      alert("Gagal update item ❌");
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-white">Edit Item</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-white">Nama Barang</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-white">Kategori</label>
          <input
            type="text"
            name="category"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-white">Stok</label>
          <input
            type="number"
            name="stock"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">
            Simpan
          </button>
          <button type="button" className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white" onClick={onCancel}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditItemForm;
