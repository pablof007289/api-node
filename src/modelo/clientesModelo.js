const pool = require('../config/bd');

class ClientesModelo {
    
    static async obtenerTodos(){
        const [rows] = await pool.query('SELECT * FROM clientes');
        return rows;
    }

    static async obtenerClientePorId(id){
        const [rows] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [id]);
        return rows[0];
    }

    static async crearCliente(nombre, ciudad){
        const [result] = await pool.query('INSERT INTO clientes (nombre, ciudad, fecha_registro) VALUES (?, ?, CURDATE())', [nombre, ciudad]);
        return { id: result.insertId, nombre, ciudad};
    }

    static async actualizarCliente(id, campo, valor){
        const [result] = await pool.query(`UPDATE clientes SET ${campo} = ? WHERE id_cliente = ?`, [valor, id]);
        return { id, [campo]: valor };
    }
    
    static async eliminarCliente(id){
        const [result] = await pool.query('DELETE FROM clientes WHERE id_cliente = ?', [id]);
        return { id };
    }
}

module.exports = ClientesModelo;