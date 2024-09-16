const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', async (req, res) => {
  try {
    const updatedTag = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single tag by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!updatedTag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT to update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedTag[0]) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedTag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
