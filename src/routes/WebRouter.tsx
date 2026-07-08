import { Navigate, Route, Routes } from "react-router";
import { EstoquePage, CaixaPage } from "@/pages";

const WebRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/estoque" replace />} />
      <Route path="/estoque" element={<EstoquePage />} />
      <Route path="/caixa" element={<CaixaPage />} />
    </Routes>
  );
};

export default WebRouter;
