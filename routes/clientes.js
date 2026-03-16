//contiene la logica del servidor  la api
const express = require("express");
const router = express.Router();
const pool = require("../dataBase");


// GET /clientes
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT rut, nombre, edad FROM clientes_t2 ORDER BY nombre"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});


// POST /clientes
router.post("/", async (req, res) => {

  const { rut, nombre, edad } = req.body;

  if (!rut || !nombre || !edad)
    return res.status(400).json({ error: "Datos incompletos" });

  if (isNaN(edad))
    return res.status(400).json({ error: "Edad debe ser numérica" });

  try {

    await pool.query(
      "INSERT INTO clientes_t2 (rut, nombre, edad) VALUES ($1,$2,$3)",
      [rut, nombre, edad]
    );
    res.status(201).json({ message: "Cliente creado" });
  } catch (error) {
    if (error.code === "23505")
      return res.status(409).json({ error: "RUT duplicado" });
    res.status(500).json({ error: "Error del servidor" });
  }
});


// DELETE /clientes/:rut
router.delete("/:rut", async (req, res) => {

  const { rut } = req.params;

  const result = await pool.query(
    "DELETE FROM clientes_t2 WHERE rut = $1",
    [rut]
  );

  if (result.rowCount === 0)
    return res.status(404).json({ error: "Cliente no encontrado" });

  res.json({ message: "Cliente eliminado" });
});


// PUT /clientes/:rut
router.put("/:rut", async (req, res) => {

  const { rut } = req.params;
  const { nombre } = req.body;

  if (!nombre)
    return res.status(400).json({ error: "Debe enviar nombre" });

  const result = await pool.query(
    "UPDATE clientes_t2 SET nombre=$1 WHERE rut=$2",
    [nombre, rut]
  );

  if (result.rowCount === 0)
    return res.status(404).json({ error: "Cliente no existe" });

  res.json({ message: "Cliente actualizado" });
});

module.exports = router;