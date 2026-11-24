const pool = require('../config/bd');

class EmpleadosModelo {
    
    static async obtenerTodos(){
        const [rows] = await pool.query('SELECT * FROM empleados');
        return rows;
    }

    static async obtenerEmpleadoPorId(id){
        const [rows] = await pool.query('SELECT * FROM empleados WHERE id_empleado = ?', [id]);
        return rows[0];
    }

    static async crearEmpleado(nombre, area){
        const [result] = await pool.query('INSERT INTO empleados (nombre, area) VALUES (?, ?)', [nombre, area]);
        return { id: result.insertId, nombre, area};
    }

    static async actualizarEmpleado(id, campo, valor){
        const [result] = await pool.query(`UPDATE empleados SET ${campo} = ? WHERE id_empleado = ?`, [valor, id]);
        return { id, [campo]: valor };
    }
    
    static async eliminarEmpleado(id){
        const [result] = await pool.query('DELETE FROM empleados WHERE id_empleado = ?', [id]);
        return { id };
    }
}

module.exports = EmpleadosModelo;