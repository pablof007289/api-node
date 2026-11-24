const clientesModelo = require('../modelo/clientesModelo');

class ClientesControlador {
    static async obtenerClientes(req, res) {
        try {
            const cliente = await clientesModelo.obtenerTodos();
            console.log('Controlador de clientes ejecutado');
            console.log('Clientes obtenidos:', cliente);
            return res.status(200).json({exito: true, datos: cliente});
        } catch (error) {
            return res.status(500).json({exito: false, mensaje: 'Error al obtener los clientes'});
        }
    }

    static async obtenerClientePorId(req, res) {
        try{
            const cliente = await clientesModelo.obtenerClientePorId(req.params.id);
            return res.status(200).json({exito: true, datos: cliente});
        }catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al obtener el cliente por ID'});
        }
    }

    static async crearCliente(req, res) {
        const { nombre, ciudad } = req.body;
        try{
            const cliente = await clientesModelo.crearCliente(nombre, ciudad);
            return res.status(201).json({exito: true, datos: cliente});
        }catch(error){
            return res.status(500).json({exito: false, mensaje: 'Error al crear el cliente'});
        }
    }

    static async actualizarCliente(req, res){
        const { id } = req.params;
        const { campo, valor } = req.body;
        try{
            const cliente = await clientesModelo.actualizarCliente(id, campo, valor);
            return res.status(200).json({exito: true, datos: cliente});
        }
        catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al actualizar el cliente'});
        }
    }

    static async eliminarCliente(req, res){
        const { id } = req.params;
        try{
            const cliente = await clientesModelo.eliminarCliente(id);
            return res.status(200).json({exito: true, datos: cliente});
        }
        catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al eliminar el cliente'});
        }
    }
}

module.exports = ClientesControlador;