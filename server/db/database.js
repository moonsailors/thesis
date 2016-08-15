var config = require('./config');
var thinky = require('thinky')(config);

var type = thinky.type;

//Schemas
/****************************/
var User = thinky.createModel("User", {
  id: type.string(),
  relationshipId: type.string(),
  token: type.object(),
  email: type.string(),
  mood: type.string()
});

var Relationship = thinky.createModel("Relationship", {
  id: type.string(),
  calendarId: type.string(),
});

var Post = thinky.createModel("Post", {
  id: type.string(),
  relationshipId: type.string(),
  creatorId: type.string(),
  title: type.string(),
  description: type.string(),
  category: type.string(),
  api: type.string(),
  time: type.date().default(thinky.r.now())
});

//Relations
/*****************************/
User.belongsTo(Relationship, 'relationship', 'relationshipId', 'id');
Relationship.hasMany(User, 'users', 'id', 'relationshipId');

Post.belongsTo(Relationship, 'relationship', 'relationshipId', 'id');
Relationship.hasMany(Post, 'posts', 'id', 'relationshipId');
Post.belongsTo(User, 'user', 'creatorId', 'id');
User.hasMany(Post, 'posts', 'id', 'creatorId');



module.exports = {
  User: User,
  Relationship: Relationship,
  Post: Post,
  thinky: thinky
}