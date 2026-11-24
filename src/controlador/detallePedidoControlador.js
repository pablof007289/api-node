const detallePedidoModelo = require('../modelo/detallePedidoModelo');

class detallePedidoControlador {
    static async obtenerDetallePedidos(req, res) {
        try {
            const detallePedido = await detallePedidoModelo.obtenerTodos();
            console.log('Controlador de detalle de pedidos ejecutado');
            console.log('Detalle de pedidos obtenidos:', detallePedido);
            return res.status(200).json({exito: true, datos: detallePedido});
        } catch (error) {
            return res.status(500).json({exito: false, mensaje: 'Error al obtener el detalle de pedidos'});
        }
    }

    static async obtenerDetallePedidoPorId(req, res) {
        try{
            const detallePedido = await detallePedidoModelo.obtenerDetallePedidoPorId(req.params.id);
            return res.status(200).json({exito: true, datos: detallePedido});
        }catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al obtener el detalle de pedido por ID'});
        }
    }

    static async crearDetallePedido(req, res) {
        const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
        try{
            const detallePedido = await detallePedidoModelo.crearDetallePedido(id_pedido, id_producto, cantidad, precio_unitario);
            return res.status(201).json({exito: true, datos: detallePedido});
        }catch(error){
            return res.status(500).json({exito: false, mensaje: 'Error al crear el detalle de pedido'});
        }
    }

    static async actualizarDetallePedido(req, res){
        const { id } = req.params;
        const { campo, valor } = req.body;
        try{
            const detallePedido = await detallePedidoModelo.actualizarDetallePedido(id, campo, valor);
            return res.status(200).json({exito: true, datos: detallePedido});
        }
        catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al actualizar el detalle de pedido'});
        }
    }

    static async eliminarDetallePedido(req, res){
        const { id } = req.params;
        try{
            const detallePedido = await detallePedidoModelo.eliminarDetallePedido(id);
            return res.status(200).json({exito: true, datos: detallePedido});
        }
        catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al eliminar el detalle de pedido'});
        }
    }

    static async mostrarDetallePedido(req, res) {
        const { id } = req.params;
        try{
            const detallePedido = await detallePedidoModelo.mostrarDetallePedido(id);
            return res.status(200).json({exito: true, datos: detallePedido});
        }catch (error){
            return res.status(500).json({exito: false, mensaje: `Error al obtener el detalle del pedido ${id}`});
        }
    }

    static async totalVendidoPorProducto(req, res) {
        try{
            const detallePedido = await detallePedidoModelo.totalVendidoPorProducto();
            return res.status(200).json({exito: true, datos: detallePedido});
        }catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al obtener el total vendido por producto'});
        }
    }
}

module.exports = detallePedidoControlador;