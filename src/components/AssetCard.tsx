// AssetCard 02/21/2025 Raihan Hafiz
import axios from "axios";
import { FiPieChart } from "react-icons/fi"; 

interface AssetCardProps {
    asset: any;     // in real projects, define a proper Type/Interface
    onClick: () => void;
    isSelected: boolean;
    refreshAssets: () => void;
  }
  
  export default function AssetCard({ asset, onClick, refreshAssets, isSelected }: AssetCardProps) {
    const handleDelete = async (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent opening the modal when clicking delete
      if (!window.confirm("Are you sure you want to delete this asset?")) return;
      
      try {
        await axios.delete(`/api/assets/${asset._id}`);
        refreshAssets(); // Refresh asset list
      } catch (error) {
        console.error("Error deleting asset:", error);
      }
    };
    return (
      // <div
      //   className="relative bg-white p-4 rounded shadow cursor-pointer hover:shadow-md transition"
      //   onClick={onClick}

      // >

      //   {/* Icon Box */}
      // <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg mr-4">
      //   <FiPieChart className="text-gray-500 text-xl" />
      // </div>

      // <div className="flex-1">
      //   <h2 className="text-lg font-bold">{asset.name}</h2>
      //   <p className="text-sm text-gray-500">{asset.description}</p>
      //   <p className="text-sm text-gray-500">{asset.favorite?"❤️ Favorited" : ""}</p>
      //   {/* <p className="text-xs text-gray-400 mt-2">
      //     Created: {new Date(asset.date).toLocaleDateString()}
      //   </p> */}
      // </div>
      // <button
      // className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition"
      // onClick={handleDelete}
      // >
      // Delete
      // </button>
      // </div>

      <div
      className={`relative  flex items-center bg-gray-100 p-4 rounded shadow cursor-pointer
        ${
          isSelected ? " border-2 border-red-500" : "bg-gray-100"
        } hover:shadow-md transition`}
      onClick={onClick}
    >
      {/* Icon Box */}
      <div className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-lg mr-4">
        <FiPieChart className="text-gray-500 text-xl" />
      </div>

      {/* Asset Info */}
      <div className="flex-1">
        <h2 className="text-md font-bold">{asset.name}</h2>
        <p className="text-sm text-gray-500">{asset.description}</p>
        {asset.favorite && <p className="text-sm text-red-500">❤️ Favorited</p>}
      </div>

      {/* Delete Button */}
      {/* <button
        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition"
        onClick={(e) => {
          e.stopPropagation(); // Prevents triggering onClick for asset selection
          handleDelete(e);
        }}
      >
        Delete
      </button> */}
    </div>
    );
  }