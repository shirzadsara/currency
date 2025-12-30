import express from 'express';
import prisma from '../db';

const router = express.Router();

// GET /api/currency
router.get('/', async (req, res) => {
  try {
    const prices = await prisma.currencyPrice.findMany({
      where: {
    symbol: {
      in: ["USD","EUR","GBP","OMR","AUD","AED","TRY","CNY","CAD"]
    }
  },
  orderBy: { date: "asc" }
    });
    res.json(prices);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching currency prices' });
  }
});

// POST /api/currency
router.post('/', async (req, res) => {
  try {
    const { symbol, price, date } = req.body;
    const newPrice = await prisma.currencyPrice.create({
      data: {
        symbol,
        price,
        date: new Date(date),
      },
    });
    res.status(201).json(newPrice);
  } catch (err) {
    res.status(500).json({ message: 'Error adding currency price' });
  }
});

// PATCH /api/currency/:id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    const updated = await prisma.currencyPrice.update({
      where: { id: Number(id) },
      data: { price },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating currency price' });
  }
});

// DELETE /api/currency/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.currencyPrice.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting currency price' });
  }
});

export default router;
