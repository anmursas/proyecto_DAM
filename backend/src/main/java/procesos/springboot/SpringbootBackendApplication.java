package procesos.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import procesos.springboot.model.*;
import procesos.springboot.repository.*;

import java.util.Optional;

@SpringBootApplication
public class SpringbootBackendApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(SpringbootBackendApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringbootBackendApplication.class, args);
    }


}
