import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import ProductForm from "../components/ProductForm";
import Toast from "../components/Toast";
import { createProducto, updateProducto, getProductoById } from "../services/api";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProducto();
    }
  }, [id]);

  const fetchProducto = async () => {
    setLoading(true);
    try {
      const response = await getProductoById(id);
      setProducto(response.data);
    } catch (error) {
      showToast(error.message, "error");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleSubmit = async (formData) => {
    try {
      if (id) {
        await updateProducto(id, formData);
        showToast("✅ Producto actualizado exitosamente");
      } else {
        await createProducto(formData);
        showToast("✅ Producto creado exitosamente");
      }
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <button onClick={() => navigate("/")} className="mb-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors">
          <FaArrowLeft /> Volver al listado
        </button>
        <ProductForm producto={producto} onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default CreateProduct;
