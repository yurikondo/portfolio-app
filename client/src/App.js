import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Followings from "./pages/Followings";
import Favorite from "./pages/Favorite";
import UserProfile from "./pages/UserUserProfile";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { blue } from "@mui/material/colors";

function App() {
  const theme = createTheme({
    palette: { mode: "dark", primary: blue },
  });

  // テーマ(https://mui.com/material-ui/customization/theming/)
  return (
    <ThemeProvider theme={theme}>
      {/* デフォルトのCSSをリセット */}
      <CssBaseline>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              {/* indexは親と同じpathを指定する */}
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="favorite" element={<Favorite />} />
              <Route path="followings" element={<Followings />} />
              <Route path="user-profile/:userId" element={<UserProfile />} />
            </Route>
            {/* AuthLayoutはLoginとRegisterに共通するコンポーネント */}
            <Route path="/" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
