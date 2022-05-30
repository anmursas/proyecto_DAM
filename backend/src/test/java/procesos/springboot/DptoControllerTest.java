package procesos.springboot;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import procesos.springboot.controller.DptoController;
import procesos.springboot.model.Dpto;
import procesos.springboot.model.Proceso;
import procesos.springboot.repository.DptoRepository;
import procesos.springboot.repository.ProcesoRepository;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(DptoController.class)
public class DptoControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper mapper;

    @MockBean
    DptoRepository dptoRepository;

    @MockBean
    ProcesoRepository procesoRepository;

    Proceso p = new Proceso();


    Dpto dpto1 = new Dpto("TEST1", "TST1");

    Dpto dpto2 = new Dpto("TEST2", "TST2");
    Dpto dpto3 = new Dpto("TEST3", "TST3");

    @Test
    public void getAllDpto_success() throws Exception {
        List<Dpto> record = new ArrayList<>(Arrays.asList(dpto1, dpto2, dpto3));

        Mockito.when(dptoRepository.findAll()).thenReturn(record);

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/dpto")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[2].nombre", is("TEST3")));
    }

}
