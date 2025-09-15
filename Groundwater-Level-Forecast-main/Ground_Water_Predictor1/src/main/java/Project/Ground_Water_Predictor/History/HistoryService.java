package Project.Ground_Water_Predictor.History;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import Project.Ground_Water_Predictor.Input_Features;

@Service
public class HistoryService {
	private UsersRepo userRepo;
	private PredictionHistoryRepo historyRepo;
	
	public HistoryService(UsersRepo userRepo, PredictionHistoryRepo historyRepo) {
		super();
		this.userRepo = userRepo;
		this.historyRepo = historyRepo;
	}
	
	public void AddHistory(Input_Features features , String prediction) {
		int userId = 1;
		Users user = userRepo.findById(userId).orElse(null);
		if(user == null) {
			Users newUser = new Users();
			newUser.setUserId(userId);
			newUser.setUserName("Pranav");
		}
		
		LocalDateTime now = LocalDateTime.now();
        
		PredictionHistory history = new PredictionHistory();
		history.setEveningHumidity(features.getEveningHumidity());
		history.setMorningHumidity(features.getMorningHumidity());
		history.setMaxTemperature(features.getMaxTemperature());
		history.setMinTemperature(features.getMinTemperature());
		history.setPreMonsoon(features.getPreMonsoon());
		history.setPostMonsoon(features.getPostMonsoon());
		history.setRainfall(features.getRainfall());
		history.setLocation(features.getLocation());
		history.setPrediction(prediction);
		history.setTimestamp(now);
		history.setUser(user);
		
		historyRepo.save(history);
	}
	
	public List<PredictionHistory> PredictionHistory(String email) throws Exception{
		Users user = userRepo.findByEmail(email).orElse(null);
		if(user == null) {
			throw new RuntimeException("User not found");
		}
		List<PredictionHistory> history = historyRepo.findByUser_UserId(user.getUserId());
		return history;
	}
	
}
