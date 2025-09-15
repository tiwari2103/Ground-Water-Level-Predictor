"use client"

import { useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  useScrollTrigger,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Avatar,
  Tooltip,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material"
import { Link, useLocation, useNavigate } from "react-router-dom"
import WaterDropIcon from "@mui/icons-material/WaterDrop"
import MenuIcon from "@mui/icons-material/Menu"
import HomeIcon from "@mui/icons-material/Home"
import TimelineIcon from "@mui/icons-material/Timeline"
import InfoIcon from "@mui/icons-material/Info"
import ContactSupportIcon from "@mui/icons-material/ContactSupport"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import DashboardIcon from "@mui/icons-material/Dashboard"
import LogoutIcon from "@mui/icons-material/Logout"
import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }
    setDrawerOpen(open)
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleMenuClose()
    navigate("/")
  }

  // Update the navItems array to remove About and Contact from the main navigation
  // and only show them in the mobile drawer

  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon />, requiresAuth: false, alwaysShow: true },
    { name: "Predict", path: "/predict", icon: <TimelineIcon />, requiresAuth: true, alwaysShow: true },
    { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon />, requiresAuth: true, alwaysShow: true },
    { name: "About", path: "/about", icon: <InfoIcon />, requiresAuth: false, alwaysShow: false },
    { name: "Contact", path: "/contact", icon: <ContactSupportIcon />, requiresAuth: false, alwaysShow: false },
  ]

  // Then update the filteredNavItems for the main navigation bar
  // Filter nav items based on authentication status and alwaysShow property
  const filteredNavItems = navItems.filter(
    (item) => item.alwaysShow && (!item.requiresAuth || (item.requiresAuth && currentUser)),
  )

  // Create a separate array for the drawer that includes all items
  const drawerNavItems = navItems.filter((item) => !item.requiresAuth || (item.requiresAuth && currentUser))

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  const drawer = (
    <Box sx={{ width: 280 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: "white",
        }}
      >
        {currentUser ? (
          <>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                mb: 2,
                bgcolor: "white",
                color: theme.palette.primary.main,
              }}
            >
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
            </Avatar>
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
              {currentUser.name || "User"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
              {currentUser.email}
            </Typography>
          </>
        ) : (
          <>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                mb: 2,
              }}
            >
              <WaterDropIcon sx={{ fontSize: 30 }} />
            </Avatar>
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
              Groundwater Predictor
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
              Advanced Forecasting
            </Typography>
          </>
        )}
      </Box>

      <Divider />

      <List sx={{ pt: 2 }}>
        {drawerNavItems.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.name}
            sx={{
              py: 1.5,
              px: 3,
              borderLeft: isActive(item.path) ? `4px solid ${theme.palette.primary.main}` : "4px solid transparent",
              bgcolor: isActive(item.path) ? "rgba(33, 150, 243, 0.08)" : "transparent",
              color: isActive(item.path) ? "primary.main" : "text.primary",
              "&:hover": {
                bgcolor: "rgba(33, 150, 243, 0.05)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: isActive(item.path) ? "primary.main" : "text.secondary",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              primaryTypographyProps={{
                fontWeight: isActive(item.path) ? "bold" : "regular",
              }}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {currentUser ? (
        <List>
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              py: 1.5,
              px: 3,
            }}
          >
            <ListItemIcon
              sx={{
                color: "text.secondary",
                minWidth: 40,
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem
            button
            component={Link}
            to="/login"
            sx={{
              py: 1.5,
              px: 3,
            }}
          >
            <ListItemIcon
              sx={{
                color: "text.secondary",
                minWidth: 40,
              }}
            >
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/signup"
            sx={{
              py: 1.5,
              px: 3,
            }}
          >
            <ListItemIcon
              sx={{
                color: "text.secondary",
                minWidth: 40,
              }}
            >
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Up" />
          </ListItem>
        </List>
      )}

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Groundwater Predictor
        </Typography>
      </Box>
    </Box>
  )

  return (
    <>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "white",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  mr: 2,
                }}
              >
                <WaterDropIcon
                  sx={{
                    color: "white",
                  }}
                />
              </Avatar>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "text.primary",
                  letterSpacing: "0.5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Groundwater Predictor
              </Typography>
            </Box>

            {isMobile ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                  sx={{
                    color: "text.primary",
                    border: `1px solid ${theme.palette.divider}`,
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ display: "flex", mr: 2 }}>
                  {filteredNavItems.map((item) => (
                    <Button
                      key={item.name}
                      component={Link}
                      to={item.path}
                      startIcon={item.icon}
                      sx={{
                        mx: 0.5,
                        px: 2,
                        py: 1,
                        color: isActive(item.path) ? "primary.main" : "text.primary",
                        fontWeight: isActive(item.path) ? "bold" : "medium",
                        position: "relative",
                        overflow: "hidden",
                        "&:hover": {
                          bgcolor: "rgba(33, 150, 243, 0.08)",
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                </Box>

                {currentUser ? (
                  <>
                    <Tooltip title="Account">
                      <IconButton
                        color="inherit"
                        onClick={handleMenuOpen}
                        sx={{
                          color: "text.primary",
                          "&:hover": {
                            bgcolor: "rgba(0,0,0,0.04)",
                          },
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: theme.palette.primary.main,
                            fontSize: "0.875rem",
                          }}
                        >
                          {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                        </Avatar>
                      </IconButton>
                    </Tooltip>

                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      PaperProps={{
                        elevation: 3,
                        sx: {
                          minWidth: 200,
                          mt: 1.5,
                          borderRadius: 2,
                          overflow: "visible",
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <Box sx={{ px: 2, py: 1.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                          {currentUser.name || "User"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {currentUser.email}
                        </Typography>
                      </Box>
                      <Divider />
                      <MenuItem
                        onClick={() => {
                          handleMenuClose()
                          navigate("/profile")
                        }}
                      >
                        <ListItemIcon>
                          <AccountCircleIcon fontSize="small" />
                        </ListItemIcon>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Box sx={{ display: "flex" }}>
                    <Button
                      component={Link}
                      to="/login"
                      startIcon={<LoginIcon />}
                      sx={{
                        mr: 1,
                        color: theme.palette.primary.main,
                        "&:hover": {
                          bgcolor: "rgba(33, 150, 243, 0.08)",
                        },
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      component={Link}
                      to="/signup"
                      variant="contained"
                      startIcon={<PersonAddIcon />}
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        "&:hover": {
                          bgcolor: theme.palette.primary.dark,
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Add an empty toolbar to prevent content from hiding behind the fixed AppBar */}
      <Toolbar />

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            borderRadius: "12px 0 0 12px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default Navbar