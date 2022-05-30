package procesos.springboot;

import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import procesos.springboot.model.*;
import procesos.springboot.payload.request.LoginRequest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class GetControllerTests extends AbstractTest {

    @Override
    @Before
    public void setUp() {
        super.setUp();
    }

    @Test
    public void getAllCandidatos() throws Exception {
        String uri = "/api/v1/candidatos";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        Candidatos[] candidatos = super.mapFromJson(content, Candidatos[].class);
        assertTrue(candidatos.length > 0);
    }

    @Test
    public void getAllCentroTrabajo() throws Exception {
        String uri = "/api/v1/centro-trabajo";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        CentroTrabajo[] centroTrabajos = super.mapFromJson(content, CentroTrabajo[].class);
        assertTrue(centroTrabajos.length > 0);
    }

    @Test
    public void getAllContratacion() throws Exception {
        String uri = "/api/v1/contratacion";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        Contratacion[] contratacions = super.mapFromJson(content, Contratacion[].class);
        assertTrue(contratacions.length > 0);
    }

    @Test
    public void getAllDpto() throws Exception {
        String uri = "/api/v1/dpto";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        Dpto[] dptos = super.mapFromJson(content, Dpto[].class);
        assertTrue(dptos.length > 0);
    }

    @Test
    public void getAllJl() throws Exception {
        String uri = "/api/v1/jornada-laboral";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        JornadaLaboral[] jornadaLaborals = super.mapFromJson(content, JornadaLaboral[].class);
        assertTrue(jornadaLaborals.length > 0);
    }

    @Test
    public void getProcesos() throws Exception {
        String uri = "/api/v1/proceso";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        System.out.println(content);
        // Porque no tiene nigun authorized
        assertTrue(content.isEmpty());
    }

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
    public void getAllReclutador() throws Exception {
        String uri = "/api/v1/reclutador";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        Reclutador[] reclutadors = super.mapFromJson(content, Reclutador[].class);
        assertTrue(reclutadors.length > 0);
    }

    @Test
    public void getAllTitulaciones() throws Exception {
        String uri = "/api/v1/titulacion-academica";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        TitulacionAcademica[] titulacionAcademicas = super.mapFromJson(content, TitulacionAcademica[].class);
        assertTrue(titulacionAcademicas.length > 0);
    }

    @Test
    public void getAllVinculacion() throws Exception {
        String uri = "/api/v1/vinculacion";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        Vinculacion[] vinculacions = super.mapFromJson(content, Vinculacion[].class);
        assertEquals(2, vinculacions.length);
    }

    @Test
    public void loginTest() throws Exception {
        String uri = "/api/auth/signin";

        LoginRequest loginRequest = new LoginRequest("admin", "adminadmin");

        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri, new LoginRequest("admin", "adminadmin"))
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();
        int status = mvcResult.getResponse().getStatus();

        assertEquals(200, status);
    }

}
