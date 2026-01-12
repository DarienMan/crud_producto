import React, { useState, useEffect } from "react";
const ProductForm = ({ producto, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    categoria: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre || "",
        precio: producto.precio || "",
        categoria: producto.categoria || "",
      });
    }
  }, [producto]);

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (formData.nombre.trim().length < 3 || formData.nombre.trim().length > 50) {
      newErrors.nombre = "El nombre debe tener entre 3 y 50 caracteres";
    }

    if (!formData.precio) {
      newErrors.precio = "El precio es requerido";
    } else if (isNaN(formData.precio) || parseFloat(formData.precio) <= 0) {
      newErrors.precio = "El precio debe ser un número mayor a 0";
    }

    if (formData.categoria && formData.categoria.trim().length > 100) {
      newErrors.categoria = "La categoría no puede exceder 100 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        ...formData,
        precio: parseFloat(formData.precio),
      });
    }
  };

  const handleReset = () => {
    setFormData({
      nombre: "",
      precio: "",
      categoria: "",
    });
    setErrors({});
    if (onCancel) onCancel();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{producto ? "✏️ Editar Producto" : "➕ Nuevo Producto"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.nombre ? "border-red-500" : "border-gray-300"}`} placeholder="Ej: Laptop HP" />
            {errors.nombre && <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>}
          </div>

          <div>
            <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-2">
              Precio <span className="text-red-500">*</span>
            </label>
            <input type="number" id="precio" name="precio" value={formData.precio} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.precio ? "border-red-500" : "border-gray-300"}`} placeholder="Ej: 15990" step="1" min="0" />
            {errors.precio && <p className="mt-1 text-sm text-red-500">{errors.precio}</p>}
          </div>

          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <input type="text" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.categoria ? "border-red-500" : "border-gray-300"}`} placeholder="Ej: Electrónica" />
            {errors.categoria && <p className="mt-1 text-sm text-red-500">{errors.categoria}</p>}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
            {producto ? "Actualizar" : "Crear Producto"}
          </button>
          <button type="button" onClick={handleReset} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-lg transition-colors">
            {producto ? "Cancelar" : "Limpiar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
