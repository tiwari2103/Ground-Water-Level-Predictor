package Project.Ground_Water_Predictor;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.HashMap;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import Project.Ground_Water_Predictor.History.HistoryService;
import Project.Ground_Water_Predictor.History.PredictionHistory;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ControllerGWL {
	
	private PredictionService predictionService;
	
	private HistoryService historyService;

	public ControllerGWL(PredictionService predictionService , HistoryService historyService) {
		super();
		this.predictionService = predictionService;
		this.historyService = historyService;
	}
	
	@PostMapping(value = "/gwl", consumes = "application/json", produces = "application/json")
	public Map<String, String> predictGWl(@RequestBody Input_Features features) throws IOException, InterruptedException {
	    String prediction = predictionService.predictGWL(features);
	    historyService.AddHistory(features, prediction);
	    Map<String, String> response = new HashMap<>();
	    response.put("prediction", prediction);
	    return response;
	}

	
	@GetMapping("/history/{email}")
	public List<PredictionHistory> history(@PathVariable String email) throws Exception{
		return historyService.PredictionHistory(email);
	}
}

