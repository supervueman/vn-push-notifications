const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_push_notification_subscribe || !req.context.id) {
    logger('error', 'push-notification', 403, 'subscribe.js');
    sendRes({ res, status: 403 });
  }

  if (!req.body.endpoint || !req.body.subscribe) {
    logger('error', 'push-notification', 400, 'subscribe.js');
    sendRes({ res, status: 400 });
  }

  const createItem = {
    endpoint: req.body.endpoint,
    subscribe: req.body.subscribe,
    contextId: req.context.id
  };

  const createdItem = await Model.create(createItem);

  sendRes({ res, status: 200, data: createdItem });
};
