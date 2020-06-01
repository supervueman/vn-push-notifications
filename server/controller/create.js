const Model = require('../model/pushNotification');

module.exports = async (req, res) => {
  if (!req.rules.is_push_notification_create && !req.context) {
    logger('error', 'push-notification', 403, 'create.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  if (req.context.slug !== 'root') {
    req.body.contextId = req.context.id;
  }

  if (req.context.slug === 'root' && !req.body.contextId) {
    logger('error', 'push-notification', 400, 'create.js', 'Not contextId');
    res.status(400).send({
      message: 'Forbidden'
    });
    return;
  }

  let createdItem = await Model.create(req.body).catch((err) => {
    console.log(err);
    logger('error', 'push-notification', 400, 'create.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(createdItem);
};
