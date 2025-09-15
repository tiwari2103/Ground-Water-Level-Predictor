# Groundwater Level Prediction System

A machine learning-based application for predicting groundwater levels using environmental parameters.

## 🚀 Features

- Random Forest & Gradient Boosting models for groundwater prediction
- Multi-region support (Maharashtra, Jharkhand, Bihar)
- React frontend with Spring Boot backend
- AI-powered downloadable reports
- Interactive visualization dashboard

## 📊 Model Performance

| Region | Random Forest | Gradient Boosting |
|--------|---------------|-------------------|
| Maharashtra | 90.91% | 75.00% |
| Jharkhand | 66.67% | 33.33% |
| Bihar | 64.29% | - |

## 🛠️ Tech Stack

- **Frontend:** React.js, Chart.js
- **Backend:** Spring Boot, Java
- **ML Service:** Python, scikit-learn
- **Database:** MySQL, MongoDB

## 🏗️ Installation

```bash
# Clone repository
git clone https://github.com/username/groundwater-prediction.git
cd groundwater-prediction

# Backend setup
cd backend
./mvnw spring-boot:run

# Frontend setup
cd frontend
npm install && npm start


## 📝 API Usage

```bash
POST /api/v1/predict
{
  "station": "Mumbai",
  "period": "Pre-Monsoon",
  "rainfall": 150.5,
  "maxTemp": 35.2,
  "minTemp": 22.8,
  "morningHumidity": 78,
  "eveningHumidity": 65
}
```

## 📁 Project Structure

```
├── backend/           # Spring Boot application
├── frontend/          # React application  
├── ml-service/        # Python ML models
├── data/             # Dataset files
└── docs/             # Documentation
```

## 👥 Team

- Pranav Khode
- Hassan Ahmad
- Piyush Tiwari
- Pranup Tiwari 

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
