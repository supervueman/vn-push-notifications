const Model = require('../model/pushNotification');

module.exports = async (req, res) => {
  if (!req.rules.is_push_notification_update) {
    logger('error', 'push-notification', 403, 'update.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findByPk(req.params.id, filter).catch((err) => {
    logger('error', 'push-notification', 400, 'update.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    logger('error', 'push-notification', 404, 'update.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  if (req.context.slug !== 'root' && item.contextId !== req.context.id) {
    logger('error', 'push-notification', 403, 'update.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  if (req.context.slug === 'root' && !req.body.contextId) {
    logger('error', 'push-notification', 400, 'create.js', 'Not contextId');
    res.status(400).send({
      message: 'Forbidden'
    });
    return;
  }

  const updatedItem = await item.update(req.body).catch((err) => {
    logger('error', 'push-notification', 400, 'update.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(updatedItem);
};
