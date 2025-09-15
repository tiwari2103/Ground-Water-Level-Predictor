"use client"

import { Box, Typography, Paper, useTheme } from "@mui/material"
import LocationOnIcon from "@mui/icons-material/LocationOn"

const MapVisualization = ({ location, state, groundwaterLevel }) => {
  const theme = useTheme()

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: theme.shape.borderRadius,
        background: "rgba(255, 255, 255, 0.7)",
      }}
    >
      <LocationOnIcon sx={{ fontSize: 48, color: theme.palette.secondary.main, mb: 2 }} />
      <Typography variant="h6" gutterBottom align="center">
        Location Map
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {location ? `${location}, ${state}` : "Location not specified"}
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "200px",
          mt: 3,
          bgcolor: "rgba(0, 121, 107, 0.1)",
          borderRadius: theme.shape.borderRadius,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Map visualization will be available in future updates
        </Typography>
      </Box>
    </Paper>
  )
}

export default MapVisualization
