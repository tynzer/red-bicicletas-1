


/* 

var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

beforeEach(() => {
Bicicleta.allBicis = [];
});


describe('Bicicleta API', () => {
    describe('GET BICICLETAS /', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1, 'roja', 'urbana', [-34.99568, -54.15612]);
            Bicicleta.add(a);

            request.get("http://localhost:3000/api/bicicletas", (err, responsive, body) => {
                expect(responsive.statusCode).toBe(200);
            });
        });
    });
});


describe('POST BICICLETAS /CREATE', () => {
    it('STATUS 200', (done) => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var headers = { 'content-type': 'application/json' };
        var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": -34.5, "lng": -54.1 }';

        request.post({
            headers: headers,
            url: 'http://localhost:3000/api/bicicletas/create',
            body: aBici
        }, function (error, response, body) {
            expect(response.statusCode).toBe(200);
            expect(Bicicleta.findById(10).color).toBe("rojo");
            done();
        });
    });
});


describe('POST BICICLETAS /DELETE', () => {
    it('STATUS 204', (done) => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1, "rojo", "urbana", [-34.6012424, -58.3861497]);
        var b = new Bicicleta(2, "blanca", "urbana", [-34.596932, -58.3808287]);
        
        Bicicleta.add(a);
        Bicicleta.add(b);

        var headers = {'content-type' : 'application/json'};
        var aBici = '{"id": 1}';

        request.delete({
            headers: headers,
            url: 'http://localhost:3000/api/bicicletas/delete',
            body: aBici
        }, function(error, response, body) {
            expect(response.statusCode).toBe(204);
            expect(Bicicleta.allBicis.length).toBe(1);
            done();
        });
    });
});


describe('POST BICICLETAS /UPDATE', () => {
    it('STATUS 203', (done) => {
        var a = Bicicleta.createInstance(10, "rojo", "urbana", [-34.6012424, -58.3861497]);
        Bicicleta.add(a);

        var headers = {'content-type' : 'application/json'};
        var aBici = '{ "code": 10, "color": "dorado", "modelo": "montaña", "lat": -34.5, "lng": -54.1 }';

        request.post({
            headers: headers,
            url: 'http://localhost:3000/api/bicicletas/update',
            body: aBici
        }, function(error, response, body) {
            expect(response.statusCode).toBe(203);
            
            Bicicleta.findByCode(10, function(error, targetBici) {
                expect(targetBici.code).toBe(10);
                expect(targetBici.color).toBe("dorado");
                expect(targetBici.modelo).toBe("montaña");
                done();
            });
        });
    });
});  */