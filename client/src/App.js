import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { blue } from "@mui/material/colors";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Memo from "./pages/Memo";
import Profile from "./pages/Profile";

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
            {/* AuthLayoutはLoginとRegisterに共通するコンポーネント */}
            <Route path="/" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/" element={<AppLayout />}>
              {/* indexは親と同じpathを指定する */}
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
