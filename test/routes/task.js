const jwt = require("jwt-simple");

describe("Routes: task", () => {
  const Users = app.models.users;
  const Tasks = app.models.tasks;
  let token;
  let fakeTask;

  beforeEach(async () => {
    await Users.destroy({ where: {} });
    const user = await Users.create({
      name: "Guilherme",
      email: "guilherme@gmail.com",
      password: "123",
    });
    await Tasks.destroy({ where: {} });
    const tasks = await Tasks.bulkCreate([
      { id: 1, title: "Trabalho", userId: user.id },
      { id: 2, title: "Estudo", userId: user.id },
    ]);
    fakeTask = tasks[0];
    token = jwt.encode({ id: user.id }, config.jwt.secret);
  });

  describe("GET /tasks,", () => {
    describe("status 200", () => {
      it("Retornar a lista de tarefas", (done) => {
        request
          .get("/tasks")
          .set("Authorization", token)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(2);
            expect(res.body[0].title).to.equal("Trabalho");
            expect(res.body[1].title).to.equal("Estudo");
            done(err);
          });
      });
    });
  });

  describe("POST /tasks,", () => {
    describe("status 200", () => {
      it("Criar uma nova tarefa", (done) => {
        request
          .post("/tasks")
          .set("Authorization", token)
          .send({ title: "Correr" })
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.equal("Correr");
            expect(res.body.done).to.be.false;
            done(err);
          });
      });
    });
  });

  describe("GET /tasks/:id,", () => {
    describe("status 200", () => {
      it("Retornar somente uma tarefa", (done) => {
        request
          .get(`/tasks/${fakeTask.id}`)
          .set("Authorization", token)
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.equal("Trabalho");
            done(err);
          });
      });
    });
    describe("status 404", () => {
      it("Erro ao retornar tarefa que nao existe", (done) => {
        request
          .get("/tasks/9")
          .set("Authorization", token)
          .expect(404)
          .end(done);
      });
    });
  });

  describe("PUT /tasks/:id,", () => {
    describe("status 204", () => {
      it("Atualizando uma tarefa", (done) => {
        request
          .put(`/tasks/${fakeTask.id}`)
          .set("Authorization", token)
          .send({ title: "Fumar1", done: true })
          .expect(204)
          .end(done);
      });
    });
  });

  describe("DELETE /tasks/:id,", () => {
    describe("status 204", () => {
      it("Removendo uma tarefa", (done) => {
        request
          .delete(`/tasks/${fakeTask.id}`)
          .set("Authorization", token)
          .expect(204)
          .end(done);
      });
    });
  });
});
