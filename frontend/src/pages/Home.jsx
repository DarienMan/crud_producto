import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import ProductTable from "../components/ProductTable";
import Toast from "../components/Toast";
import { getProductos, deleteProducto } from "../services/api";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchNombre, setSearchNombre] = useState("");
  const [searchCategoria, setSearchCategoria] = useState("");

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await getProductos({ limit: 1000 });
      setProductos(response.data);
      setFilteredProductos(response.data);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  useEffect(() => {
    let filtered = productos;

    if (searchNombre) {
      filtered = filtered.filter((p) => p.nombre.toLowerCase().includes(searchNombre.toLowerCase()));
    }

    if (searchCategoria) {
      filtered = filtered.filter((p) => p.categoria?.toLowerCase().includes(searchCategoria.toLowerCase()));
    }

    setFilteredProductos(filtered);
  }, [searchNombre, searchCategoria, productos]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProducto(id);
        showToast("🗑️ Producto eliminado exitosamente");
        fetchProductos();
      } catch (error) {
        showToast(error.message, "error");
      }
    }
  };

  const clearFilters = () => {
    setSearchNombre("");
    setSearchCategoria("");
  };

  const hasActiveFilters = searchNombre || searchCategoria;

  return (
    <div className="flex-1">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* header responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Listado de Productos
            {!loading && (
              <span className="ml-3 text-base font-normal text-gray-500">
                ({filteredProductos.length} {filteredProductos.length === 1 ? "producto" : "productos"})
              </span>
            )}
          </h2>
          <Link to="/crear" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg">
            <FaPlus /> <span className="hidden sm:inline">Crear Producto</span>
            <span className="sm:hidden">Nuevo</span>
          </Link>
        </div>

        {/* filtros responsive */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaSearch className="text-blue-600" /> Filtros de Búsqueda
            </h3>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors">
                <FaTimes /> Limpiar
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label htmlFor="searchNombre" className="block text-sm font-medium text-gray-700 mb-2">
                Buscar por nombre
              </label>
              <input type="text" id="searchNombre" value={searchNombre} onChange={(e) => setSearchNombre(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Escribe un nombre..." />
            </div>
            <div>
              <label htmlFor="searchCategoria" className="block text-sm font-medium text-gray-700 mb-2">
                Buscar por categoría
              </label>
              <input type="text" id="searchCategoria" value={searchCategoria} onChange={(e) => setSearchCategoria(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Escribe una categoría..." />
            </div>
          </div>
        </div>

        {/* datatable */}
        <ProductTable productos={filteredProductos} loading={loading} onDelete={handleDelete} />
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Home;
