import SuperHero from '../models/SuperHero.mjs';
import IRepository from './Irepositories.mjs';

class SuperHeroRepository extends IRepository {

    // Obtener superhéroe por ID
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    // Obtener todos los superhéroes válidos (nombre definido)
    async obtenerTodos() {
        return await SuperHero.find({
            $or: [
                { nombreSuperheroe: { $exists: true, $ne: "" } },
                { nombreSuperHeroe: { $exists: true, $ne: "" } }
            ]
        });
    }

    // Buscar superhéroes por atributo dinámico
    async buscarPorAtributo(atributo, valor) {
        return await SuperHero.find({ [atributo]: valor });
    }

    // Superhéroes mayores de 30 años, de la Tierra y con al menos 2 poderes
    async obtenerMayoresDe30() {
        return await SuperHero.find({
            edad: { $gt: 30 },
            planetaOrigen: "Tierra",
            $expr: { $gte: [{ $size: "$poderes" }, 2] }
        });
    }

    // Crear un nuevo superhéroe
    async crear(datos) {
        console.log('[Repositorio] Guardando en base de datos...');
        const nuevoHeroe = new SuperHero(datos);
        console.log('[Repositorio] Superhéroe guardado en la base de datos:', nuevoHeroe);
        return await nuevoHeroe.save();
    }

    // Actualizar superhéroe por ID
    async actualizar(id, datos) {
        return await SuperHero.findByIdAndUpdate(id, datos, { new: true });
    }

    // Eliminar por ID
    async eliminarPorId(id) {
        return await SuperHero.findByIdAndDelete(id);
    }

    // Eliminar por nombre
    async eliminarPorNombre(nombre) {
        return await SuperHero.findOneAndDelete({ nombre });
    }
}

// Exportar instancia lista para usar
export default new SuperHeroRepository();

