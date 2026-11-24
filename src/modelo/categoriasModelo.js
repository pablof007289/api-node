const pool = require('../config/bd');

class CategoriasModelo {
    
    static async obtenerTodas(){
        const [rows] = await pool.query('SELECT * FROM categorias');
        return rows;
    }

    static async obtenerCategoriaPorId(id){
        const [rows] = await pool.query('SELECT * FROM categorias WHERE id_categoria = ?', [id]);
        return rows[0];
    }

    static async crearCategoria(nombre){
        const [result] = await pool.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre]);
        return { id: result.insertId, nombre};
    }

    static async actualizarCategoria(id, campo, valor){
        const [result] = await pool.query(`UPDATE categorias SET ${campo} = ? WHERE id_categoria = ?`, [valor, id]);
        return { id, [campo]: valor };
    }
    
    static async eliminarCategoria(id){
        const [result] = await pool.query('DELETE FROM categorias WHERE id_categoria = ?', [id]);
        return { id };
    }
}

module.exports = CategoriasModelo;