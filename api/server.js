const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const fs = require("fs");
const db = require("./db.js")();

server.use(middlewares);

server.use(
    jsonServer.rewriter({
        "/api/*": "/$1",
        "/blog/:resource/:id/show": "/:resource/:id",
    })
);

server.db = db;
server.use(jsonServer.router(server.db));

// db.json dosyasını güncelle
fs.writeFileSync("tmp/db.json", JSON.stringify(server.db, null, 2));

server.listen(3000, () => {
    console.log("JSON Server is running");
});
