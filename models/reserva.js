
var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var reservaSchema = new Schema({
    desde: Date,
    hasta: Date,
    bicicleta: { type: mongoose.Schema.Types.ObjectId, ref: 'Bicicleta' },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
});

reservaSchema.methods.diasDeReserva = function() {
    return moment(this.hasta).diff(moment(this.desde), 'days') + 1;
};

reservaSchema.methods.toString = function() {
    return 'desde: ' + this.desde + ' | hasta: ' + this.hasta;
};

reservaSchema.statics.allReservas = function(cb) {
    return this.find({}, cb);
};

module.exports = mongoose.model('Reserva', reservaSchema);