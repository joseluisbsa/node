let app = require('./config/express')()
let rotasProdutos = require('./app/routes/produtos')(app)

app.listen(3000, function(){
	console.log("server ok")
})
