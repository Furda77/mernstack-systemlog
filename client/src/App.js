//Slouží jako hlavní soubor pro tuto webovou aplikaci, inicializuje MUI- pro styling, REDUX pro state management a Router pro navigaci v aplikaci.
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Admin from "scenes/admin";
import SystemLogs from "scenes/systemdata";
import Form from "scenes/form";
import Overview from "scenes/overview";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Layout element slouží pro rozložení elementů na webu. Tento element obsahuje navigační menu a boční panel na stránce*/}
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/logs" element={<SystemLogs />} />
              <Route path="/form" element={<Form />} />
              <Route path="/overview" element={<Overview />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
