const Model = require('../model/pushNotification');

module.exports = async (req, res) => {
  if (!req.rules.is_push_notification_read) {
    logger('error', 'push-notification', 403, 'findByPk.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findByPk(req.params.id, filter).catch((err) => {
    logger('error', 'push-notification', 400, 'findByPk.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'push-notification', 404, 'findByPk.js');
    sendRes({ res, status: 404 });
  }

  if (req.context.slug !== 'root' && item.contextId !== req.context.id) {
    logger('error', 'push-notification', 403, 'findByPk.js');
    sendRes({ res, status: 403 });
  }

  sendRes({ res, status: 200, data: item });
};
