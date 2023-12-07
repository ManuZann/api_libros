const express = require('express')
const Joi = require('joi')
const libros = require('../data')

const libros_routes = express.Router()

let libro_esquema = Joi.object({
    id: Joi.number(),
    nombre: Joi.string(),
    autor: Joi.string()
})

function obtenerId(arr){
    let id = arr[arr.length - 1].id + 1
    while(true){
        if(arr.find(e => e.id == id)){
            id += 1
        }else{
            break
        }
    }
    return id
}

libros_routes.get('/', (req, res, next) =>{
    try {
        res.json(libros)
    } catch (error) {
        console.log(error);
        next(error)
    }
})

libros_routes.get('/:id', (req, res, next) =>{
    const id = parseInt(req.params.id)
    const libro = libros.find(e => e.id == id)

    try {
        if(libro){
            res.json(libro)
        }else{
            const error = new Error('Libro no encontrado')
            error.status = 404
            throw error
        }
    } catch (error) {
        next(error)
    }
})

libros_routes.post('/', (req, res, next) =>{
    const {nombre, autor} = req.body
    const id = obtenerId(libros)

    try {
        const libro = {
            id: id,
            nombre, autor
        }
        const {error, value} = libro_esquema.validate(libro)
        if (error) {
            const err = new Error('Fallo en la validacion')
            err.status = 400
            err.details = error.details
            throw err
        }else{
            libros.push(value)
            res.status(201).json(value)
        }
    } catch (error) {
        next(error)
    }
})

libros_routes.put('/:id', (req, res, next) =>{
    const id = parseInt(req.params.id)
    const {nombre, autor} = req.body
    const libro = libros.find(e => e.id == id)

    try {
        if(libro){
            libro.nombre = nombre || libro.nombre
            libro.autor = autor || libro.autor
        }else{
            const error = new Error('Libro no encontrado')
            error.status = 404
            throw error
        }
    } catch (error) {
        next(error)
    }
})

libros_routes.delete('/:id', (req, res, next) =>{
    const id = parseInt(req.params.id)
    const libro = libros.find(e => e.id == id)

    try {
        if(libro){
            libros = libros.filter(e => e !== libro)
        }else{
            const error = new Error('Libro no encontrado')
            error.status = 404
            throw error
        }
    } catch (error) {
        next(error)
    }
})

module.exports = libros_routes