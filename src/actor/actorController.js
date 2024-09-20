import { ObjectId } from 'mongodb';
import client from '../common/db.js';
import { Actor } from './actor.js';

const peliculaCollection = client.db('cine-db').collection('peliculas')
const actorCollection = client.db('cine-db').collection('actores');


async function handleInsertActorRequest(req, res) {
    let data = req.body;
    let actor = Actor
    let pelicula = await peliculaCollection.findOne({ nombre: data.idPelicula });
    

    actor.idPelicula = pelicula._id,
    actor.nombre = data.nombre,
    actor.edad = data.edad,
    //nunca me funciono el dato bool intente con false, true no tuve exito como modifico esto por favor 
    //pd agregue pocas notas en las partes que realmente me vi dificultado estuve horas.
    actor.estaRetidado = data.estaRetidado,
    actor.premios = data.premios

    try {
        if (!pelicula) {
            return res.status(404).send('No existe la película con el nombre proporcionado');
        }
        let actor = {Actor};
        await actorCollection.insertOne(actor)
            .then((result) => {
                return res.status(201).send(result);
            })
            .catch((e) => {
                return res.status(500).send({ error: e });
            });
    } catch (e) {
        return res.status(500).send({ error: e });
    }
}

async function handleGetActoresRequest(req, res) {
    await actorCollection.find({}).toArray()
    .then((data)=>{
        return res.status(200).send(data)
    })
    .catch((e)=>{return res.status(500).send({error:e})})
}

async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id;

    try{
        let oid = ObjectId.createFromHexString(id)

        await actorCollection.findOne({_id:oid})
        .then((data)=>{
            if(data===null) return res.status(404).send(data)
            
            return res.status(200).send(data)
        })
        .catch((e)=>{
            return res.status(500).send({error: e.code})
        })

    }catch(e){
        return res.status(400).send('Id mal formado')
    }
}

async function handleGetActoresByPeliculaIdRequest(req, res) {
    let peliculaId = req.params.idPelicula;
    try {
        let oid = ObjectId.createFromHexString(peliculaId);
        let actores = await actorCollection.find({ 'Actor.idPelicula': oid }).toArray();
        if (actores.length === 0) {
            return res.status(404).send('No se encontraron actores para esta película');
        }
        return res.status(200).send(actores);
    } catch (e) {
        return res.status(400).send('Id de película mal formado');
    }
}

export default{
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
} 