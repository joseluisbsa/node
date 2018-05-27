
module.exports = function(app){    
    app.get('/produtos', function(req, res){
        let connection = app.infra.connectionFactory()
        let produtosBanco = new app.infra.produtosDAO(connection)

        produtosBanco.lista(function(err, results){
            res.render('produtos/lista', {lista: results});
        })

        connection.end()
    })
}