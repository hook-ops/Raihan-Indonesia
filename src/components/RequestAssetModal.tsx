import { useState } from "react";
import axios from "axios";

interface RequestAssetModalProps {
  onClose: () => void;
  refreshAssets: () => void;
}

export default function RequestAssetModal({ onClose, refreshAssets }: RequestAssetModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "layout",
    tags: "",
    favorite: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/assets", {
        ...formData,
        favorite: false,
        tags: formData.tags.split(",").map((tag) => tag.trim()), // Convert comma-separated tags to array
      });
      refreshAssets(); // Refresh the assets list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error creating asset:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-md w-96 relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={onClose}>
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Request Access</h2>
        <form onSubmit={handleSubmit}>
          
          <textarea
          
            name="description"
            placeholder="Description"
            defaultValue={formData.description}
            rows={4}
            // onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mb-3"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Request Access
          </button>
        </form>
      </div>
    </div>
  );
}
