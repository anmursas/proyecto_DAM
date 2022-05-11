import axios from 'axios';


class ValuesService {

    getAllDpto() {

        return axios.get("http://localhost:8090/api/v1/dpto");
    }

    getAllCt() {
        return axios.get("http://localhost:8090/api/v1/centro-trabajo")
    }

    getAllReclu() {
        return axios.get("http://localhost:8090/api/v1/reclutador")
    }

    getAllVincus() {
        return axios.get("http://localhost:8090/api/v1/vinculacion")
    }

    getAllPuestos() {
        return axios.get("http://localhost:8090/api/v1/puesto-trabajo")
    }

    getPuestoById(id) {
        return axios.get("http://localhost:8090/api/v1/puesto-trabajo/" + id)
    }

    getAllTc() {
        return axios.get("http://localhost:8090/api/v1/contratacion")
    }

    getAllJl() {
        return axios.get("http://localhost:8090/api/v1/jornada-laboral")
    }

    getAllCandidatos() {
        return axios.get("http://localhost:8090/api/v1/candidatos")
    }

    getAllTa() {
        return axios.get("http://localhost:8090/api/v1/titulacion-academica")
    }

    getAllProcesoss() {
        return axios.get("http://localhost:8090/api/v1/procesos")
    }

    createCandidato(candidato) {
        return axios.post("http://localhost:8090/api/v1/candidatos", candidato)
    }

    getCandidatoById(id) {
        return axios.get("http://localhost:8090/api/v1/candidatos/" + id);
    }



    deleteProcesoCandidato(id) {
        return axios.delete("http://localhost:8090/api/v1/pro_cand/" + id);
    }

    getProcesoCandidato() {
        return axios.get("http://localhost:8090/api/v1/pro_cand");
    }

    putProcesoCandidato(id, pro_cand) {
        return axios.put("http://localhost:8090/api/v1/pro_cand/" + id, pro_cand)
    }

    postProcesoCandidato(pro_cand) {
        return axios.post("http://localhost:8090/api/v1/pro_cand", pro_cand);
    }



}

export default new ValuesService();