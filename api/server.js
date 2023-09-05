const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const fs = require("fs");
const db = require("./db.js")();

// db.json dosyasını sadece bir kez oluştur
if (!fs.existsSync("/tmp/db.json")) {
    console.log("file not found");
    fs.writeFileSync("/tmp/db.json", JSON.stringify(db, null, 2));
}

server.use(middlewares);

server.use(
    jsonServer.rewriter({
        "/api/*": "/$1",
        "/blog/:resource/:id/show": "/:resource/:id",
    })
);

server.db = db;
server.use(jsonServer.router("/tmp/db.json")); // Oluşturulan dosyayı kullan

server.listen(3000, () => {
    console.log("JSON Server is running");
});
