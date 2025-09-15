"use client"

import { useState } from "react"
import { Box, Container, Grid, Paper, Typography, Tabs, Tab, useTheme, Divider } from "@mui/material"
import HistoryPage from "./HistoryPage"
import HistoryIcon from "@mui/icons-material/History"
import DashboardIcon from "@mui/icons-material/Dashboard"
import SettingsIcon from "@mui/icons-material/Settings"
import { useAuth } from "../../context/AuthContext"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0)
  const theme = useTheme()
  const { currentUser } = useAuth()

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Container maxWidth="xl" sx={{ my: 8, pt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: theme.shape.borderRadius,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,1))",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: "white",
          }}
        >
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            Dashboard
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
            Welcome back, {currentUser?.name || "User"}
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="dashboard tabs"
            sx={{
              "& .MuiTab-root": {
                py: 2,
                px: 3,
              },
            }}
          >
            <Tab icon={<DashboardIcon />} label="Overview" iconPosition="start" sx={{ fontWeight: "medium" }} />
            {/* <Tab icon={<HistoryIcon />} label="Prediction History" iconPosition="start" sx={{ fontWeight: "medium" }} /> */}
            <Tab icon={<SettingsIcon />} label="Settings" iconPosition="start" sx={{ fontWeight: "medium" }} />
          </Tabs>
        </Box>

        <Box sx={{ p: 0 }}>
          {activeTab === 0 && (
            <Box sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Overview
              </Typography>
              <Typography variant="body1" paragraph>
                This is a placeholder for the dashboard overview. Future versions will include statistics, charts, and
                insights about your groundwater predictions.
              </Typography>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      height: "100%",
                      borderTop: `4px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Recent Predictions
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      View your prediction history in the Prediction History tab.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      height: "100%",
                      borderTop: `4px solid ${theme.palette.secondary.main}`,
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Trends
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      Groundwater trend analysis will be available in future updates.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      height: "100%",
                      borderTop: `4px solid ${theme.palette.warning.main}`,
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Recommendations
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      AI-powered recommendations will be available in future updates.
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
          {activeTab === 1 && <HistoryPage />}
          {activeTab === 2 && (
            <Box sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Settings
              </Typography>
              <Typography variant="body1">
                This is a placeholder for user settings. Future versions will include profile management, notification
                preferences, and other settings.
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  )
}

export default Dashboard