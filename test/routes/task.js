const jwt = require("jwt-simple");

describe("Routes: task", () => {
  const Users = app.models.users;
  const Tasks = app.models.tasks;
  let token;
  let fakeTask;

  beforeEach(async () => {
    await Users.destroy({ where: {} });
    const user = Users.create({
      name: "Guilherme",
      email: "guilherme@gmail.com",
      password: "123",
    });
    await Tasks.destroy({ where: {} });
    const tasks = await Tasks.bulkCreate([
      { id: 1, title: "Trabalho", userId: user.id },
      { id: 2, title: "Etudo", userId: user.id },
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
            done(err);
            done(res);
          });
      });
    });
  });

  //   describe("POST /tasks,", () => {
  //     describe("status 200", () => {
  //       it("Criar uma nova tarefa", (done) => {});
  //     });
  //   });

  //   describe("GET /tasks/:id,", () => {
  //     describe("status 200", () => {
  //       it("Retornar somente uma tarefa", (done) => {});
  //     });
  //     describe("status 404", () => {
  //       it("Erro ao retornar tarefa que nao existe", (done) => {});
  //     });
  //   });

  //   describe("PUT /tasks/:id,", () => {
  //     describe("status 204", () => {
  //       it("Atualizando uma tarefa", (done) => {});
  //     });
  //   });

  //   describe("DELETE /tasks/:id,", () => {
  //     describe("status 204", () => {
  //       it("Removendo uma tarefa", (done) => {});
  //     });
  //   });
});
