const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const requestedCategory = await Category.findOne({
      where: {id: req.params.id}, 
      include: [{model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}]
    });
    res.status(200).json(requestedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try{
    const requestedCategoryPost = await Category.create({
      category_name: `${req.body.category_name}`
    });
    res.status(200).json(requestedCategoryPost);
  } catch(err){
  res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
    const requestedCategoryUpdate = await Category.update(
      req.body,{
      where: {id: req.params.id}, 
    });
    (!requestedCategoryUpdate[0]? res.status(404).json({ message: 'Cant find that id'}): res.status(200).json(requestedCategoryUpdate))
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {

});

module.exports = router;
