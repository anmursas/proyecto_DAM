import axios from 'axios';

const DTO_API_BASE_URL = "http://localhost:8090/api/v1/dpto"
class DptoService {

    getAllDpto() {

        return axios.get(DTO_API_BASE_URL);
    }

    

}

export default new DptoService();