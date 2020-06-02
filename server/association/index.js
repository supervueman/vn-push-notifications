const Model = require('../model');
const Context = require('../../../core/modules/context/model');
const PushNotification = require('../model/pushNotification');

module.exports = () => {
  Model.belongsTo(Context, {
    onDelete: 'cascade'
  });

  PushNotification.belongsTo(Context, {
    onDelete: 'cascade'
  });
};
