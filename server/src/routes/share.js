import express from 'express';
import mongoose from 'mongoose';
import response from '../helpers/response';

const Category = mongoose.model('Category');

const routes = express.Router({ mergeParams: true });

routes.route('/categories')
    .get(function (req, res) {
        Category.find({}, function (err, result) {
            if (err) return response.sendNotFound(res);
            res.json(result);
        })
    })

module.exports = routes;
