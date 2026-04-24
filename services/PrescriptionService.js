import PrescriptionRepository from "../repositories/PrescriptionRepository.js";
import AppointmentService from "../services/AppointmentService.js";
import PacientService from "../services/PacientService.js";
import DoctorService from "../services/DoctorService.js";
import fs from 'fs';
import PDFDocument from "pdfkit";

const getAllPrescriptions = async () => {
    return await PrescriptionRepository.getAllPrescriptions();
}

const getPrescription = async (id) => {
    return await PrescriptionRepository.getPrescription(id);
}

const savePrescription = async ({ date, appointmentId, medicine, dosage, instructions }) => {
    return await PrescriptionRepository.savePrescription({ date, appointmentId, medicine, dosage, instructions });
}

const updatePrescription = async (id, { date, appointmentId, medicine, dosage, instructions, file }) => {
    return await PrescriptionRepository.updatePrescription(id,
         { date, appointmentId, medicine, dosage, instructions, file});
}

const deletePrescription = async (id) => {
    return await PrescriptionRepository.deletePrescription(id);
}

const generatePrescriptionFile = async(prescription) => {
    const appointment = await AppointmentService.getAppointment(prescription.appointmentId);
    const pacient = await PacientService.getPacient(appointment.pacientId);
    const doctor = await DoctorService.getDoctor(appointment.doctorId);

    const id = prescription._id;
    const document = new PDFDocument({font: 'Courier'});
    
    // Ajuste para garantir que o diretório exista ou seja o caminho correto para o servidor
    const dir = "./prescriptions";
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    
    const filePath = dir + "/" + id + ".pdf";

    document.pipe(fs.createWriteStream(filePath));
    document.fontSize(16).text("Pacient Name: " + pacient.name);
    document.fontSize(16).text("Doctor Name: " + doctor.name);

    const recipe = "Medicine: " + prescription.medicine;
    document.fontSize(12).text(recipe);

    document.fontSize(12).text("Dose: " + prescription.dosage);
    document.fontSize(12).text("Instructions: " + prescription.instructions);

    document.end();

    return filePath;
}

const prescriptionService = {
    getAllPrescriptions,
    getPrescription,
    savePrescription,
    updatePrescription,
    deletePrescription,
    generatePrescriptionFile
}

export default prescriptionService;