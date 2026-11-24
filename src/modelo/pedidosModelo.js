const pool = require('../config/bd');

class PedidosModelo {
    
    static async obtenerTodos(){
        const [rows] = await pool.query('SELECT * FROM pedidos');
        return rows;
    }

    static async obtenerPedidoPorId(id){
        const [rows] = await pool.query('SELECT * FROM pedidos WHERE id_pedido = ?', [id]);
        return rows[0];
    }

    static async crearPedido(id_cliente, id_empleado, canal){
        const [result] = await pool.query('INSERT INTO pedidos (id_cliente, id_empleado, canal, fecha_pedido) VALUES (?, ?, ?, CURDATE())', [id_cliente, id_empleado, canal]);
        return { id: result.insertId, id_cliente, id_empleado, canal};
    }

    static async actualizarPedido(id, campo, valor){
        const [result] = await pool.query(`UPDATE pedidos SET ${campo} = ? WHERE id_pedido = ?`, [valor, id]);
        return { id, [campo]: valor };
    }

    static async eliminarPedido(id){
        const [result] = await pool.query('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
        return { id };
    }

    static async obtenerPedidosConCliente(){
        const [rows] = await pool.query(`SELECT clientes.nombre, pedidos.id_pedido
            FROM pedidos
            INNER JOIN clientes
            ON clientes.id_cliente = pedidos.id_cliente`);
        return rows;
    }
}

module.exports = PedidosModelo;