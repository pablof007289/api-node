const pedidosModelo = require('../modelo/pedidosModelo');

class PedidosControlador {
    static async obtenerPedidos(req, res) {
        try {
            const pedido = await pedidosModelo.obtenerTodos();
            console.log('Controlador de pedidos ejecutado');
            console.log('Pedidos obtenidos:', pedido);
            return res.status(200).json({exito: true, datos: pedido});
        } catch (error) {
            return res.status(500).json({exito: false, mensaje: 'Error al obtener los pedidos'});
        }
    }

    static async obtenerPedidoPorId(req, res) {
        try{
            const pedido = await pedidosModelo.obtenerPedidoPorId(req.params.id);
            return res.status(200).json({exito: true, datos: pedido});
        }catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al obtener el pedido por ID'});
        }
    }

    static async crearPedido(req, res) {
        const { id_cliente, id_empleado, canal } = req.body;
        try{
            const pedido = await pedidosModelo.crearPedido(id_cliente, id_empleado, canal);
            return res.status(201).json({exito: true, datos: pedido});
        }catch(error){
            return res.status(500).json({exito: false, mensaje: 'Error al crear el pedido'});
        }
    }

    static async actualizarPedido(req, res){
        const { id } = req.params;
        const { campo, valor } = req.body;
        try{
            const pedido = await pedidosModelo.actualizarPedido(id, campo, valor);
            return res.status(200).json({exito: true, datos: pedido});
        }
        catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al actualizar el pedido'});
        }
    }

    static async eliminarPedido(req, res){
        const { id } = req.params;
        try{
            const pedido = await pedidosModelo.eliminarPedido(id);
            return res.status(200).json({exito: true, datos: pedido});
        }
        catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al eliminar el pedido'});
        }
    }

    static async pedidosNombreCliente(req, res) {
        try{
            const pedidos = await pedidosModelo.obtenerPedidosConCliente();
            return res.status(200).json({exito: true, datos: pedidos});
        }catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al obtener los pedidos con nombre de cliente'});
        }
    }
}

module.exports = PedidosControlador;