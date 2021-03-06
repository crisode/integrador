const {check, body}= require ("express-validator");
const {getUsers} = require('../data/users')

let usersDB = getUsers();


module.exports= [
    check('name')
    .notEmpty()
    .withMessage('Nombre requerido'),
    check('apellido')
    .notEmpty()
    .withMessage('apellido requerido'),

    check('email')
    .isEmail()
    .withMessage('email invalido'),

    body('email').custom((value) => {
        let emailCheck = usersDB.find(user => user.email === value)
        
        if(emailCheck){
            return false
        }else{
            return true
        }
    }).withMessage('Email ya registrado'),

    check("pass")
    .isLength({
        min : 6,
        max : 12
    }).withMessage('La contraseña debe tener entre 6 a 12 caracteres'),

    body('pass').custom((value,{req}) => {
        if(value != req.body.pass2){
            return false
        }else{
            return true
        }
    }).withMessage('Las contraseñas no coinciden'),

    body('term').custom(value => {
        if(value != 'si'){
            return false
        }else{
            return true
        }
    }).withMessage('tiene que aceptar los terminos y condiciones')

]