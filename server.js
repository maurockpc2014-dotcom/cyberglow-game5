const express = require('express');
const cron = require('node-cron');
const app = express();
app.use(express.json());

// Base de datos de jugadores simulada
let usuarios = [];

// IMPORTANTE: Cambia esto por tu dirección real de criptomonedas para recibir tus ganancias
const WALLET_CREADOR_TON = "TU_BILLETERA_DE_TON_AQUÍ";

// Tarea diaria a medianoche: cobra 20%, 50% o 100% por inactividad
cron.schedule('0 0 * * *', () => {
    console.log('🔄 Ejecutando auditoría de inactividad...');
    const ahora = new Date();

    usuarios.forEach(usuario => {
        const diasInactivo = Math.floor((ahora - new Date(usuario.ultimaConexion)) / (1000 * 60 * 60 * 24));

        if (usuario.saldoUSDT > 0) {
            let penalizacion = 0;
            if (diasInactivo >= 90) {
                penalizacion = usuario.saldoUSDT;
                usuario.saldoUSDT = 0;
                usuario.estado = "Caducado";
            } else if (diasInactivo >= 30) {
                penalizacion = usuario.saldoUSDT * 0.50;
                usuario.saldoUSDT -= penalizacion;
                usuario.estado = "Abandono Parcial";
            } else if (diasInactivo >= 15) {
                penalizacion = usuario.saldoUSDT * 0.20;
                usuario.saldoUSDT -= penalizacion;
                usuario.estado = "Inactivo Alerta";
            }
        }
    });
});

// Control de retiros (Mínimo $8, Máximo $50 al día)
app.post('/api/retirar', (req, res) => {
    const { telegramId, monto } = req.body;
    const usuario = usuarios.find(u => u.telegramId === telegramId);

    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    if (monto < 8 || monto > 50) return res.status(400).json({ error: "Límites permitidos: entre $8 y $50 USDT." });
    if (usuario.saldoUSDT < monto) return res.status(400).json({ error: "Saldo insuficiente." });

    usuario.saldoUSDT -= monto;
    usuario.ultimaConexion = new Date(); // Resetea sus días de inactividad
    res.json({ success: true, saldoRestante: usuario.saldoUSDT });
});

app.listen(3000, () => console.log('🚀 Servidor CyberGlow activo'));
