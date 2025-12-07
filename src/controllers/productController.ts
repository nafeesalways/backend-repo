

import { Request, Response } from 'express';
import { adminDb } from '../config/firebase';

const PRODUCTS_COLLECTION = 'products';

// 1. Add Product
export const addProduct = async (req: Request, res: Response) : Promise<any> => {
  try {
    console.log("Received Product Data:", req.body); 

    const productData = req.body;
    
    if (!productData.name || !productData.price) {
      return res.status(400).json({ success: false, message: "Missing required fields (name, price)" });
    }

    const docRef = await adminDb.collection(PRODUCTS_COLLECTION).add({
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(), // updatedAt যোগ করা হলো
      status: productData.status || 'active'
    });

    return res.status(201).json({ success: true, id: docRef.id, message: 'Product added successfully' });
  } catch (error: any) { 
    console.error("🔥 Error adding product:", error); 
    return res.status(500).json({ success: false, error: error.message || 'Failed to add product' });
  }
};

// 2. Update Product
export const updateProduct = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    
    await adminDb.collection(PRODUCTS_COLLECTION).doc(id).update({
      ...updates,
      updatedAt: new Date().toISOString()
    });

    return res.json({ success: true, message: 'Product updated successfully' });
  } catch (error: any) {
    console.error("🔥 Error updating product:", error);
    return res.status(500).json({ success: false, error: error.message || 'Failed to update product' });
  }
};

// 3. Delete Product
export const deleteProduct = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { id } = req.params;
    
    await adminDb.collection(PRODUCTS_COLLECTION).doc(id).delete();

    return res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error("🔥 Error deleting product:", error);
    return res.status(500).json({ success: false, error: error.message || 'Failed to delete product' });
  }
};
