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
      res.status(404).json({ message: 'Catgory Not Found' });
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


router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
