const Model = require('../model/pushNotification');

module.exports = async (req, res) => {
  if (!req.rules.is_push_notification_update) {
    logger('error', 'push-notification', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findByPk(req.params.id, filter).catch((err) => {
    logger('error', 'push-notification', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'push-notification', 404, 'update.js');
    sendRes({ res, status: 404 });
  }

  if (req.context.slug !== 'root' && item.contextId !== req.context.id) {
    logger('error', 'push-notification', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  if (req.context.slug === 'root' && !req.body.contextId) {
    logger('error', 'push-notification', 400, 'create.js', 'Not contextId');
    sendRes({ res, status: 400 });
  }

  const updatedItem = await item.update(req.body).catch((err) => {
    logger('error', 'push-notification', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: updatedItem });
};
