const Model = require('../model/pushNotification');

module.exports = async (req, res) => {
  if (!req.rules.is_push_notification_read) {
    logger('error', 'push-notification', 403, 'findAll.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  if (!filter.where && req.context.slug !== 'root') {
    filter.where = {};
  }
  if (req.context.slug !== 'root') {
    filter.where.contextId = req.context.id;
  }

  const items = await Model.findAll(filter).catch((err) => {
    logger('error', 'push-notification', 400, 'findAll.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: items });
};
