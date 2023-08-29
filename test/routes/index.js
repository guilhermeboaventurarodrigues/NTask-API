describe("Routes: Index", () => {
  describe("GET /", () => {
    it("Retornando o status da API", (done) => {
      request
        .get("/")
        .expect(200)
        .end((err, res) => {
          const expected = { status: "NTask API" };
          expect(res.body).to.eql(expected);
          done(err);
        });
    });
  });
});
