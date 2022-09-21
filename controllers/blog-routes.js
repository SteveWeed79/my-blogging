const router = require('express').Router();
const Dish = require('../models/Blog');

router.get('/', async (req, res) => {
    const blogData = await Blog.findAll().catch((err) => {
        res.json(err);
    });
    const blogs = blogData.map((dish) => blog.get({ plain: true }));
    res.render('all', { blogs });
});

// route to get one dish
router.get('/blog/:id', async (req, res) => {
    try {
        const dishData = await Dish.findByPk(req.params.id);
        if (!dishData) {
            res.status(404).json({ message: 'No dish with this id!' });
            return;
        }
        const dish = dishData.get({ plain: true });
        res.render('dish', dish);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;