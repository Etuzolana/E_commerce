const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all Category
router.get('/', async (req, res) => {


  try {
    const CategoryData = await Category.findAll({
      // TODO: Add a comment describing the functionality of this property
      include: [{ model: Product }],
    });
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single Category
router.get('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No reader found with that id!' });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a Category
router.post('/', async (req, res) => {
  try {
    const CategoryData = await Category.create(req.body);
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const CategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!CategoryData){
      res.status(404).json({message: 'No the category found with that id'}); 
  return;
     }
     res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a Category
router.delete('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No reader found with that id!' });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;