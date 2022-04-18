const path = require('path');

module.exports = {
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../dist'),
  public: path.resolve(__dirname, '../public'),
  app: path.resolve(__dirname, '../src/app'),
  processes: path.resolve(__dirname, '../src/processes'),
  pages: path.resolve(__dirname, '../src/pages'),
  widgets: path.resolve(__dirname, '../src/widgets'),
  features: path.resolve(__dirname, '../src/features'),
  entities: path.resolve(__dirname, '../src/entities'),
  shared: path.resolve(__dirname, '../src/shared'),
  tests: path.resolve(__dirname, '../tests'),
};
