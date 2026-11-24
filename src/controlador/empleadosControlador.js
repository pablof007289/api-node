const empleadosModelo = require('../modelo/empleadosModelo');

class EmpleadosControlador {
    static async obtenerEmpleados(req, res) {
        try {
            const empleado = await empleadosModelo.obtenerTodos();
            console.log('Controlador de empleados ejecutado');
            console.log('Empleados obtenidos:', empleado);
            return res.status(200).json({exito: true, datos: empleado});
        } catch (error) {
            return res.status(500).json({exito: false, mensaje: 'Error al obtener los empleados'});
        }
    }

    static async obtenerEmpleadoPorId(req, res) {
        try{
            const empleado = await empleadosModelo.obtenerEmpleadoPorId(req.params.id);
            return res.status(200).json({exito: true, datos: empleado});
        }catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al obtener el empleado por ID'});
        }
    }

    static async crearEmpleado(req, res) {
        const { nombre, area } = req.body;
        try{
            const empleado = await empleadosModelo.crearEmpleado(nombre, area);
            return res.status(201).json({exito: true, datos: empleado});
        }catch(error){
            return res.status(500).json({exito: false, mensaje: 'Error al crear el empleado'});
        }
    }

    static async actualizarEmpleado(req, res){
        const { id } = req.params;
        const { campo, valor } = req.body;
        try{
            const empleado = await empleadosModelo.actualizarEmpleado(id, campo, valor);
            return res.status(200).json({exito: true, datos: empleado});
        }
        catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al actualizar el empleado'});
        }
    }

    static async eliminarEmpleado(req, res){
        const { id } = req.params;
        try{
            const empleado = await empleadosModelo.eliminarEmpleado(id);
            return res.status(200).json({exito: true, datos: empleado});
        }
        catch (error){
            return res.status(500).json({exito: false, mensaje: 'Error al eliminar el empleado'});
        }
    }
}

module.exports = EmpleadosControlador;