module.exports = app => {
   async function start(port) {
    try {
        await app.db.authenticate();
        await app.db.sync();
        app.listen(app.get('port'), () => {
            console.log(`NTask API - porta ${app.get('port')}`)
        })
    } catch (error) {
        console.log("Erro de conexão com o BD")
        console.error(error)
    }
   }

   start(app.get('port'));
}