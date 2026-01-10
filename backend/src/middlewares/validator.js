export const validateProducto = (req, res, next) => {
  const { nombre, precio, categoria } = req.body;
  const errors = [];

  if (!nombre || typeof nombre !== "string") {
    errors.push("El nombre es requerido y debe ser un string");
  } else if (nombre.trim().length < 3 || nombre.trim().length > 50) {
    errors.push("El nombre debe tener entre 3 y 50 caracteres");
  }

  if (precio === undefined || precio === null) {
    errors.push("El precio es requerido");
  } else if (typeof precio !== "number" || precio <= 0) {
    errors.push("El precio debe ser un número mayor a 0");
  }

  if (categoria !== undefined && categoria !== null) {
    if (typeof categoria !== "string") {
      errors.push("La categoría debe ser un string");
    } else if (categoria.trim().length > 100) {
      errors.push("La categoría no puede exceder 100 caracteres");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }
  req.body.nombre = nombre.trim();
  if (categoria) {
    req.body.categoria = categoria.trim();
  }
  next();
};

export const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      error: "ID inválido",
    });
  }
  req.params.id = id;
  next();
};
