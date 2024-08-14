const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagData) {
      res.status(404).json({ message: 'Tag Not Found' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(201).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const [affectedRows] = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'Tag Not Found, try different ID' });
      return;
    }
    const updatedTag = await Tag.findByPk(req.params.id);
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const affectedRows = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows === 0) {
      res.status(404).json({ message: 'Tag Not Found, try different ID' });
      return;
    }

    res.status(204).json({ message: 'Tag Deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
