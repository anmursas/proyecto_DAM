package procesos.springboot;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import procesos.springboot.model.Dpto;
import procesos.springboot.repository.DptoRepository;


import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class SpringbootBackendApplicationTests {

//    @Autowired
//    DptoRepository dptoRepository;
//
//    @Test
//    public void testCreate() {
//        Dpto p = new Dpto();
//        p.setNombre("TEST1");
//        p.setSiglas("TST1");
//        dptoRepository.save(p);
//        assertNotNull(dptoRepository.findById(11L).get());
//        dptoRepository.deleteById(11L);
//
//    }
//
//    @Test
//    public void testReadAll() {
//        List<Dpto> list = dptoRepository.findAll();
//        assertThat(list).size().isGreaterThan(0);
//    }
//
//    @Test
//    public void testSignelDpto() {
//        Dpto dpto = dptoRepository.findById(1L).get();
//        assertEquals("ARQ",dpto.getSiglas());
//    }



}
