module.exports = {
    db: {
        database: 'ntask',
        username: '',
        password: '',
        params: {
            dialect: 'sqlite',
            storage: 'ntask.sqlite',
            define: {
                underscored: true
            }
        }
    },
    jwt: {
        secret: '123',
        options: { session: false }
    }
}