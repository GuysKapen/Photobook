import express from 'express';

import albums from '../../controllers/albums';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyToken);

routes.route('/')
  .get(albums.list)
  .post(albums.create);

routes.route('/:id')
  .get(albums.read)
  .put(albums.update)
  .delete(albums.delete);

module.exports = routes;
