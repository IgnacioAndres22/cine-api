import express from 'express'
import actorController from './actorController.js'


const routesActor = express.Router()

routesActor.post('/actor',actorController.handleInsertActorRequest)
routesActor.get('/actores',actorController.handleGetActoresRequest)
routesActor.get('/actor/:id',actorController.handleGetActorByIdRequest)
//aca le  había puesto actor pero me fallaba y fallaba solo al ponerlo como actorr funciono ----
routesActor.get('/actorr/:idPelicula',actorController.handleGetActoresByPeliculaIdRequest)

export default routesActor