const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     PushNotificationTemplate:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - title
 *         - options
 *         - ttl
 *         - contextId
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         title:
 *           type: string
 *         options:
 *           type: string
 *         ttl:
 *           type: number
 *         contextId:
 *           type: number
 *           description: Association name context
 *       example:
 *         id: 1
 *         name: New profuct
 *         title: New product
 *         options: {...}
 *         ttl: 3600
 *         conextId: 1
 */

const Model = sequelize.define('push-notification-template', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: true,
    notEmpty: false,
    unique: true
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: true,
    notEmpty: false,
    unique: true
  },
  options: {
    type: Sequelize.TEXT
  },
  ttl: {
    type: Sequelize.INTEGER
  }
});

module.exports = Model;
