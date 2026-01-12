import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crear" element={<CreateProduct />} />
          <Route path="/editar/:id" element={<CreateProduct />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
