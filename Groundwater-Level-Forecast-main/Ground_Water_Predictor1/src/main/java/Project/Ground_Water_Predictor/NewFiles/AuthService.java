package Project.Ground_Water_Predictor.NewFiles;

import Project.Ground_Water_Predictor.History.Users;
import Project.Ground_Water_Predictor.History.UsersRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsersRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public String register(String name, String email, String password) {
        if (userRepo.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email is already registered!");
        }

        Users user = new Users();
        user.setUserName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        userRepo.save(user);

        return jwtUtil.generateToken(email);
    }

    public String login(String email, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        return jwtUtil.generateToken(email);
    }

    public boolean validateToken(String token) {
        String email = jwtUtil.extractEmail(token);
        if (email == null) return false;

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        return jwtUtil.validateToken(token, userDetails);
    }

    public Optional<Users> getCurrentUser(String token) {
        String email = jwtUtil.extractEmail(token);
        if (email == null) return Optional.empty();
        return userRepo.findByEmail(email);
    }

    public Users getUserByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    public List<String> getAllRegisteredEmails() {
        return userRepo.findAll()
                .stream()
                .map(Users::getEmail)
                .toList();
    }
}
