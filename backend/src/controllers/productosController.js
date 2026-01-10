import prisma from "../config/prisma.js";

export const getProductos = async (req, res) => {
  try {
    const { page = 1, limit = 10, nombre, categoria } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    const where = {};

    if (nombre) {
      where.nombre = {
        contains: nombre,
        mode: "insensitive",
      };
    }

    if (categoria) {
      where.categoria = {
        contains: categoria,
        mode: "insensitive",
      };
    }

    const [productos, total] = await Promise.all([
      prisma.producto.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: {
          creadoEn: "desc",
        },
      }),
      prisma.producto.count({ where }),
    ]);

    res.json({
      success: true,
      data: productos,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener productos",
    });
  }
};

export const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await prisma.producto.findUnique({
      where: { id: parseInt(id) },
    });

    if (!producto) {
      return res.status(404).json({
        success: false,
        error: "Producto no encontrado",
      });
    }
    res.json({
      success: true,
      data: producto,
    });
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener producto",
    });
  }
};

export const createProducto = async (req, res) => {
  try {
    const { nombre, precio, categoria } = req.body;
    const producto = await prisma.producto.create({
      data: {
        nombre,
        precio,
        categoria: categoria || null,
      },
    });
    res.status(201).json({
      success: true,
      data: producto,
      message: "Producto creado exitosamente",
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({
      success: false,
      error: "Error al crear producto",
    });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, categoria } = req.body;
    const existe = await prisma.producto.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existe) {
      return res.status(404).json({
        success: false,
        error: "Producto no encontrado",
      });
    }

    const producto = await prisma.producto.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        precio,
        categoria: categoria || null,
      },
    });
    res.json({
      success: true,
      data: producto,
      message: "Producto actualizado exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({
      success: false,
      error: "Error al actualizar producto",
    });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const existe = await prisma.producto.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existe) {
      return res.status(404).json({
        success: false,
        error: "Producto no encontrado",
      });
    }

    await prisma.producto.delete({
      where: { id: parseInt(id) },
    });
    res.json({
      success: true,
      message: "Producto eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({
      success: false,
      error: "Error al eliminar producto",
    });
  }
};
