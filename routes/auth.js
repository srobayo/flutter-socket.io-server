/*
 *   path: api/login
 * */

const { Router, response } = require("express");
const { check } = require("express-validator"); // middlewere
const { crearUsuario, login, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validateJWT } = require("../middlewares/validar-jwt");

const router = Router();
router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
  ],
  login
);

// validateJWT,
router.get("/renew", validateJWT, renewToken);
module.exports = router;
