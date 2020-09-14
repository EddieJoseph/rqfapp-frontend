package ch.eddjos.qualitool;

import de.dentrassi.crypto.pem.PemKeyStoreProvider;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Profile;

import java.security.Security;


@SpringBootApplication
public class Qualitool extends SpringBootServletInitializer {
    public static void main(String[] args){
        Security.addProvider(new PemKeyStoreProvider());
        SpringApplication.run(Qualitool.class, args);
    }
}
