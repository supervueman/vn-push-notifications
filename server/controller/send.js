const Model = require('../model');
const webPush = require('web-push');

module.exports = async (req, res) => {
  if (!req.rules.is_push_notification_send) {
    logger('error', 'push-notification', 403, 'send.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const subscribers = await Model.findAll({
    where: {
      contextId: req.context.id
    }
  });

  webPush.setVapidDetails(
    `mailto:${process.env.ADMIN_EMAIL}`,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
  const options = {
    TTL: req.body.ttl
  };

  subscribers.forEach((el) => {
    const subscription = JSON.parse(el.subscribe);

    const payload = JSON.stringify({
      title: req.body.title,
      ...req.body.options
    });

    webPush
      .sendNotification(subscription, payload, options)
      .then(() => {
        res.status(200).send({
          message: 'OK'
        });
        return;
      })
      .catch((err) => {
        logger('error', 'push-notification', 500, 'send.js', err);
        res.status(500).send('subscription not possible');
        return;
      });
  });
};
