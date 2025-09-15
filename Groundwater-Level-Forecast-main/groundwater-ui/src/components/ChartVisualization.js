"use client"

import { Box, Typography, Paper, useTheme } from "@mui/material"
import OpacityIcon from "@mui/icons-material/Opacity"

const ChartVisualization = ({ groundwaterLevel }) => {
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
      <OpacityIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
      <Typography variant="h6" gutterBottom align="center">
        Groundwater Level Chart
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Visualization of predicted groundwater level: {groundwaterLevel ? `${groundwaterLevel} mbgl` : "Not available"}
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "200px",
          mt: 3,
          bgcolor: "rgba(33, 150, 243, 0.1)",
          borderRadius: theme.shape.borderRadius,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Chart visualization will be available in future updates
        </Typography>
      </Box>
    </Paper>
  )
}

export default ChartVisualization
