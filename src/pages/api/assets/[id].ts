// Single Asset API Route - Handles operations for individual assets
// Date: 02/21/2025
// Author: Raihan Hafiz

import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../utils/dbConnect'; 
import Asset from '@/models/Assets'; 

// API route handler function
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
    // Handle POST request - Toggle favorite status of an asset
    case 'POST':
      try {
        const asset = await Asset.findById(id);
        if (!asset) {
          return res.status(404).json({ error: 'Asset not found' }); 
        }
        const { favorite } = req.body; 

        if (asset.favorite === undefined) {
          asset.favorite = false; 
        }

        asset.favorite = !asset.favorite; 
        await asset.save(); 

        console.log("Check favoritevvvv", favorite); 
        return res.status(200).json(asset); 
      } catch (err: any) {
        return res.status(500).json({ error: err.message }); 
      }
    // Handle PUT request - Toggle favorite status of an asset (Alternative method)
    case 'PUT':
      try {
        const asset = await Asset.findById(id);
        if (!asset) {
          return res.status(404).json({ error: "Asset not found" }); 
        }

        const updatedAsset = await Asset.findByIdAndUpdate(
          id,
          { $set: { favorite: !asset.favorite } }, 
          { new: true }
        );

        return res.status(200).json({ success: true, asset: updatedAsset });
      } catch (err: any) {
        return res.status(500).json({ error: err.message }); 
      }

    // Handle DELETE request - Remove an asset by ID
    case 'DELETE':
      try {
        await Asset.findByIdAndDelete(id); 
        return res.status(204).end(); 
      } catch (err: any) {
        return res.status(500).json({ error: err.message });
      }

    // Handle unsupported request methods
    default:
      return res.status(405).json({ error: 'Method not allowed' }); 
  }
}
