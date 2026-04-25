import express from 'express';
import AppointmentService from '../services/AppointmentService.js';

let router = express.Router();

router.get('/appointments', async (req, res) => {
    try {
        const appointments = await AppointmentService.getAllAppointments();
        res.send(appointments);
    } catch (error) {        
        console.error(error);
        res.status(500).send(error.message);
    }
});

router.get('/getAppointment/:id', async (req, res) => {
    try {
        const appointment = await AppointmentService.getAppointment(req.params.id);
        res.send(appointment);
    } catch (error) {        
        console.error(error);
        res.status(500).send(error.message);
    }
});

router.post('/postAppointments', async (req, res) => {
    try {
        console.log("BODY:", req.body); // 👈 DEBUG

        // 🔥 CORREÇÃO AQUI
        const { date, doctorId, patientId } = req.body;

        const appointment = await AppointmentService.saveAppointment(
            date,
            doctorId,
            patientId
        );

        res.status(201).send(appointment);
    } catch (error) {
        console.error("ERRO:", error);
        res.status(500).send(error.message);
    }
});

router.put('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { date, doctorId, patientId } = req.body;

        const appointment = await AppointmentService.updateAppointment(id, {
            date,
            doctorId,
            patientId
        });

        res.send(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

router.delete('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await AppointmentService.deleteAppointment(id);
        res.send(appointment);
    }catch (error) {
    console.error("🔥 ERRO COMPLETO:", error);

    res.status(500).json({
        message: error.message,
        stack: error.stack,
        name: error.name
    });
}
});

export default router;