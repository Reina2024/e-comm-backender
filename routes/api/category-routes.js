const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET /api/categories - Show all categories and their associated products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      order: [['id', 'ASC']],
      include: [{ model: Product }]
    });
    
    if (!categoryData.length) {
      res.status(404).json({ message: 'No Categories Found' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/categories/:id - Show a category by id and its products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category Not Found. Try a different ID' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/categories - Create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(201).json(categoryData); // 201 Created
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/categories/:id - Update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );

    if (updated === 0) {
      res.status(404).json({ message: 'Category Not Found. Try a different ID' });
      return;
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/categories/:id - Delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id }
    });

    if (deleted === 0) {
      res.status(404).json({ message: 'Category Not Found. Try a different ID' });
      return;
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
