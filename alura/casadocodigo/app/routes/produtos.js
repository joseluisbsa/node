
module.exports = function(app){    
    app.get('/produtos', function(req, res){
        let connection = app.infra.connectionFactory()
        let produtosBanco = app.infra.produtosBanco

        produtosBanco.lista(connection, function(err, results){
            res.render('produtos/lista', {lista: results});
        })

        connection.end()
    })
}