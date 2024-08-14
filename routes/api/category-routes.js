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
      res.status(404).json({ message: 'No category found in the db' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
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
