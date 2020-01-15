const {Router} = require('express') 
const DevController = require('../src/controllers/DevController')

const routes = Router() 

routes.post('/devs', DevController.store)


module.exports = routes 