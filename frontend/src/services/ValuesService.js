import { CompressOutlined } from '@mui/icons-material';
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8090/api";

class ValuesService {

    getAllDpto() {
        return axios.get(API_URL + "/v1/dpto", { headers: authHeader() });
    }

    getAllCt() {
        return axios.get(API_URL + "/v1/centro-trabajo", { headers: authHeader() })
    }

    getAllReclu() {
        return axios.get(API_URL + "/v1/reclutador", { headers: authHeader() })
    }

    getAllVincus() {
        return axios.get(API_URL + "/v1/vinculacion", { headers: authHeader() })
    }

    getAllPuestos() {
        return axios.get(API_URL + "/v1/puesto-trabajo", { headers: authHeader() })
    }

    getPuestoById(id) {
        return axios.get(API_URL + "/v1/puesto-trabajo/" + id, { headers: authHeader() })
    }

    getAllTc() {
        return axios.get(API_URL + "/v1/contratacion", { headers: authHeader() })
    }

    getAllJl() {
        return axios.get(API_URL + "/v1/jornada-laboral", { headers: authHeader() })
    }

    getAllCandidatos() {
        return axios.get(API_URL + "/v1/candidatos", { headers: authHeader() })
    }

    getAllTa() {
        return axios.get(API_URL + "/v1/titulacion-academica", { headers: authHeader() })
    }

    getAllProcesoss() {
        return axios.get(API_URL + "/v1/procesos", { headers: authHeader() })
    }

    createCandidato(candidato) {
        return axios.post(API_URL + "/v1/candidatos", candidato, { headers: authHeader() })
    }

    getCandidatoById(id) {
        return axios.get(API_URL + "/v1/candidatos/" + id, { headers: authHeader() });
    }

    deleteProcesoCandidato(id) {
        return axios.delete(API_URL + "/v1/pro_cand/" + id, { headers: authHeader() });
    }

    getProcesoCandidato() {
        return axios.get(API_URL + "/v1/pro_cand", { headers: authHeader() });
    }
    getProcesoCandidatobyId(id) {
        return axios.get(API_URL + "/v1/pro_cand/" + id, { headers: authHeader() });
    }

    putProcesoCandidato(id, pro_cand) {
        return axios.put(API_URL + "/v1/pro_cand/" + id, pro_cand, { headers: authHeader() })
    }

    postProcesoCandidato(pro_cand) {
        return axios.post(API_URL + "/v1/pro_cand", pro_cand, { headers: authHeader() });
    }

    isAdmin() {
        return axios.get(API_URL + "/v1/reclutador/validate", { headers: authHeader() })
    }

    getIdFromToken() {
        return axios.get(API_URL + "/v1/reclutador/get-id", { headers: authHeader() })
    }

    deleteCandidato(id) {
        return axios.delete(API_URL + '/v1/candidatos/' + id, { headers: authHeader() })
    }

    updateCandidato(id, candidato) {
        return axios.put(API_URL + '/v1/candidatos/' + id + candidato, { headers: authHeader() })
    }

    getCandidatosPorDepartamento(id) {
        return axios.get(API_URL + '/v1/proceso/dpto/' + id, { headers: authHeader() })
    }

    getSeleccionadosPorDepartamento(id) {
        return axios.get(API_URL + '/v1/proceso/dpto-s/' + id, { headers: authHeader() })
    }

    getProcesosFiltrados(dates) {
        return axios.post("http://localhost:8090/api/v1/proceso/date", dates)
    }

    getUserByReqyest() {
        return axios.get(API_URL + '/v1/reclutador/byid', { headers: authHeader() })
    }

}

export default new ValuesService();