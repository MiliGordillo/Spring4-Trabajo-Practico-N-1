import express from 'express';
import {
  obtenerSuperheroePorIdController,
  obtenerTodosLosSuperheroesController,
  buscarSuperheroesPorAtributoController,
  obtenerSuperheroesMayoresDe30Controller,
  crearSuperheroeController,
  actualizarSuperheroeController,
  eliminarSuperheroePorIdController,
  eliminarSuperheroePorNombreController,
  agregarSuperheroeController,
  mostrarFormularioEditar,
  editarSuperheroeController,
  eliminarSuperheroeYRedirigirController
} from '../controllers/SuperHeroesController.mjs';
import { renderizarListaSuperheroes } from '../views/ResponseView.mjs';
import { obtenerTodosLosSuperheroes } from '../services/SuperHeroesService.mjs';

const router = express.Router();

// ==============================
// API REST
// ==============================
router.get('/api/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/api/mayores-de-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/api/:id', obtenerSuperheroePorIdController);
router.post('/api', crearSuperheroeController);
router.put('/api/:id', actualizarSuperheroeController);
router.delete('/api/:id', eliminarSuperheroePorIdController);
router.delete('/api/nombre/:nombre', eliminarSuperheroePorNombreController);

// ==============================
// VISTAS / FORMULARIOS
// ==============================


// Ruta de inicio — esta es la que se activa cuando apretás el botón "Inicio"
router.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' }); // 👈 Acá pasás el title
});

router.get('/api', async (req, res) => {
  try {
    const rawSuperheroes = await obtenerTodosLosSuperheroes();
    const superheroes = renderizarListaSuperheroes(rawSuperheroes);

    const mensaje = req.query.mensaje;    

    res.render('dashboard', {
      title: 'Dashboard de Superhéroes',
      mensaje,
      heroes: superheroes
    });
  } catch (error) {
    res.status(500).render('dashboard', {
      title: 'Error en Dashboard',
      mensaje: null,
      heroes: [],
      error: 'Error al obtener los superhéroes'
    });
  }
});

// Formulario para agregar
router.get('/formulario/agregar', (req, res) => {
  res.render('addSuperhero', {
    title: 'Agregar Superhéroe',
    datos: {},
    errores: []
  });
});
router.post('/agregar', agregarSuperheroeController);

// Formulario para editar
router.get('/formulario/editar/:id', mostrarFormularioEditar);
router.post('/formulario/editar/:id', editarSuperheroeController);

// Eliminar superhéroe
router.delete('/:id', eliminarSuperheroeYRedirigirController);

export default router;


