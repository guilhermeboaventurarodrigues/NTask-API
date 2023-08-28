describe('Routes: token', () => {
    const Users = app.models.users;

    describe('POST /token', () => {
        beforeEach(async () =>{
            await Users.destroy({where : {}})
            await Users.create({
                name: 'Guilherme B',
                email: 'guilherme@gmail.com',
                password:'123'
            })
        })

        describe('status 200', () => {
            it('Retornar usuario autenticado no token', done => {
                request.post('/token')
                    .send({
                        email: 'guilherme@gmail.com',
                        password: '123'
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.be.include.keys('token');
                        done(err)
                    })
            })
    
        
        describe('status 401', () => {
            it('Retorna erro caso a senha for incorreta', done => {
                request.post('/token')
                    .send({
                        email: 'guilherme@gmail.com',
                        password: 'SENHA_ERRADA'
                    })
                    .expect(401)
                    .end(done)
            })

            it('Retorna erro se o email nao existir', done => {
                request.post('/token')
                    .send({
                        email: 'EMAIL_NAO_EXISTE@gmail.com',
                        password: '123'
                    })
                    .expect(401)
                    .end(done)
            })

            it('Retorna erro se os campos forem em branco', done => {
                request.post('/token')
                    .expect(401)
                    .end(done)
            })
        })
    })
        })
    
    })

