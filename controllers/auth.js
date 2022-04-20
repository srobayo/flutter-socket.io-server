const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const { response } = require("express");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }
    const usuario = new User(req.body);
    //  Ecriptar la contraseña y guardar
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();
    // Generar mi JWT
    const token = await generateJWT(usuario.id);
    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }
    // validar el password
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "La contraseña no es válida",
      });
    }

    //  generar el JWT
    const token = await generateJWT(userDB.id);
    res.json({
      ok: true,
      usuario: userDB,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const token = await generateJWT(uid);
  const userFound = await User.findById(uid);

  res.json({
    ok: true,
    usuario: userFound,
    token,
  });
};

module.exports = {
  crearUsuario,
  login,
  renewToken,
};
