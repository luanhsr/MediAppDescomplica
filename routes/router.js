import express from 'express';
import appointmentController from './AppointmentController.js';
import doctorController from './DoctorController.js';
import pacientController from './PacientController.js';
import prescriptionController from './PrescriptionController.js';

// Criamos o roteador para definir as rotas da aplicação
let router = express.Router();

// Definimos a rota raiz
router.get("/", (req, res) => {
    res.status(200).json({ message: "Servidor funcionando" });
});

// Importamos e usamos os controladores
router.use("/", appointmentController);
router.use("/", doctorController);
router.use("/", pacientController);
router.use("/", prescriptionController);

export default router;