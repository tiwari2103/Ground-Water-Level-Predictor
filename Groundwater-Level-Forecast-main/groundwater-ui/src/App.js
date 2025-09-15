import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import Navbar from "./components/Navbar"
import HeroSection from "./components/Homepage/HeroSection"
import FeaturesSection from "./components/Homepage/FeaturesSection"
import Footer from "./components/Homepage/Footer"
import PredictionForm from "./components/PredictionForm/PredictionForm"
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"
import ForgotPassword from "./components/Auth/ForgotPassword"
import PrivateRoute from "./components/PrivateRoute"
import { AuthProvider } from "./context/AuthContext"
import theme from "./theme"
import axios from "axios"
import Dashboard from "./components/Dashboard/Dashboard"
import PredictionResultPage from "./components/PredictionResult/PredictionResultPage"
import Chatbot from "./components/Chatbot"
axios.defaults.baseURL = "http://localhost:8080/api"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <>
                        <HeroSection />
                        <FeaturesSection />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/predict"
                  element={
                    <PrivateRoute>
                      <PredictionForm />
                    </PrivateRoute>
                  }
                />
                <Route
  path="/prediction-result"
  element={
    <PrivateRoute>
      <PredictionResultPage />
    </PrivateRoute>
  }
/>


                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PrivateRoute>
                      <PlaceholderPage title="About Us" />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PrivateRoute>
                      <PlaceholderPage title="Contact Us" />
                    </PrivateRoute>
                  }
                />
                <Route
    path="/chatbot"
    element={
      <PrivateRoute>
        <Chatbot />
      </PrivateRoute>
    }
  />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

function PlaceholderPage({ title }) {
  return (
    <Box
      sx={{
        py: 10,
        px: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          p: 6,
          borderRadius: 4,
          bgcolor: "background.paper",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
          maxWidth: 800,
        }}
      >
        <Box
          sx={{
            mb: 4,
            p: 2,
            borderRadius: 2,
            display: "inline-block",
            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
            color: "white",
            fontWeight: "bold",
          }}
        >
          Coming Soon
        </Box>
        <Box component="h1" sx={{ mb: 4, fontSize: "2.5rem", fontWeight: "bold" }}>
          {title}
        </Box>
        <Box component="p" sx={{ fontSize: "1.1rem", color: "text.secondary", mb: 4 }}>
          This page is currently under development. We're working hard to bring you the best experience possible.
          Check back soon for updates!
        </Box>
      </Box>
    </Box>
  )
}

export default App
