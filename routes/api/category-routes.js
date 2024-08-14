const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET /api/categories, show all categories and products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      order: [['id', 'ASC']],
      include: [{ model: Product }]
    });
    
    if (!categoryData) {
      res.status(404).json({ message: 'Category Not Found' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET /api/categories/:id -show a category by id and products
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
    res.status(500).json(err.message);
  }
});

// POST ROUTE
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    });

    if (categoryData[0] === 0) {
      throw new Error("message: 'Category Not Found. Try a different ID");
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err.message);
  }
});
// delete Route
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Reader Not Found. Try a different ID' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
