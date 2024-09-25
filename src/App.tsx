import { Route, Routes } from "react-router-dom";
import SaleInvoices from "./pages/saleInvoices";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<SaleInvoices />} />
    </Routes>
  );
}

export default App;
