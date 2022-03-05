const post = require("./post");
const user = require("./user");
const comment = require("./comment");


post.hasMany(comment, {
    foreignKey: "post_id"
});

post.belongsTo(user, {
    foreignKey: "user_id"

});


user.hasMany(post, {
    foreignKey: "user_id"
});

user.hasMany(comment, {
    foreignKey: "user_id"
});


comment.belongsTo(user, {
    foreignKey: "user_id"
});

comment.belongsTo(post, {
    foreignKey: "post_id"
});


module.exports = { user, post, comment };