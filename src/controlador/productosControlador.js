const productosModelo = require('../modelo/productosModelo');

class ProductosControlador {
    static async obtenerProductos(req, res) {
        try {
            const producto = await productosModelo.obtenerTodos();
            console.log('Controlador de productos ejecutado');
            console.log('Productos obtenidos:', producto);
            return res.status(200).json({exito: true, datos: producto});
        } catch (error) {
            return res.status(500).json({exito: false, mensaje: 'Error al obtener los productos'});
        }
    }

    static async obtenerProductoPorId(req, res) {
        try{
            const producto = await productosModelo.obtenerProductoPorId(req.params.id);
            return res.status(200).json({exito: true, datos: producto});
        }catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al obtener el producto por ID'});
        }
    }

    static async crearProducto(req, res) {
        const { nombre, id_categoria, precio, costo, stock } = req.body;
        try{
            const producto = await productosModelo.crearProducto(nombre, id_categoria, precio, costo, stock);
            return res.status(201).json({exito: true, datos: producto});
        }catch(error){
            return res.status(500).json({exito: false, mensaje: 'Error al crear el producto'});
        }
    }

    static async actualizarProducto(req, res){
        const { id } = req.params;
        const { campo, valor } = req.body;
        try{
            const producto = await productosModelo.actualizarProducto(id, campo, valor);
            return res.status(200).json({exito: true, datos: producto});
        }
        catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al actualizar el producto'});
        }
    }

    static async eliminarProducto(req, res){
        const { id } = req.params;
        try{
            const producto = await productosModelo.eliminarProducto(id);
            return res.status(200).json({exito: true, datos: producto});
        }
        catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al eliminar el producto'});
        }
    }

    static async productosNombreCategoria(req, res) {
        try{
            const producto = await productosModelo.obtenerProductosConCategoria();
            return res.status(200).json({exito: true, datos: producto});
        }catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al obtener los productos con nombre de categoría'});
        }
    }
}

module.exports = ProductosControlador;