"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      star: {
        type: Sequelize.STRING,
        defaultValue: "0",
      },
      labelcode: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      attributeid: {
        type: Sequelize.STRING,
      },
      categorycode: {
        type: Sequelize.STRING,
      },
      pricecode: {
        type: Sequelize.STRING,
      },
      areacode: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      userid: {
        type: Sequelize.STRING,
      },
      overviewid: {
        type: Sequelize.STRING,
      },
      imageid: {
        type: Sequelize.STRING,
      },
      provincecode: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Posts");
  },
};
