import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import MUITypography from "../Component/MUIcomponent/MUITypography";
import MUIBox from "../Component/MUIcomponent/MUIBox";
import MUIButton from "../Component/MUIcomponent/MUIButton";
import LocalStorageService from "../Services/Localstorage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import i18n from "../i18next";

//sidebar
import { Grid } from "@mui/material";
import List from "@mui/material/List";
import CommentIcon from "@mui/icons-material/Comment";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useTranslation } from "react-i18next";

const pages = [
  { label: "Posts", path: "/posts" },
  { label: "Comments", path: "/comments" },
  { label: "Albums", path: "/albums" },
];
const settings = ["English", "Hindi", "Logout"];

const Privatelayout = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const { Children } = props;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    i18n.changeLanguage("en");
    LocalStorageService.logout();
    navigate("/register");
  };

  const changeLang = (l) => {
    i18n.changeLanguage(l);
  };

  //table show

  return (
    <MUIBox className="privatelayput">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <MUITypography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {t("Logo")}
            </MUITypography>

            <MUIBox sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={t(page.label)} onClick={handleCloseNavMenu}>
                    <MUITypography textAlign="center">
                      {
                        <Link to={page.path} className="linkbar">
                          {t(page.label)}
                        </Link>
                      }
                    </MUITypography>
                  </MenuItem>
                ))}
              </Menu>
            </MUIBox>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <MUITypography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {t("Logo")}
            </MUITypography>
            <MUIBox sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <MUIButton
                  key={page.label}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {
                    <Link className="linkbar" to={page.path}>
                      {t(page.label)}
                    </Link>
                  }
                </MUIButton>
              ))}
            </MUIBox>

            <MUIBox sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={t("English")} onClick={handleCloseUserMenu}>
                  <MUITypography
                    textAlign="center"
                    onClick={() => changeLang("en")}
                  >
                    {t("English")}
                  </MUITypography>
                </MenuItem>
                <MenuItem key={t("Hindi")} onClick={handleCloseUserMenu}>
                  <MUITypography
                    textAlign="center"
                    onClick={() => changeLang("hin")}
                  >
                    {t("Hindi")}
                  </MUITypography>
                </MenuItem>
                <MenuItem key={t("logout")} onClick={handleCloseUserMenu}>
                  <MUITypography textAlign="center" onClick={() => logout()}>
                    {t("Logout")}
                  </MUITypography>
                </MenuItem>
              </Menu>
            </MUIBox>
          </Toolbar>
        </Container>
      </AppBar>
      <MUIBox>
        <Grid Container sx={{ display: "flex" }}>
          <Grid item md={4}>
            <MUIBox role="presentation" className="sidebarlist">
              <List sx={{ minWidth: 250 }}>
                <ListItem key="dashboard" disablePadding>
                  <ListItemButton className="listitembutton">
                    <ListItemIcon>
                      <CommentIcon />
                    </ListItemIcon>
                    <Link to="/dashboard" className="linkbar">
                      <ListItemText className="linkbar">
                        {t("Dashboard")}
                      </ListItemText>
                    </Link>
                  </ListItemButton>
                </ListItem>
                {pages.map((pages, index) => (
                  <ListItem key={t(pages.label)} disablePadding>
                    <ListItemButton className="listitembutton">
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <CommentIcon />}
                      </ListItemIcon>
                      {
                        <Link to={pages.path} className="linkbar">
                          <ListItemText primary={t(pages.label)} />
                        </Link>
                      }
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </MUIBox>
          </Grid>
          <Grid item md={8} className="privatechildren">
            {children}
          </Grid>
        </Grid>
      </MUIBox>
    </MUIBox>
  );
};

export default Privatelayout;

// {
//   settings.map((setting) => (
//     <MenuItem key={setting} onClick={handleCloseUserMenu}>
//       <MUITypography textAlign="center" onClick={() => logout(setting)}>
//         {t(setting)}
//       </MUITypography>
//     </MenuItem>
//   ));
// }
