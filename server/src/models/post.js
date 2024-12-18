"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Image, {
        foreignKey: "imageid",
        targetKey: "id",
        as: "images",
      });
      Post.belongsTo(models.Attribute, {
        foreignKey: "attributeid",
        targetKey: "id",
        as: "attributes",
      });
      Post.belongsTo(models.User, {
        foreignKey: "userid",
        targetKey: "id",
        as: "users",
      });
      Post.belongsTo(models.Category, {
        foreignKey: "categorycode",
        targetKey: "code",
        as: "categories",
      });
      Post.belongsTo(models.Overview, {
        foreignKey: "overviewid",
        targetKey: "code",
        as: "overview",
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      star: DataTypes.STRING,
      labelcode: DataTypes.STRING,
      address: DataTypes.STRING,
      attributeid: DataTypes.STRING,
      categorycode: DataTypes.STRING,
      pricecode: DataTypes.STRING,
      areacode: DataTypes.STRING,
      description: DataTypes.TEXT,
      userid: DataTypes.STRING,
      overviewid: DataTypes.STRING,
      imageid: DataTypes.STRING,
      provincecode: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
