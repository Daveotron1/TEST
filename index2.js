import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import {dirname} from "path" ;
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const users = {
    "admin": bcrypt.hashSync("test", 10),
    "user2": bcrypt.hashSync("password2", 10)
};

app.use(bodyParser.urlencoded({extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/html/login.html");
});

app.post("/submit", (req, res) => {
    const submittedUsername = req.body["username"];
    const submittedPassword = req.body["password"];

    if (users[submittedUsername] && bcrypt.compareSync(submittedPassword, users[submittedUsername])) {
        res.sendFile(__dirname + "/KB3.0/public/html/index.html");
    } else {
        res.sendFile(__dirname + "public/html/login.html");
    }
});

app.listen(port, () => {
    console.log(`listen on port ${port}`);
}); 






