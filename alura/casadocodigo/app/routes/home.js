module.exports = function (app) {
    app.get("/", function (req, res, next) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function (error, results) {
            if (error) {
                return next(error);
            }
            res.render('home/index', { livros: results });
        });
        connection.end();

    });
}