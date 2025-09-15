package Project.Ground_Water_Predictor.History;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PredictionHistoryRepo extends JpaRepository<PredictionHistory, Integer> {
    List<PredictionHistory> findByUser_UserId(int userId);
}
