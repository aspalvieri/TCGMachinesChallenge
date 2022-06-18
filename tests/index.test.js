const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const { app } = require("../index");

chai.use(chaiHttp);

describe("/api/card", () => {
  describe("GET /search", () => {
    it("it should return 1 card for query 'elvish mystic'", (done) => {
      let query = "elvish mystic";
      let dir = "asc";
      chai.request(app).get(`/api/card/search?name=${query}&dir=${dir}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.total_cards).to.eq(1);
        done();
      });
    });
    it("it should show 41 cards and 'Elvish Aberration' as the first card for query 'elvish' without a defined direction", (done) => {
      let query = "elvish";
      chai.request(app).get(`/api/card/search?name=${query}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.total_cards).to.eq(41);
        expect(res.body.data[0].name).to.eq("Elvish Aberration");
        done();
      });
    });
    it("it should show 41 cards and 'Elvish Warrior' as the first card for query 'elvish' with direction descending", (done) => {
      let query = "elvish";
      let dir = "desc";
      chai.request(app).get(`/api/card/search?name=${query}&dir=${dir}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.total_cards).to.eq(41);
        expect(res.body.data[0].name).to.eq("Elvish Warrior");
        done();
      });
    });
    it("it should return an error message for query 'aaabbbccc'", (done) => {
      let query = "aaabbbccc";
      let dir = "asc";
      chai.request(app).get(`/api/card/search?name=${query}&dir=${dir}`)
      .end((err, res) => {
        expect(res.status).to.eq(404);
        expect(res.body.errmsg).to.not.eq(undefined);
        done();
      });
    });
  });
});
