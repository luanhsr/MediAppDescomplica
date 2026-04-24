import AppointmentsRepository from '../repositories/AppointmentRepository.js';

/*
 as funções abaixo são as funções de serviço, elas vão chamar
 as funções do repositório e fazer a lógica de negócio, se necessário,
  antes de retornar os dados para o controller
*/

// pega todos os agendamentos
const getAllAppointments = async () => {
    return await AppointmentsRepository.getAllAppointments();
}

// pega um agendamento pelo id
const getAppointment = async (id) => {
    return await AppointmentsRepository.getAppointment(id);
}

// salva um novo agendamento
const saveAppointment = async (date, doctorId, pacientId) => {
    return await AppointmentsRepository.saveAppointment(date, doctorId, pacientId);
}

// atualiza um agendamento existente
const updateAppointment = async (id, {date, doctorId, pacientId}) => {
    return await AppointmentsRepository.updateAppointment(id, {date, doctorId, pacientId});
}

// deleta um agendamento pelo id
const deleteAppointment = async (id) => {
    return await AppointmentsRepository.deleteAppointment(id);
}

// exportando as funções para serem usadas no controller
const appointmentService = {
    getAllAppointments,
    getAppointment,
    saveAppointment,
    updateAppointment,
    deleteAppointment,
}

export default appointmentService;