
const { Router } = require('express');
const { check } = require('express-validator');
const { guardarGlucosa, listaResultados, ultimaPrueba, listaResultadosMesActual, listaResultadosDiaActual } = require('../controllers/pruebaGlucosa.controller');

const router = Router();

// Todas tienes que pasar por la validación del JWT
// router.use( validarJWT );

router.get(
    '/',
    // [
    //     isAdministrator,
    //     check('categoryName','La categoría es obligatorio').not().isEmpty(),
    //     validarCampos
    // ],
    listaResultados
);

router.get(
    '/listaMes',
    // [
    //     isAdministrator,
    //     check('categoryName','La categoría es obligatorio').not().isEmpty(),
    //     validarCampos
    // ],
    listaResultadosMesActual
);

router.get(
    '/listaDia',
    // [
    //     isAdministrator,
    //     check('categoryName','La categoría es obligatorio').not().isEmpty(),
    //     validarCampos
    // ],
    listaResultadosDiaActual
);

router.get(
    '/ultimaPrueba',
    // [
    //     isAdministrator,
    //     check('categoryName','La categoría es obligatorio').not().isEmpty(),
    //     validarCampos
    // ],
    ultimaPrueba
);

router.post(
    '/',
    // [
    //     isAdministrator,
    //     check('categoryName','La categoría es obligatorio').not().isEmpty(),
    //     validarCampos
    // ],
    guardarGlucosa
);

module.exports = router;