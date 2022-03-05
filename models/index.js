const post = require("./post");
const user = require("./user");
const comment = require("./comment");

user.hasMany(post, {

});

post.belongsTo(user, {

});

comment.belongsTo(user, {

});

user.hasMany(comment, {

});

comment.belongsTo(post, {

});

post.hasMany(comment, {

});

module.exports = { user, post, comment };