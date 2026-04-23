import {express} from 'express';
import appointmentController from './AppointmentController.js';
import doctorController from './DoctorController.js';
import patientController from './PatientController.js';
import prescriptionController from './PrescriptionController.js';

// Importamos todos os controladores


// Criamos o roteador para definir as rotas da aplicação
let router = express.Router();

// Definimos a rota raiz para testar se o servidor está funcionando
router.get(
    "/", (req, res) => {
    res.send("Oi");
    res.status(200).json({ message: "Oi" });
});

/*
 o "/" e  o nome do controlador, são concatenados para formar a rota completa, 
 por exemplo: "/doctorController" para o doctorController
*/
router.use("/", appointmentController);
router.use("/", doctorController);
router.use("/", patientController);
router.use("/", prescriptionController);
router.use("/", prescriptionController);

export default router;