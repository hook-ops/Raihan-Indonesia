// AssetCard Component - Displays an individual asset card
// Date: 02/21/2025
// Author: Raihan Hafiz

import axios from "axios";
import { FiPieChart } from "react-icons/fi"; // Importing an icon for the asset card

// Define the props that AssetCard will receive
interface AssetCardProps {
  asset: any; 
  onClick: () => void; 
  isSelected: boolean;
  refreshAssets: () => void;
}

// Functional component for displaying an asset card
export default function AssetCard({ asset, onClick, refreshAssets, isSelected }: AssetCardProps) {

  // Function to handle asset deletion
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); 

    if (!window.confirm("Are you sure you want to delete this asset?")) return; // Confirm before deletion

    try {
      await axios.delete(`/api/assets/${asset._id}`); // Send DELETE request to API
      refreshAssets(); 
    } catch (error) {
      console.error("Error deleting asset:", error); // Log any errors
    }
  };

  return (
    <div
      className={`relative flex items-center bg-gray-100 p-4 rounded shadow cursor-pointer
        ${isSelected ? "border-2 border-red-500" : "bg-gray-100"} // Highlight the card if selected
        hover:shadow-md transition`} 
      onClick={onClick} // Handle asset selection
    >

      {/* Icon Section - Display an icon for the asset */}
      <div className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-lg mr-4">
        <FiPieChart className="text-gray-500 text-xl" /> 
      </div>

      {/* Asset Information - Display name, description, and favorite status */}
      <div className="flex-1">
        <h2 className="text-md font-bold">{asset.name}</h2> 
        <p className="text-sm text-gray-500">{asset.description}</p>
        {asset.favorite && <p className="text-sm text-red-500">❤️ Favorited</p>} 
      </div>

      {/* Delete Button - Allows user to delete the asset */}
      <button
        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition"
        onClick={(e) => {
          e.stopPropagation(); 
          handleDelete(e); // Call delete function
        }}
      >
        Delete
      </button>
    </div>
  );
}
