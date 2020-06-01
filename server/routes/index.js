const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../middleware/profileByAccessToken');
const profileByApiKey = require('../../../middleware/profileByApiKey');

/**
 * @swagger
 * tags:
 *   name: PushNotifications
 *   description: Push notifications management
 */

/**
 * @swagger
 * path:
 *  /push-notifications/subscribe:
 *    post:
 *      summary: Subscribe to push notifications
 *      tags: [PushNotifications]
 *      parameters:
 *        - in: header
 *          name: x-api-key
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PushSubscribe'
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - basicAuth: []
 */
router.post('/subscribe', profileByApiKey, controller.subscribe);

/**
 * @swagger
 * path:
 *  /push-notifications/unsubscribe:
 *    post:
 *      summary: Unsubscribe to push notifications
 *      tags: [PushNotifications]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PushSubscribe'
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - basicAuth: []
 */
router.post('/unsubscribe', controller.unsubscribe);

/**
 * @swagger
 * path:
 *  /push-notifications/send:
 *    post:
 *      summary: Send push notifications
 *      tags: [PushNotifications]
 *      parameters:
 *        - in: header
 *          name: x-api-key
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PushSubscribe'
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - basicAuth: []
 */
router.post('/send', profileByAccessToken, controller.send);

/**
 * @swagger
 * path:
 *  /push-notifications:
 *    get:
 *      summary: Get all push-notifications
 *      tags: [PushNotifications]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *        - filterParam:
 *          in: query
 *          name: filter
 *          description: See sequelize documentation https://sequelize.org/v5/manual/querying.html
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *          example:
 *            where:
 *              slug: index
 *              published: true
 *      responses:
 *        "200":
 *          description: Array PushNotificationTemplate schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/PushNotificationTemplate'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByAccessToken, controller.findAll);

/**
 * @swagger
 * path:
 *  /push-notifications/find/{id}:
 *    get:
 *      summary: Get push-notifications by id
 *      tags: [PushNotifications]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *        - filterParam:
 *          in: query
 *          name: filter
 *          description: See sequelize documentation https://sequelize.org/v5/manual/querying.html
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *          example:
 *            include: ['context']
 *      responses:
 *        "200":
 *          description: PushNotificationTemplate schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PushNotificationTemplate'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', profileByAccessToken, controller.findByPk);

/**
 * @swagger
 * path:
 *  /push-notifications/create:
 *    post:
 *      summary: Create push-notifications
 *      tags: [PushNotifications]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PushNotificationTemplate'
 *      responses:
 *        "200":
 *          description: Create PushNotificationTemplate schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PushNotificationTemplate'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /push-notifications/update/{id}:
 *    put:
 *      summary: Update push-notifications
 *      tags: [PushNotifications]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PushNotificationTemplate'
 *      responses:
 *        "200":
 *          description: PushNotificationTemplate schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PushNotificationTemplate'
 *      security:
 *        - basicAuth: []
 */
router.put('/update/:id', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /push-notifications/remove/{id}:
 *    delete:
 *      summary: Delete push-notifications
 *      tags: [PushNotifications]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "204":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - basicAuth: []
 */
router.delete('/remove/:id', profileByAccessToken, controller.remove);

/**
 * @swagger
 * path:
 *  /push-notifications/count:
 *    get:
 *      summary: Get push-notifications count
 *      tags: [PushNotifications]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *        - filterParam:
 *          in: query
 *          name: filter
 *          description: See sequelize documentation https://sequelize.org/v5/manual/querying.html
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *      responses:
 *        "200":
 *          description: Push notification templates count
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  count:
 *                    type: number
 *      security:
 *        - basicAuth: []
 */
router.get('/count', profileByAccessToken, controller.count);

module.exports = router;
