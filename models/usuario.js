var mongoose = require('mongoose');
var Reserva = require('./reserva');
let Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: String
});

usuarioSchema.methods.reserva = function (bicicletaId, desde, hasta, cb) {  
    let reserva = new Reserva({
        usuario: this._id,
        bicicleta: bicicletaId, 
        desde: desde,
        hasta: hasta
    });

    reserva.save(cb);
};


module.exports = mongoose.model('Usuario', usuarioSchema);