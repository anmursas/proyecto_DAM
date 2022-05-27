package procesos.springboot;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import procesos.springboot.model.Proceso;
import procesos.springboot.model.PuestoTrabajo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class PuestoControllerTest extends AbstractTest {

    @Override
    @Before
    public void setUp() {
        super.setUp();
    }

    // Test the get method from puestoTrabajo, true if jsonResponse > 0
    @Test
    public void getPuestos() throws Exception {
        String uri = "/api/v1/puesto-trabajo";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        PuestoTrabajo[] puestos = super.mapFromJson(content, PuestoTrabajo[].class);
        assertTrue(puestos.length > 0);
    }

    @Test
    public void getProcesos() throws Exception {
        String uri = "/api/v1/proceso";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        Proceso[] procesos = super.mapFromJson(content, Proceso[].class);
        assertTrue(procesos.length > 1);
    }

}
