const Model = require('../model/pushNotification');

module.exports = async (req, res) => {
  if (!req.rules.is_push_notification_read) {
    logger('error', 'push-notification', 403, 'findAll.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
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
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(items);
};
