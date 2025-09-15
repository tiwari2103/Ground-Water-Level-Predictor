// PredictionResultPage.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Divider,
  Chip,
  Button,
  useTheme,
} from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterIcon from "@mui/icons-material/Water";
import PublicIcon from "@mui/icons-material/Public";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatIcon from "@mui/icons-material/Chat"; // Chat icon for the button
import Chatbot from "../Chatbot";

const PredictionResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const predictionData = location.state?.predictionData;

  useEffect(() => {
    if (!predictionData) {
      navigate("/predict");
    }
  }, [predictionData, navigate]);

  if (!predictionData) {
    return null;
  }

  const formatLocation = (locationString) => {
    if (!locationString) return "Not specified";

    const locations = {
      pune: "Pune",
      mumbai: "Mumbai",
      nagpur: "Nagpur",
      nashik: "Nashik",
      aurangabad: "Aurangabad",
      ranchi: "Ranchi",
      jamshedpur: "Jamshedpur",
      dhanbad: "Dhanbad",
      bokaro: "Bokaro",
      hazaribagh: "Hazaribagh",
      jaipur: "Jaipur",
      jodhpur: "Jodhpur",
      udaipur: "Udaipur",
      kota: "Kota",
      bikaner: "Bikaner",
      patna: "Patna",
      gaya: "Gaya",
      muzaffarpur: "Muzaffarpur",
      bhagalpur: "Bhagalpur",
      darbhanga: "Darbhanga",
      kolkata: "Kolkata",
      howrah: "Howrah",
      durgapur: "Durgapur",
      asansol: "Asansol",
      siliguri: "Siliguri",
    };

    return locations[locationString.toLowerCase()] || locationString.charAt(0).toUpperCase() + locationString.slice(1);
  };

  const getMonsoonPeriod = () => {
    if (predictionData.preMonsoon === 1) return "Pre-Monsoon";
    if (predictionData.postMonsoon === 1) return "Post-Monsoon";
    return "Not specified";
  };

  const handleBackToForm = () => {
    navigate("/predict");
  };

 const handleGoToChatbot = () => {
  const mbglValue = predictionData.prediction?.split(" ")[0]; // Extract numeric part
  navigate("/chatbot", { state: { mbgl: mbglValue } });
};


  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBackToForm}
        sx={{ mb: 4 }}
      >
        Back to Prediction Form
      </Button>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: theme.shape.borderRadius,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,1))",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.1)",
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "5px",
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          },
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: theme.palette.text.primary,
          }}
        >
          Groundwater Prediction Results
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Chip
            label="Prediction Parameters"
            sx={{
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
              color: "white",
              fontWeight: "medium",
            }}
          />
          <Grid container spacing={2}>
            {/* State */}
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PublicIcon color="primary" />
                <Typography variant="subtitle2" color="text.secondary">
                  State
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: "medium", ml: 4 }}>
                {predictionData.state || "Not specified"}
              </Typography>
            </Grid>

            {/* Location */}
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon color="primary" />
                <Typography variant="subtitle2" color="text.secondary">
                  Location
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: "medium", ml: 4 }}>
                {formatLocation(predictionData.location) || "Not specified"}
              </Typography>
            </Grid>

            {/* Period */}
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarMonthIcon color="primary" />
                <Typography variant="subtitle2" color="text.secondary">
                  Period
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: "medium", ml: 4 }}>
                {getMonsoonPeriod()}
              </Typography>
            </Grid>

            {/* Temperature */}
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ThermostatIcon color="primary" />
                <Typography variant="subtitle2" color="text.secondary">
                  Temperature Range
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: "medium", ml: 4 }}>
                {predictionData.minTemperature && predictionData.maxTemperature 
                  ? `${predictionData.minTemperature}°C to ${predictionData.maxTemperature}°C` 
                  : "Not specified"}
              </Typography>
            </Grid>

            {/* Rainfall */}
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WaterIcon color="primary" />
                <Typography variant="subtitle2" color="text.secondary">
                  Rainfall
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: "medium", ml: 4 }}>
                {predictionData.rainfall ? `${predictionData.rainfall} mm` : "Not specified"}
              </Typography>
            </Grid>

            {/* Morning Humidity */}
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WbSunnyIcon color="primary" />
                <Typography variant="subtitle2" color="text.secondary">
                  Morning Humidity
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: "medium", ml: 4 }}>
                {predictionData.morningHumidity ? `${predictionData.morningHumidity}%` : "Not specified"}
              </Typography>
            </Grid>

            {/* Evening Humidity */}
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WbTwilightIcon color="primary" />
                <Typography variant="subtitle2" color="text.secondary">
                  Evening Humidity
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: "medium", ml: 4 }}>
                {predictionData.eveningHumidity ? `${predictionData.eveningHumidity}%` : "Not specified"}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Prediction Summary */}
        <Box sx={{ mt: 4 }}>
          <Chip
            label="Prediction Summary"
            sx={{
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
              color: "white",
              fontWeight: "medium",
            }}
          />
          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: theme.shape.borderRadius,
              background: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <Typography variant="body1" paragraph>
              Based on the provided data for {formatLocation(predictionData.location || "")} in {predictionData.state || "your region"} during{" "}
              {getMonsoonPeriod()}, our model predicts the following groundwater level:
            </Typography>
            <Grid container spacing={3}>
              {/* Prediction Value */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                    bgcolor: "rgba(33, 150, 243, 0.05)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <OpacityIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 1 }} />
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Predicted Groundwater Level
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                      textAlign: "center",
                    }}
                  >
                    {predictionData.prediction ? `${predictionData.prediction} mbgl` : "Calculating..."}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, textAlign: "center" }}>
                    meters below ground level
                  </Typography>
                </Box>
              </Grid>

              {/* Confidence */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    borderLeft: `4px solid ${theme.palette.secondary.main}`,
                    bgcolor: "rgba(0, 121, 107, 0.05)",
                    height: "100%",
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    Confidence Interval
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}>
                    {predictionData.confidenceInterval ? `±${predictionData.confidenceInterval} meters` : "±0.5 meters"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    This represents the statistical uncertainty in our prediction.
                  </Typography>
                </Box>
              </Grid>

              {/* Quality */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    borderLeft: `4px solid ${theme.palette.warning.main}`,
                    bgcolor: "rgba(255, 152, 0, 0.05)",
                    height: "100%",
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    Water Quality Assessment
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.warning.main }}>
                    {(() => {
                      const predictionValue = predictionData.prediction 
                        ? parseFloat(predictionData.prediction.split(" ")[0]) 
                        : null;

                      if (predictionValue === null) return "Insufficient Data";
                      if (predictionValue < 5) return "Excellent";
                      if (predictionValue < 10) return "Good";
                      if (predictionValue < 15) return "Moderate";
                      if (predictionValue < 20) return "Poor";
                      return "Critical";
                    })()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Based on depth and regional water quality patterns.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Chatbot Button at Bottom */}
        {/* <Box sx={{ textAlign: "center", mt: 5 }}>
          <Button
            variant="contained"
            startIcon={<ChatIcon />}
            onClick={handleGoToChatbot}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              borderRadius: "999px",
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: "#fff",
              "&:hover": {
                background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              },
            }}
          >
            AI Report
          </Button>
        </Box> */}
      </Paper>
       <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            startIcon={<ChatIcon />}
            onClick={handleGoToChatbot}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              borderRadius: "999px",
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: "#fff",
              "&:hover": {
                background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              },
            }}
          >
            AI Report
          </Button>
        </Box>
    </Container>
  );
};

export default PredictionResultPage;
