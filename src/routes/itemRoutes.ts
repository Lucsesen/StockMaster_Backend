import { Router } from 'express';
import prisma from '../prisma';

const router = Router();

// Criar um produto
router.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const newItem = await prisma.item.create({
      data: { name, quantity },
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar item" });
  }
});

// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar itens" });
  }
});

// Buscar um produto pelo ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const item = await prisma.item.findUnique({
      where: { id: parseInt(id) },
    });

    if (!item) {
      return res.status(404).json({ error: "Item não encontrado" });
    }

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar o item" });
  }
});

// Atualizar um produto pelo ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const updatedItem = await prisma.item.update({
      where: { id: parseInt(id) },
      data: { name, quantity },
    });
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o item" });
  }
});

// Deletar um produto pelo ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await prisma.item.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar o item" });
  }
});

export default router;
