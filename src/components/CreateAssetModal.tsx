// CreateAssetModal Component - Allows users to create new assets
// Date: 02/22/2025
// Author: Raihan Hafiz

import { useState } from "react";
import axios from "axios";

// Define the props that CreateAssetModal will receive
interface CreateAssetModalProps {
  onClose: () => void; 
  refreshAssets: () => void;
}

export default function CreateAssetModal({ onClose, refreshAssets }: CreateAssetModalProps) {
  const [formData, setFormData] = useState({
    name: "", 
    description: "", 
    type: "layout",
    tags: "", 
    favorite: false, 
  });

  /**
   * Handles input changes and updates the state
   * Supports both text inputs and dropdown selection
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission
   * Sends a POST request to the backend to create a new asset
   * Converts comma-separated tags into an array
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/assets", {
        ...formData,
        favorite: false, // Ensuring the favorite field is false by default
        tags: formData.tags.split(",").map((tag) => tag.trim()), // Convert comma-separated tags into an array
      });
      refreshAssets(); // Refresh the assets list
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error creating asset:", error);
    }
  };

  return (
    // Modal overlay (closes the modal when clicking outside)
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      
      <div className="bg-white p-6 rounded-lg shadow-md w-96 relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={onClose}>
          ✕
        </button>
        
        <h2 className="text-2xl font-bold mb-4">Create New Asset</h2>

        {/* Form for creating a new asset */}
        <form onSubmit={handleSubmit}>

          {/* Asset Name Input */}
          <input
            type="text"
            name="name"
            placeholder="Asset Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mb-3"
            required
          />

          {/* Description Input */}
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mb-3"
            required
          />

          {/* Dropdown for Type Selection */}
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mb-3 bg-white"
            required
          >
            <option value="layout">Layout</option>
            <option value="kpi">KPI</option>
            <option value="storyboard">Storyboard</option>
          </select>

          {/* Tags Input (comma-separated) */}
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mb-3"
          />

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Create Asset
          </button>

        </form>
      </div>
    </div>
  );
}
