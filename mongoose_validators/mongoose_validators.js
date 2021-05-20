const validate = require('mongoose-validator');

exports.nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'ce champ doit contenir entre 3 et 50 caractères',
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z\d\-_.,!?'\s]+$/i,
        message: 'La saisie contient des caractères spéciaux interdits',
    }),
];

exports.manufacturerValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'ce champ doit contenir entre 3 et 50 caractères',
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z\d\-_.,!?'\s]+$/i,
        message: 'La saisie contient des caractères spéciaux interdits',
    }),
];

exports.descriptionValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 400],
        message: 'ce champ doit contenir entre 3 et 400 caractères',
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z\d\-_.,!?'\s]+$/i,
        message: 'La saisie contient des caractères spéciaux interdits',
    }),
];
