const router = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const Comment = require("../models/Comments");

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
    res.render("all", {
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
    const blogData = await Blog.findByPk(req.params.id);
    if (!blogData) {
      res.status(404).json({ message: "No blog with this id!" });
      return;
    }
    const blog = blogData.get({ plain: true });
    res.render("blog", blog);
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
