import "./styles/index.css";
import { createRoot } from "react-dom/client";
import AppProvider from "./contexts/AppContext.jsx";
import AppRoutes from "./routes.jsx";


createRoot(document.getElementById("root")).render(
  <AppProvider>
    <AppRoutes />
    
  </AppProvider>
);
