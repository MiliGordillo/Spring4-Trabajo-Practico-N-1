import SuperHeroRepository from '../repositories/SuperHeroRepository.mjs';

// Obtener un superhéroe por ID
export async function obtenerSuperheroePorId(id) {
    return await SuperHeroRepository.obtenerPorId(id);
}

// Obtener todos los superhéroes
export async function obtenerTodosLosSuperheroes() {
    const superheroes = await SuperHeroRepository.obtenerTodos();
    return Array.isArray(superheroes) ? superheroes : [];
}

// Buscar superhéroes por atributo (como nombre, planeta, etc.)
export async function buscarSuperheroesPorAtributo(atributo, valor) {
    return await SuperHeroRepository.buscarPorAtributo(atributo, valor);
}

// Obtener superhéroes con edad mayor a 30
export async function obtenerSuperheroesMayoresDe30() {
    return await SuperHeroRepository.obtenerMayoresDe30();
}

// Crear (agregar) un nuevo superhéroe
export async function crearSuperheroe(datos) {
    console.log('[Servicio] Crea el superhéroe...');
    return await SuperHeroRepository.crear(datos);
}

// Actualizar un superhéroe por ID
export async function actualizarSuperheroe(id, datos) {
    return await SuperHeroRepository.actualizar(id, datos);
}

// Eliminar un superhéroe por ID
export async function eliminarSuperheroePorId(id) {
    return await SuperHeroRepository.eliminarPorId(id);
}

// Eliminar un superhéroe por nombre
export async function eliminarSuperheroePorNombre(nombre) {
    return await SuperHeroRepository.eliminarPorNombre(nombre);
}


  
