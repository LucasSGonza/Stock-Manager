import { Navigate, Route, Routes } from "react-router";
import { EstoquePage, CaixaPage, ConfigurationPage } from "@/pages";

const WebRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/estoque" replace />} />
      <Route path="/estoque" element={<EstoquePage />} />
      <Route path="/caixa" element={<CaixaPage />} />
      <Route path="/config" element={<ConfigurationPage />} />
    </Routes>
  );
};

export default WebRouter;
