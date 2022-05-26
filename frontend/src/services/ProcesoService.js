import axios from 'axios';
import authHeader from './auth-header';

const PRO_API_BASE_URL = "http://localhost:8090/api/v1/proceso"

class ProcesoService {

    getAllProcesos() {
        return axios.get(PRO_API_BASE_URL, { headers: authHeader() });
    }

    createProceso(proceso) {
        return axios.post(PRO_API_BASE_URL, proceso)
    }

    deleteProceso(procesoId) {
        return axios.delete(PRO_API_BASE_URL + '/' + procesoId)
    }

    updateProceso(procesoId, proceso) {
        return axios.put(PRO_API_BASE_URL + '/' + procesoId, proceso, { headers: authHeader() })
    }

    getProcesoById(procesoId) {
        return axios.get(PRO_API_BASE_URL + '/' + procesoId, { headers: authHeader() })
    }


}

export default new ProcesoService();