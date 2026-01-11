import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductTable = ({ productos, loading, onDelete }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Definir columnas del datatable
  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: (row) => row.id,
        sortable: true,
        width: "80px",
        center: true,
      },
      {
        name: "Nombre",
        selector: (row) => row.nombre,
        sortable: true,
        grow: 2,
        cell: (row) => <div className="font-medium text-gray-900">{row.nombre}</div>,
      },
      {
        name: "Precio",
        selector: (row) => row.precio,
        sortable: true,
        cell: (row) => <div className="font-semibold text-gray-900">{formatPrice(row.precio)}</div>,
      },
      {
        name: "Categoría",
        selector: (row) => row.categoria || "-",
        sortable: true,
        cell: (row) => (row.categoria ? <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">{row.categoria}</span> : <span className="text-gray-400">-</span>),
      },
      {
        name: "Fecha",
        selector: (row) => row.creadoEn,
        sortable: true,
        cell: (row) => <div className="text-sm text-gray-600">{formatDate(row.creadoEn)}</div>,
      },
      {
        name: "Acciones",
        center: true,
        width: "150px",
        cell: (row) => (
          <div className="flex gap-2">
            <button onClick={() => navigate(`/editar/${row.id}`)} className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
              <FaEdit className="text-lg" />
            </button>
            <button onClick={() => onDelete(row.id)} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
              <FaTrash className="text-lg" />
            </button>
          </div>
        ),
      },
    ],
    [navigate, onDelete],
  );

  const customStyles = {
    table: {
      style: {
        backgroundColor: "white",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f9fafb",
        borderBottomWidth: "2px",
        borderBottomColor: "#e5e7eb",
        minHeight: "52px",
      },
    },
    headCells: {
      style: {
        fontSize: "13px",
        fontWeight: "600",
        textTransform: "uppercase",
        color: "#6b7280",
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    rows: {
      style: {
        minHeight: "60px",
        "&:hover": {
          backgroundColor: "#f9fafb",
          cursor: "pointer",
        },
      },
    },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
        fontSize: "14px",
      },
    },
  };

  // Textos en español
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página:",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <DataTable
        columns={columns}
        data={productos}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 20, 30, 50]}
        paginationComponentOptions={paginationComponentOptions}
        progressPending={loading}
        progressComponent={
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando productos...</p>
          </div>
        }
        noDataComponent={<div className="p-12 text-center text-gray-500">📦 No hay productos registrados</div>}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        responsive
        striped
      />
    </div>
  );
};

export default ProductTable;
