var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = async function(req, res){
    res.render('bicicletas/index', {bicis: await Bicicleta.allBicis()});
}

exports.bicicleta_create_get = function(req, res){
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = async function(req, res){
    var bici = Bicicleta.createInstance(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    await Bicicleta.add(bici);

    res.redirect('/bicicletas');
}

exports.bicicleta_update_get = async function(req, res) {
    var bici = await Bicicleta.findById(req.params.id);

    res.render('bicicletas/update', {bici});
}

exports.bicicleta_update_post = function(req, res){
    var bici = Bicicleta.findById(req.body.id);
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];

    res.redirect('/bicicletas');
}

exports.bicicleta_delete_post = function(req, res) {
    Bicicleta.removeById(req.body.id);

    res.redirect('/bicicletas');
}
