"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  useTheme,
  IconButton,
  Tooltip,
  TablePagination,
} from "@mui/material"
import { useAuth } from "../../context/AuthContext"
import HistoryIcon from "@mui/icons-material/History"
import InfoIcon from "@mui/icons-material/Info"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useNavigate } from "react-router-dom"
import api from "../../api/authApi"

const HistoryPage = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { currentUser } = useAuth()
  const theme = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchHistory = async () => {
      if (!currentUser || !currentUser.email) {
        setError("User information not available")
        setLoading(false)
        return
      }

      try {
        const response = await api.get(`/history/${currentUser.email}`)
        setHistory(Array.isArray(response.data) ? response.data : [response.data])
      } catch (error) {
        console.error("Error fetching history:", error)
        setError("Failed to fetch prediction history. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [currentUser])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getSeason = (prediction) => {
    return prediction.postMonsoon === 1 ? "Post-Monsoon" : "Pre-Monsoon"
  }

  const viewPredictionDetails = (prediction) => {
    // Create a prediction data object that matches what PredictionResults expects
    const predictionData = {
      state: prediction.location.split(",")[0] || "Not specified",
      location: prediction.location.split(",")[1] || prediction.location,
      rainfall: prediction.rainfall,
      maxTemperature: prediction.maxTemperature,
      minTemperature: prediction.minTemperature,
      morningHumidity: prediction.morningHumidity,
      eveningHumidity: prediction.eveningHumidity,
      preMonsoon: prediction.postMonsoon === 1 ? 0 : 1,
      postMonsoon: prediction.postMonsoon,
      groundwaterLevel: Number.parseFloat(prediction.prediction.match(/\d+(\.\d+)?/)?.[0] || 0),
    }

    navigate("/prediction-result", { state: { predictionData } })
  }

  return (
    <Container sx={{ my: 8, pt: 4 }}>
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
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <HistoryIcon sx={{ mr: 2, color: theme.palette.primary.main, fontSize: 32 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            Prediction History
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        ) : history.length === 0 ? (
          <Alert severity="info" sx={{ my: 2 }}>
            No prediction history found. Make a prediction to see it here.
          </Alert>
        ) : (
          <>
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Date & Time</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Rainfall (mm)</TableCell>
                    <TableCell>Temperature (°C)</TableCell>
                    <TableCell>Humidity (%)</TableCell>
                    <TableCell>Season</TableCell>
                    <TableCell>Prediction</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((prediction) => (
                    <TableRow key={prediction.predictionId} hover>
                      <TableCell>{formatDate(prediction.timestamp)}</TableCell>
                      <TableCell>{prediction.location}</TableCell>
                      <TableCell>{prediction.rainfall}</TableCell>
                      <TableCell>
                        {prediction.minTemperature} - {prediction.maxTemperature}
                      </TableCell>
                      <TableCell>
                        {prediction.morningHumidity} - {prediction.eveningHumidity}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getSeason(prediction)}
                          size="small"
                          color={prediction.postMonsoon === 1 ? "primary" : "secondary"}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title={prediction.prediction}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                              {prediction.prediction}
                            </Typography>
                            <InfoIcon fontSize="small" color="action" sx={{ ml: 1 }} />
                          </Box>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Details">
                          <IconButton color="primary" size="small" onClick={() => viewPredictionDetails(prediction)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={history.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </Container>
  )
}

export default HistoryPage
