import Doctor from "../models/Doctor.js"

// pegando todos os doutores
const getAllDoctors = async () => {
    try{
        return await Doctor.find();
    }catch(error){
        throw new Error(error);
    }
}

// pegando um doutor pelo id
const getDoctor = async (id) => {
    try{
        return await Doctor.findById(id);
    }catch(error){
        throw new Error(error);
    }
}

// salvando um novo doutor
const saveDoctor = async ({ 
    name, login, password, medicalSpecialty, 
    medicalRegistration, email, phone 
}) => {
        try{
            const doctor = new Doctor({
                 name, login, password, medicalSpecialty, 
                 medicalRegistration, email, phone 
                });
            return await doctor.save();
        }catch(error){
            throw new Error(error);
        }
}

// atualizando um doutor
const updateDoctor = async (id, { 
    name, login, password, medicalSpecialty,
    medicalRegistration, email, phone
 }) => {
            try{
                return await Doctor.findByIdAndUpdate(id, { 
                    name, login, password, medicalSpecialty,
                    medicalRegistration, email, phone }, { new: true });
            }catch(error){
                throw new Error(error);
            }
}

// deletando um doutor
const deleteDoctor = async (id) => {
    try{
        return await Doctor.findByIdAndDelete(id);
    }catch(error){
        throw new Error(error);
    }
}

// logando 
const getDoctorByLogin = async (login) => {
    try {
        return await Doctor.findOne({"login": login});
    } catch (error) {
        throw new Error(error);
    }
}

const doctorRepository = {
    getAllDoctors,
    getDoctor,
    saveDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctorByLogin
}

export default doctorRepository;