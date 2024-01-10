const express = require('express')
const routes = express.Router()
const category = require('../../control/category/category')

routes.post('/add-category', category.AddCategory)

exports.routes = routes