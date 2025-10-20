import express from 'express';
import { getBill } from '../controllers/getBill.js';
import { getAllBills } from '../controllers/getAllBills.js';
import { createBill } from '../controllers/createBill.js';
import { updateBill } from '../controllers/updateBill.js';
import { deleteBill } from '../controllers/deleteBill.js';

const router = express.Router();

// GET Bill
router.get('/:id', getBill);

// GET all Bills
router.get('/', getAllBills);

// POST
router.post('/', createBill);

// PUT
router.put('/:id', updateBill);

// DELETE
router.delete('/:id', deleteBill);

export default router; 