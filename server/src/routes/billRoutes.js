import express from 'express';
import { getAllBills, createBill, updateBill, deleteBill } from '../controllers/billController.js';

const router = express.Router();

// GET
router.get('/', getAllBills);

// POST
router.post('/', createBill);

// PUT
router.post('/:id', updateBill);

// DELETE
router.delete('/:id', deleteBill);

export default router;