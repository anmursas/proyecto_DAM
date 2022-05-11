import axios from 'axios';

const PRO_API_BASE_URL = "http://localhost:8090/api/v1/proceso"

class ProcesoService {

    getAllProcesos() {

        return axios.get(PRO_API_BASE_URL);
    }

    createProceso(proceso) {
        return axios.post(PRO_API_BASE_URL, proceso)
    }


    deleteProceso(procesoId) {
        return axios.delete(PRO_API_BASE_URL + '/' + procesoId)
    }

    updateProceso(procesoId, proceso) {
        return axios.put(PRO_API_BASE_URL + '/' + procesoId, proceso)
    }

    getProcesoById(procesoId) {
        return axios.get(PRO_API_BASE_URL + '/' + procesoId)
    }
    getProcesoByReclutador(recluId) {
        return axios.get(PRO_API_BASE_URL + '/reclu/' + recluId)
    }

}

export default new ProcesoService();