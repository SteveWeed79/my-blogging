const User = require("./User");
const Blog = require("./Blog");
const Comments = require("./Comments");

// User.hasMany(Blog, {
//   foreignKey: "user_id",
// });

// Blog.hasMany(Comments, {
//   foreingKey: "blog_id",
// });

module.exports = { User, Blog, Comments };
