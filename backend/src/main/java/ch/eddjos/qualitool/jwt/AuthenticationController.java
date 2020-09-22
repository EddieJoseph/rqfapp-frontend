package ch.eddjos.qualitool.jwt;

import ch.eddjos.qualitool.auth.BenutzerDTO;
import ch.eddjos.qualitool.auth.BenutzerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin//(methods = {RequestMethod.POST,RequestMethod.OPTIONS,RequestMethod.GET,RequestMethod.DELETE})
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private BenutzerService benutzerService;

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public void logout(){
        //TODO
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        String token = null;
        try {
            authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword(), benutzerService.loadSaltByUsername(authenticationRequest.getUsername()));

            final UserDetails userDetails = benutzerService.loadUserByUsername(authenticationRequest.getUsername());

            token = jwtTokenUtil.generateToken(userDetails);
        } catch(Exception ignore){
            throw new BadCredentialsException("INVALID_CREDENTIALS");
        }

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody BenutzerDTO user) throws Exception {
        return ResponseEntity.ok(benutzerService.save(user));
    }

    private void authenticate(String username, String password, String salt) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, salt + password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
