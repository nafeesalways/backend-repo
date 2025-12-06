
import { Request, Response } from 'express';
import { adminDb } from '../config/firebase';

const PRODUCTS_COLLECTION = 'products';

// add product
export const addProduct = async (req: Request, res: Response) : Promise<any> => {
  try {
    const productData = req.body;
    
    // make new document in firestore
    const docRef = await adminDb.collection(PRODUCTS_COLLECTION).add({
      ...productData,
      createdAt: new Date().toISOString(),
      status: productData.status || 'active' // default status
    });

    return res.status(201).json({ success: true, id: docRef.id, message: 'Product added' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to add product' });
  }
};

// update product
export const updateProduct = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    await adminDb.collection(PRODUCTS_COLLECTION).doc(id).update(updates);

    return res.json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to update product' });
  }
};

// delete product
export const deleteProduct = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { id } = req.params;
    
    await adminDb.collection(PRODUCTS_COLLECTION).doc(id).delete();

    return res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to delete product' });
  }
};
