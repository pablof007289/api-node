const pool = require('../config/bd');

class ProductosModelo {
    
    static async obtenerTodos(){
        const [rows] = await pool.query('SELECT * FROM productos');
        return rows;
    }

    static async obtenerProductoPorId(id){
        const [rows] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
        return rows[0];
    }

    static async crearProducto(nombre, id_categoria, precio, costo, stock){
        const [result] = await pool.query('INSERT INTO productos (nombre, id_categoria, precio, costo, stock) VALUES (?, ?, ?, ?, ?)', [nombre, id_categoria, precio, costo, stock]);
        return { id: result.insertId, nombre, id_categoria, precio, costo, stock};
    }

    static async actualizarProducto(id, campo, valor){
        const [result] = await pool.query(`UPDATE productos SET ${campo} = ? WHERE id_producto = ?`, [valor, id]);
        return { id, [campo]: valor };
    }

    static async eliminarProducto(id){
        const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [id]);
        return { id };
    }

    static async obtenerProductosConCategoria(){
        const [rows] = await pool.query(`SELECT productos.nombre, categorias.nombre AS nombre_categoria
        FROM productos
        INNER JOIN categorias
        ON productos.id_categoria = categorias.id_categoria;`);
        return rows;
    }
}

module.exports = ProductosModelo;