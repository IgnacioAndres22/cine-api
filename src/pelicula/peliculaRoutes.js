import express from 'express'
import peliculaController from './peliculaController.js'


const routes = express.Router()

routes.post('/pelicula',peliculaController.handleInsertPeliculaRequest)

routes.get('/peliculas',peliculaController.handleGetPeliculasRequest)

routes.get('/pelicula/:id',peliculaController.handleGetPeliculaByIdRequest)

routes.put('/pelicula/:id',peliculaController.handleUpdatePeliculaByIdRequest)

routes.delete('/pelicula/:id',peliculaController.handleDeletePeliculaByIdRequest)

export default routes