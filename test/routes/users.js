const jwt = require("jwt-simple");

describe("Routes:	Users", () => {
  const Users = app.models.users;
  let token;

  beforeEach(async () => {
    await Users.destroy({ where: {} });
    const user = await Users.create({
      name: "Guilherme",
      email: "guilhermao@gmail.com",
      password: "123",
    });
    token = jwt.encode({ id: user.id }, config.jwt.secret);
  });

  describe("GET	/user", () => {
    describe("status 200", () => {
      it("Retornar o usuario autenticado", (done) => {
        request
          .get("/user")
          .set("Authorization", token)
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.equal("Guilherme");
            expect(res.body.email).to.equal("guilhermao@gmail.com");
            done(err);
          });
      });
    });
  });

  describe("DELETE	/user", () => {
    describe("status 204", () => {
      it("Deletar o usuario autenticado", (done) => {
        request
          .delete("/user")
          .set("Authorization", token)
          .expect(204)
          .end(done);
      });
    });
  });

  describe("POST	/users", () => {
    describe("status	200", () => {
      it("Criar um novo usuario", (done) => {
        request
          .post("/users")
          .send({
            name: "Guiga",
            email: "guigao@gmail.com",
            password: "123",
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.equal("Guiga");
            expect(res.body.email).to.equal("guigao@gmail.com");
            done(err);
          });
      });
    });
  });
});
