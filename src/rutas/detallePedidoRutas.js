const express = require('express');
const router = express.Router();
const detallesPedidoControlador = require('../controlador/detallePedidoControlador');

router.get('/', detallesPedidoControlador.obtenerDetallePedidos);
router.get('/mostrar-detalle/:id', detallesPedidoControlador.mostrarDetallePedido);
router.get('/total-vendido', detallesPedidoControlador.totalVendidoPorProducto);
router.get('/:id', detallesPedidoControlador.obtenerDetallePedidoPorId);
router.post('/', detallesPedidoControlador.crearDetallePedido);
router.put('/:id', detallesPedidoControlador.actualizarDetallePedido);
router.delete('/:id', detallesPedidoControlador.eliminarDetallePedido);

module.exports = router;