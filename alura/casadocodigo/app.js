let express = require('express')
let app = express()

app.set('view engine', 'ejs')

app.get('/produtos', function(req, res){
	res.render("produtos/lista")
})

app.listen(3000, function(){
	console.log("server ok")
})

