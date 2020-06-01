module.exports = {
  routes: [
    {
      base_route_name: 'push-notifications',
      route_dir_path: 'push-notifications/routes'
    }
  ],
  associations: [
    {
      association_dir_path: 'push-notifications/association'
    }
  ],
  swaggerPaths: [
    'model/index.js',
    'routes/index.js',
    'model/pushNotification.js'
  ]
};
