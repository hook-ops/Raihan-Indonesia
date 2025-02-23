// Single Asset 02/21/2025 Raihan Hafiz
// pages/api/assets/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../utils/dbConnect';
import Asset from '@/models/Assets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const asset = await Asset.findById(id);
        if (!asset) {
          return res.status(404).json({ error: 'Asset not found' });
        }
        return res.status(200).json(asset);
      } catch (err: any) {
        
        return res.status(500).json({ error: err.message });
      }

    case 'POST':
      try {
        const asset = await Asset.findById(id);
        if (!asset) {
          return res.status(404).json({ error: 'Asset not found' });
        }
        const {favorite} = req.body;

        // Ensure 'favorite' field is defined
        if (asset.favorite === undefined) {
          asset.favorite = false; // Set default value if missing
        }

        asset.favorite = !asset.favorite;
        await asset.save();

        console.log("Check favoritevvvv", favorite);
        return res.status(200).json(asset);
      } catch (err: any) {
        
        return res.status(500).json({ error: err.message });
      }

      case 'PUT':
        try {
          const asset = await Asset.findById(id);
          if (!asset) {
              return res.status(404).json({ error: "Asset not found" });
          }
  
          // Toggle the favorite field
          const updatedAsset = await Asset.findByIdAndUpdate(
              id,
              { $set: { favorite: !asset.favorite } }, // Flip the current value
              { new: true } // Return the updated document
          );
  
          return res.status(200).json({ success: true, asset: updatedAsset });
        } catch (err: any) {
          return res.status(500).json({ error: err.message });
        }
      

    case 'DELETE':
      try {
        await Asset.findByIdAndDelete(id);
        return res.status(204).end();
      } catch (err: any) {
        return res.status(500).json({ error: err.message });
      }

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
