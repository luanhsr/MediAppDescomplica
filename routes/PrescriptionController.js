import express from "express";
import PrescriptionService from "../services/PrescriptionService.js";
import multer from 'multer';
import path from "path";
import fs from "fs";

let router = express.Router();

// Define o diretório de uploads localmente
const uploadDir = "./prescriptions";
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, uploadDir);
    },
    filename: function(req, file, cb){
      cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

router.post('/uploadPrescription/:id', upload.single('file'), async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file.path;
    const prescription = await PrescriptionService.updatePrescription(id, { file });
    return res.status(200).send(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/readPrescription/:id', async(req, res) => {
  const { id } = req.params;
  try {
    const prescription = await PrescriptionService.getPrescription(id);
    if (!prescription.file) return res.status(404).send("File not found");
    res.sendFile(path.resolve(prescription.file));
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/prescriptions', async (req, res) => {
    try {
      const prescriptions = await PrescriptionService.getAllPrescriptions();
      res.send(prescriptions);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
});

router.get('/getPrescription/:id', async (req, res) => {
  const { id } = req.params;
  try{
    const prescription = await PrescriptionService.getPrescription(id);
    res.send(prescription);
  } catch (error){
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/postPrescription", async function(req, res){
    const { date, appointmentId, medicine, dosage, instructions } = req.body;
    try{
        const prescription = await PrescriptionService.savePrescription({ date, appointmentId, medicine, dosage, instructions });
        res.status(201).send(prescription);
    } catch (error) {
        console.error("🔥 ERRO COMPLETO:", error);

        res.status(500).json({
            message: error.message,
            name: error.name,
            stack: error.stack
        });
    }
});

router.put('/prescriptions/:id', async (req, res) => {
  const { id } = req.params;
  const { date, appointmentId, medicine, dosage, instructions } = req.body;
  try {
    const prescription = await PrescriptionService.updatePrescription(id, { date, appointmentId, medicine, dosage, instructions });
    res.send(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.delete('/prescriptions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await PrescriptionService.deletePrescription(id);
    res.send(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/generatePrescription/:id', async(req, res) => {
  const { id } = req.params;
  try {
    const prescription = await PrescriptionService.getPrescription(id);
    const filePath = await PrescriptionService.generatePrescriptionFile(prescription);
    const updatedPrescription = await PrescriptionService.updatePrescription(id, { file: filePath });
    res.send(updatedPrescription);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;