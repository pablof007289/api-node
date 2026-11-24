const categoriasModelo = require('../modelo/categoriasModelo');

class CategoriasControlador {
    static async obtenerCategorias(req, res) {
        try {
            const categoria = await categoriasModelo.obtenerTodas();
            console.log('Controlador de categorías ejecutado');
            console.log('Categorias obtenidas:', categoria);
            return res.status(200).json({exito: true, datos: categoria});
        } catch (error) {
            return res.status(500).json({exito: false, mensaje: 'Error al obtener las categorías'});
        }
    }

    static async obtenerCategoriaPorId(req, res) {
        try{
            const categoria = await categoriasModelo.obtenerCategoriaPorId(req.params.id);
            return res.status(200).json({exito: true, datos: categoria});
        }catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al obtener la categoria por ID'});
        }
    }

    static async crearCategoria(req, res) {
        const { nombre } = req.body;
        try{
            const categoria = await categoriasModelo.crearCategoria(nombre);
            return res.status(201).json({exito: true, datos: categoria});
        }catch(error){
            return res.status(500).json({exito: false, mensaje: 'Error al crear la categoria'});
        }
    }

    static async actualizarCategoria(req, res){
        const { id } = req.params;
        const { campo, valor } = req.body;
        try{
            const categoria = await categoriasModelo.actualizarCategoria(id, campo, valor);
            return res.status(200).json({exito: true, datos: categoria});
        }
        catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al actualizar la categoria'});
        }
    }

    static async eliminarCategoria(req, res){
        const { id } = req.params;
        try{
            const categoria = await categoriasModelo.eliminarCategoria(id);
            return res.status(200).json({exito: true, datos: categoria});
        }
        catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al eliminar la categoria'});
        }
    }
}

module.exports = CategoriasControlador;