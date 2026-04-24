import Appointment from "../models/Appointment.js";

// função para localizar todos os appointments no banco
const getAllAppointments = async () => {
    return await Appointment.find();
};

// buscar um appointment por id
const getAppointment = async (id) => {
    try {
        return await Appointment.findById(id);
    } catch (error) {
        throw new Error(error);
    }
}

// salvar um appointment no banco
const saveAppointment = async (date, doctorId, pacientId) => {
    try {
        const appointment = new Appointment({ date, doctorId, pacientId });
        return await appointment.save();
    } catch (error) {
        throw new Error(error);
    }
}

// atualizar um appointment por id
const updateAppointment = async (id, {date, doctorId, pacientId}) => {
    try {
        return await Appointment.findByIdAndUpdate(id, {date, doctorId, pacientId}, {new: true} );
    } catch (error) {
        throw new Error(error);
    }
}

// deletar um appointment por id
const deleteAppointment = async (id) => {
    try {
        return await Appointment.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
}

// exportando as funções
const appointmentRepository = {
    getAllAppointments,
    getAppointment,
    saveAppointment,
    updateAppointment,
    deleteAppointment,
}

export default appointmentRepository;