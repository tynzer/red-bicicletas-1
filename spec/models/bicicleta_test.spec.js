const mongoose = require('mongoose');
const Bicicleta = require('../../models/bicicleta');


describe('Testing bicicletas', function () {
    var originalTimeout;
    beforeAll(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });
    beforeEach(function (done) {
        mongoose.disconnect();
        const mongoDB = 'mongodb://localhost/test';
        mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error'));
        db.once('open', function () {
            console.log('We are connected to test database!');
            done();
        });
    });
    it("takes a long time", function (done) {
        setTimeout(function () {
            done();
        }, 9000);
    });

    afterEach(function (done) {
        Bicicleta.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            done();
        });
    });
    afterAll(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    describe('Bicicleta.createInstance', () => {
        it('should create an instance of Bicicleta', function () {
            var bici = Bicicleta.createInstance(1, "negro", "urbana", [-34.888488, -56.146273]);
            expect(bici.code).toBe(1);
            expect(bici.color).toBe("negro");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(-34.888488);
            expect(bici.ubicacion[1]).toEqual(-56.146273);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('should start empty', function (done) {
            Bicicleta.allBicis(function (err, bicis) {
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add', function () {
        it('should add just one bike', function (done) {
            var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
            Bicicleta.add(aBici, function (err, newBici) {
                if (err) console.log(err);
                Bicicleta.allBicis(function (err, bicis) {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
                    done();
                });

            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('should return the bike with code 1', function (done) {
            Bicicleta.allBicis(function (err, bicis) {
                expect(bicis.length).toBe(0);
                var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
                Bicicleta.add(aBici, function (err, newBici) {
                    if (err) console.log(err);
                    var aBici2 = new Bicicleta({code: 2, color: "azul", modelo: "urbana"});
                    Bicicleta.add(aBici2, function (err, newBici) {
                        if (err) console.log(err);
                        Bicicleta.findByCode(1, function (error, targetBici) {
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);

                            done();
                        });
                    });
                });
            });
        });
    });


    describe('Bicicleta.removeByCode', () => {
        it('should remove the bike with code 1', function (done) {
            Bicicleta.allBicis(function (err, bicis) {
                expect(bicis.length).toBe(0);
                var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
                Bicicleta.add(aBici, function (err, success) {
                    if (err) console.log(err);
                    var aBici2 = new Bicicleta({code: 2, color: "azul", modelo: "urbana"});
                    Bicicleta.add(aBici2, function (err, success) {
                        if (err) console.log(err);
                        Bicicleta.allBicis(function (err, result) {
                            expect(result.length).toBe(2);
                            Bicicleta.removeByCode(2, function (error, result) {
                                Bicicleta.allBicis(function (err, result) {
                                    expect(result.length).toBe(1);
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

/* 
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
}); */