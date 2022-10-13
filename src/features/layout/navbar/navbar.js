import "./navbar.css";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import Link from "@mui/material/Link";
import BookIcon from "../../../assets/images/book.png";
import { useNavigate } from "react-router-dom";
import constant from "../../../constants/constant";
import jwt_decode from "jwt-decode";

const pages = [
  { label: "Dashboard", url: "/dashboard" },
  { label: "Create Test", url: "/template/create" },
  { label: "My Test", url: "/manage/test" },
  { label: "Manage Class", url: "/manage/class" },
  { label: "Manage Template", url: "/manage/template" },
];

const studentPages = [
  { label: "Dashboard", url: "/dashboard" },
  { label: "My Test", url: "/manage/test" },
];

const fakePages = [];

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [permission, setPermission] = React.useState(-1);

  React.useEffect(() => {
    const token = localStorage.getItem(constant.localStorage.TOKEN);
    if (token != null && token.length > 0) {
      const decoded = jwt_decode(token);
      setPermission(parseInt(decoded.role));
    }
  }, []);

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

  return (
    <AppBar className="navBar" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            LOGO
          </Typography> */}
          <img
            src={BookIcon}
            id="logo"
            onClick={() => {
              navigate("./");
            }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              {permission === -1 ||
              permission == null ||
              permission == undefined
                ? fakePages.map((page) => (
                    <MenuItem key={page.url}>
                      <Link href={page.url}>{page.label}</Link>
                    </MenuItem>
                  ))
                : permission === 2
                ? pages.map((page) => (
                    <MenuItem key={page.url}>
                      <Link href={page.url}>{page.label}</Link>
                    </MenuItem>
                  ))
                : studentPages.map((page) => (
                    <MenuItem key={page.url}>
                      <Link href={page.url}>{page.label}</Link>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {permission === -1 ||
            permission == null ||
            permission == undefined ? (
              <></>
            ) : permission === 2 ? (
              pages.map((page) => (
                <MenuItem
                  className="menu_item"
                  key={page.url}
                  onClick={() => {}}
                >
                  <a className="menu_item" textAlign="center" href={page.url}>
                    {page.label}
                  </a>
                </MenuItem>
              ))
            ) : (
              studentPages.map((page) => (
                <MenuItem
                  className="menu_item"
                  key={page.url}
                  onClick={() => {}}
                >
                  <a className="menu_item" textAlign="center" href={page.url}>
                    {page.label}
                  </a>
                </MenuItem>
              ))
            )}
          </Box>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 0 }}>
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
              <MenuItem
                key={"logout"}
                onClick={() => {
                  navigate("/personal-info");
                }}
              >
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem
                key={"logout"}
                onClick={() => {
                  console.log("PASSWORD CHANGED");
                }}
              >
                <Typography textAlign="center">Change Password</Typography>
              </MenuItem>
              <MenuItem
                key={"logout"}
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
