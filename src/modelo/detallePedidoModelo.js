const pool = require('../config/bd');

class DetallePedidoModelo {
    
    static async obtenerTodos(){
        const [rows] = await pool.query('SELECT * FROM detalle_pedido');
        return rows;
    }

    static async obtenerDetallePedidoPorId(id){
        const [rows] = await pool.query('SELECT * FROM detalle_pedido WHERE id_detalle = ?', [id]);
        return rows[0];
    }

    static async crearDetallePedido(id_pedido, id_producto, cantidad, precio_unitario){
        const [result] = await pool.query('INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)', [id_pedido, id_producto, cantidad, precio_unitario]);
        return { id: result.insertId, id_pedido, id_producto, cantidad, precio_unitario};
    }

    static async actualizarDetallePedido(id, campo, valor){
        const [result] = await pool.query(`UPDATE detalle_pedido SET ${campo} = ? WHERE id_detalle = ?`, [valor, id]);
        return { id, [campo]: valor };
    }

    static async eliminarDetallePedido(id){
        const [result] = await pool.query('DELETE FROM detalle_pedido WHERE id_detalle = ?', [id]);
        return { id };
    }

    static async mostrarDetallePedido(id){
        const [rows] = await pool.query(`SELECT pedidos.id_pedido, pedidos.fecha_pedido, productos.nombre AS producto,
       detalle_pedido.cantidad, detalle_pedido.precio_unitario,
       (detalle_pedido.cantidad * detalle_pedido.precio_unitario) AS subtotal
        FROM detalle_pedido
        INNER JOIN productos ON detalle_pedido.id_producto = productos.id_producto
        INNER JOIN pedidos ON detalle_pedido.id_pedido = pedidos.id_pedido
        WHERE pedidos.id_pedido = ?;`, [id]);
        return rows;
    }

    static async totalVendidoPorProducto(){
        const [rows] = await pool.query(`SELECT productos.nombre AS producto,
        SUM(detalle_pedido.cantidad) AS unidades_vendidas,
        SUM(detalle_pedido.cantidad * detalle_pedido.precio_unitario) AS total_vendido
        FROM detalle_pedido
        INNER JOIN productos ON detalle_pedido.id_producto = productos.id_producto
        GROUP BY productos.id_producto, productos.nombre
        ORDER BY total_vendido DESC;`);
        return rows;
    }
}

module.exports = DetallePedidoModelo;