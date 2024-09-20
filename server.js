import express, {urlencoded} from 'express'
import cors from 'cors'

import client from './src/common/db.js'

import routes from './src/pelicula/peliculaRoutes.js'
import routesActor from './src/actor/actorRoutes.js'

const PORTS = 3000 || 4000
const app= express()

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cors())

app.get('/1', (req, res)=>{return res.status(200).send('Bienvenido a cine Iplacex')})

app.use('/api',routes)
app.use('/api',routesActor)

await client.connect()
.then(()=>{
    console.log('Conexion con exito')
    app.listen(PORTS, ()=>{console.log(`Servidor corriendo en http://localhost${PORTS}`)})
})
.catch(()=>{
    console.log ('No se logro conectar con exito')
})