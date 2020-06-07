const Model = require('../model/pushNotification');

module.exports = async (req, res) => {
  if (!req.rules.is_push_notification_delete) {
    logger('error', 'push-notification', 403, 'remove.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'push-notification', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'push-notification', 404, 'remove.js');
    sendRes({ res, status: 404 });
  }

  if (req.context.slug !== 'root' && item.contextId !== req.context.id) {
    logger('error', 'push-notification', 403, 'remove.js');
    sendRes({ res, status: 403 });
  }

  await Model.destroy({
    where: {
      id: req.params.id
    }
  }).catch((err) => {
    logger('error', 'push-notification', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 204 });
};
