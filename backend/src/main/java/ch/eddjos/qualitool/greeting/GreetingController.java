package ch.eddjos.qualitool.greeting;

import ch.eddjos.qualitool.auth.Benutzer;
import ch.eddjos.qualitool.jwt.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class GreetingController {
    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @Autowired
    private JwtTokenUtil jwtTokenUtil;


    @GetMapping(value="/greeting",produces = "application/json")
    public Greeting greeting(Principal principal) {
//        System.out.println(principal.getName());
//        System.out.println(principal.getClass());
//
//        //System.out.println(((UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication()).getCredentials().getClass());
//        System.out.println((((UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication()).getPrincipal()).getClass());
//        System.out.println(((UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication()).getDetails().getClass());
//        System.out.println(((UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication()).getAuthorities().getClass());

        System.out.println(jwtTokenUtil.getUser());

        return new Greeting(counter.incrementAndGet(),
                String.format(template, "World"));
    }
}
