module.exports = function (app) {

    let listaProdutos = function (req, res) {
        let connection = app.infra.connectionFactory()
        let produtosDAO = new app.infra.produtosDAO(connection)

        produtosDAO.lista(function (err, results) {
            res.format({
                html: function () {
                    res.render('produtos/lista', { lista: results })
                },
                json: function () {
                    res.json(results)
                }
            })
        })

        connection.end()
    }

    app.get('/produtos', listaProdutos)

    app.get('/produtos/json', function (req, res) {
        let connection = app.infra.connectionFactory()
        let produtosDAO = new app.infra.produtosDAO(connection)

        produtosDAO.lista(function (err, results) {
            res.json(results)
        })

        connection.end()
    })

    app.get('/produtos/form', function (req, res) {
        res.render('produtos/form', { errosValidacao: {}, produto: {} });
    })

    app.post('/produtos', function (req, res) {
        let produto = req.body

        req.assert('titulo', 'Titulo é obrigatório').notEmpty()
        req.assert('preco', 'Formato inválido').isFloat()

        let erros = req.validationErrors()
        if (erros) {
            res.format({
                html: () => res.status(400).render('produtos/form', { errosValidacao: erros, produto: produto }),
                json: () => res.status(400).json(erros)
            })
            return;
        }

        let connection = app.infra.connectionFactory()
        let produtosDAO = new app.infra.produtosDAO(connection)

        produtosDAO.salva(produto, function (err, results) {
            res.redirect('/produtos')
        })

        connection.end()
    })
}