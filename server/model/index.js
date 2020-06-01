const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     PushSubscribe:
 *       type: object
 *       required:
 *         - endpoint
 *         - subscribe
 *       properties:
 *         endpoint:
 *           type: string
 *         subscribe:
 *           type: string
 *         contextId:
 *           type: number
 *           description: Association name context
 *       example:
 *         endpoint: ...
 *         subscribe: {...}
 *         conextId: 1
 */

const Model = sequelize.define('push-subscribe', {
  endpoint: {
    type: Sequelize.TEXT,
    allowNull: true,
    notEmpty: false,
    unique: true
  },
  subscribe: {
    type: Sequelize.TEXT,
    allowNull: true,
    notEmpty: false
  }
});

module.exports = Model;
