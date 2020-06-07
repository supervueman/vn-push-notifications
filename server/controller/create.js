const Model = require('../model/pushNotification');

module.exports = async (req, res) => {
  if (!req.rules.is_push_notification_create && !req.context) {
    logger('error', 'push-notification', 403, 'create.js');
    sendRes({ res, status: 403 });
  }

  if (req.context.slug !== 'root') {
    req.body.contextId = req.context.id;
  }

  if (req.context.slug === 'root' && !req.body.contextId) {
    logger('error', 'push-notification', 400, 'create.js', 'Not contextId');
    sendRes({ res, status: 400 });
  }

  let createdItem = await Model.create(req.body).catch((err) => {
    console.log(err);
    logger('error', 'push-notification', 400, 'create.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: createdItem });
};
