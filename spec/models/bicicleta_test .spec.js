var Bicicleta = require("../../models/bicicleta")
beforeEach(() => {
    Bicicleta.allBicis = [];
});


describe('Bicicleta.allBicis', () => {
    it('Comienza vacía', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});


describe('Bicicleta.add', () => {
    it('Agregar bicicleta', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});


describe('Bicicleta.findById', () => {
    it('Buscar por Id', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
        var b = new Bicicleta(2, 'blanca', 'montaña', [-34.596932, -58.3808287]);
        
        Bicicleta.add(a);
        Bicicleta.add(b);

        var targetBici = Bicicleta.findById(a.id);

        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(a.color);
        expect(targetBici.modelo).toBe(a.modelo);
    });
});
describe('Bicicleta.removeById', () => {
    it('Eliminar por Id', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
        var b = new Bicicleta(2, 'blanca', 'montaña', [-34.596932, -58.3808287]);
        
        Bicicleta.add(a);
        Bicicleta.add(b);
        Bicicleta.removeById(a.id);
        expect(Bicicleta.allBicis.length).toBe(1);
    });
});