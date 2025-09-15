package Project.Ground_Water_Predictor.History;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface UsersRepo extends JpaRepository<Users, Integer> {
    Users findByUserName(String userName);

	Optional<Users> findByEmail(String email);
}
