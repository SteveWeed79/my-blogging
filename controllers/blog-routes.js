const router = require("express").Router();
const Blog = require("../models/Blog");
const Dish = require("../models/Blog");

router.get("/", async (req, res) => {
  try {
    const blogsAll = await Blog.findAndCountAll({
      include: [
        {
          model: Comment,
          attributes: ["user_id", "comment_text"],
        },
      ],
    });

    const blogs = blogsAll.map((blog) => blog.get({ plain: true }));
    res.render("homepage", {
      blogs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// route to get one dish
router.get("/blog/:id", async (req, res) => {
  try {
    const dishData = await Dish.findByPk(req.params.id);
    if (!dishData) {
      res.status(404).json({ message: "No dish with this id!" });
      return;
    }
    const dish = dishData.get({ plain: true });
    res.render("dish", dish);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
