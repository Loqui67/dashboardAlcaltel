const {
    port,
    jwtPassword,
    sessionPassword,
    origin,
    tests,
    user,
    logImagesRootFolder,
    MySQLdumpConnection,
} = require("./config");

const compression = require("compression");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const mysqldump = require("mysqldump");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");

const app = express();

const saltRounds = 10;

app.use(
    cors({
        origin: [origin],
        methods: ["GET", "POST", "PUT"],
        credentials: true,
    })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "userID",
        secret: sessionPassword,
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 1000 * 60 * 60 * 24,
        },
    })
);

app.use(express.json());

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token || token === "") {
        return;
    } else {
        jwt.verify(token, jwtPassword, (err, decoded) => {
            if (err) {
                return;
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
};

app.get("/logout", (req, res) => {
    console.log("logout");
    req.session.destroy();
});

app.get("/client", verifyJWT, (req, res) => {
    console.log("client");
    tests.query("CALL client();", (err, result) => {
        if (err) {
            console.log("/client");
        } else {
            res.send(result);
        }
    });
});

app.get("/clientDistinct", verifyJWT, (req, res) => {
    console.log("clientDistinct");
    tests.query("CALL clientDistinct();", (err, result) => {
        if (err) {
            console.log("/clientDistinct");
        } else {
            res.send(result);
        }
    });
});

app.get("/clientModel", verifyJWT, (req, res) => {
    const id = req.query.id;
    console.log("clientModel");
    tests.query("CALL clientModel(?);", [id], (err, result) => {
        if (err) {
            console.log("/clientModel");
        } else {
            res.send(result);
        }
    });
});

app.get("/clientVersion", verifyJWT, (req, res) => {
    const clientChoose = req.query.clientChoose;
    const id = req.query.id;
    console.log("clientVersion");
    tests.query(
        "CALL clientVersion(?, ?);",
        [id, clientChoose],
        (err, result) => {
            if (err) {
                console.log("/clientVersion");
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/date", verifyJWT, (req, res) => {
    const id = req.query.id;
    console.log("date");
    tests.query("CALL date(?);", id, (err, result) => {
        if (err) {
            console.log("/date");
        } else {
            res.send(result);
        }
    });
});

app.get("/dateWithTS", verifyJWT, (req, res) => {
    const id = req.query.id;
    console.log("dateWithTS");
    tests.query("CALL dateWithTS(?);", id, (err, result) => {
        if (err) {
            console.log("/dateWithTS");
        } else {
            res.send(result);
        }
    });
});

app.get("/lastVersion", verifyJWT, (req, res) => {
    const client = req.query.client;
    console.log("lastVersion");
    tests.query("CALL lastVersion(?);", client, (err, result) => {
        if (err) {
            console.log("/lastVersion");
        } else {
            res.send(result);
        }
    });
});

app.get("/state", verifyJWT, (req, res) => {
    console.log("state");
    tests.query("CALL state();", (err, result) => {
        if (err) {
            console.log("/state");
        } else {
            res.send(result);
        }
    });
});

app.get("/step", verifyJWT, (req, res) => {
    const id = req.query.id;
    console.log("step");
    tests.query("CALL step(?);", id, (err, result) => {
        if (err) {
            console.log("/step");
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/testHistory", verifyJWT, (req, res) => {
    const name = req.query.name;
    const id = req.query.id;
    const client = req.query.client;
    console.log("testHistory");
    tests.query(
        "CALL testHistory(?, ?, ?);",
        [name, id, client],
        (err, result) => {
            if (err) {
                console.log("/testHistory");
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/testState", verifyJWT, (req, res) => {
    const id = req.query.id;
    const client = req.query.client;
    console.log("testState");
    tests.query("CALL testState(?, ?);", [id, client], (err, result) => {
        if (err) {
            console.log("/testState");
        } else {
            res.send(result);
        }
    });
});

app.get("/testStateCount", verifyJWT, (req, res) => {
    const id = req.query.id;
    const client = req.query.client;
    console.log("testStateCount");
    tests.query("CALL testStateCount(?, ?);", [id, client], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/testStateCountWithDate", verifyJWT, (req, res) => {
    const id = req.query.id;
    const client = req.query.client;
    const date = req.query.date;
    console.log("testStateCountWithDate");
    tests.query(
        "CALL testStateCountWithDate(?, ?, ?);",
        [id, client, date],
        (err, result) => {
            if (err) {
                console.log("/testStateCountWithDate");
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/testSuite", verifyJWT, (req, res) => {
    console.log("testSuite");
    tests.query("CALL testSuite();", (err, result) => {
        if (err) {
            console.log("/testSuite");
        } else {
            res.send(result);
        }
    });
});

app.get("/testSuiteFromVersion", verifyJWT, (req, res) => {
    console.log("testSuiteFromVersion");
    const id = req.query.id;
    tests.query("CALL testSuiteFromVersion(?);", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/testSuiteFromVersionWithDate", verifyJWT, (req, res) => {
    const id = req.query.id;
    console.log("testSuiteFromVersionWithDate");
    tests.query("CALL testSuiteFromVersionWithDate(?);", id, (err, result) => {
        if (err) {
            console.log("/testSuiteFromVersionWithDate");
        } else {
            res.send(result);
        }
    });
});

app.get("/version", verifyJWT, (req, res) => {
    const id = req.query.id;
    console.log("version");
    tests.query("CALL version(?);", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/versionFromClient", verifyJWT, (req, res) => {
    const client = req.query.client;
    console.log("versionFromClient");
    tests.query("CALL versionFromClient(?);", client, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/versionWithLogs", verifyJWT, (req, res) => {
    const id = req.query.id;
    console.log("versionWithLogs");
    tests.query("CALL VersionWithLogs(?);", id, (err, result) => {
        if (err) {
            console.log("/versionWithLogs");
        } else {
            res.send(result);
        }
    });
});

function path(clientName, folderName, imageName) {
    return `${clientName}/${folderName}/ReportLogs/${imageName}`;
}

app.get("/SeleniumReports/:client/:folder/:image", (req, res) => {
    const img = path(req.params.client, req.params.folder, req.params.image);
    res.sendFile(img, { root: logImagesRootFolder });
});

app.get("/isUserAuth", verifyJWT, (req, res) => {
    res.send({ auth: true });
});

app.get("/login", (req, res) => {
    console.log("login : get");
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false, user: [] });
    }
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("login : post");

    user.query(
        "SELECT * FROM users WHERE username = ?;",
        username,
        (err, result) => {
            if (err) {
                console.log(err);
                return;
            } else {
                if (result.length > 0) {
                    bcrypt.compare(
                        password,
                        result[0].password,
                        (error, response) => {
                            if (response) {
                                const id = result[0].id_users;
                                const token = jwt.sign({ id }, jwtPassword, {
                                    expiresIn: "24h",
                                });
                                req.session.user = result;
                                res.send({
                                    username: result[0].username,
                                    admin: result[0].isAdmin,
                                    message: "",
                                    auth: true,
                                    token: token,
                                });
                            } else {
                                res.send({
                                    username: "",
                                    admin: false,
                                    message:
                                        "Wrong username/password combination !",
                                    auth: false,
                                    token: "",
                                });
                            }
                        }
                    );
                } else {
                    res.send({
                        username: "",
                        admin: false,
                        message: "Wrong username/password combination !",
                        auth: false,
                        token: "",
                    });
                }
            }
        }
    );
});

app.post("/confirmPassword", verifyJWT, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("confirmPassword");
    user.query(
        "SELECT username, password FROM users WHERE username = ?",
        username,
        (err, result) => {
            if (result.length === 0) {
                res.send({ state: false, message: "An error occured" });
            } else {
                bcrypt.compare(
                    password,
                    result[0].password,
                    (error, response) => {
                        if (response) {
                            req.session.user = result;
                            res.send({ state: true });
                        } else {
                            res.send({
                                state: false,
                                message: "Wrong password !",
                            });
                        }
                    }
                );
            }
        }
    );
});

app.put("/updatePassword", verifyJWT, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("updatePassword");
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
            res.send({
                state: false,
                message: `Failed to update your password`,
            });
        } else {
            user.query(
                "UPDATE users SET password = ? WHERE username = ?;",
                [hash, username],
                (err, results) => {
                    if (err) {
                        console.log("/updatePassword");
                        res.send({
                            state: false,
                            message: `Failed to update your password`,
                        });
                    } else {
                        res.send({
                            state: true,
                            message: `password well updated, redirecting...`,
                        });
                    }
                }
            );
        }
    });
});

app.post("/register", verifyJWT, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const admin = req.body.admin;
    const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    console.log("register");

    if (
        username.length < 5 ||
        username.length > 20 ||
        password.length < 8 ||
        password.length > 30 ||
        format.test(username)
    ) {
        res.send({ state: false, message: "Wrong username/password format" });
    } else {
        user.query(
            "SELECT username, password FROM users WHERE username = ?",
            username,
            (err, result) => {
                if (result.length > 0) {
                    res.send({
                        state: false,
                        message: "This username is already used",
                    });
                } else {
                    bcrypt.hash(password, saltRounds, (err, hash) => {
                        if (err) {
                            console.log(err);
                            res.send({
                                state: false,
                                message: `Hash operation failed`,
                            });
                        }

                        user.query(
                            "INSERT INTO users (username, password, isAdmin) VALUES (?,?,?);",
                            [username, hash, admin],
                            (err, results) => {
                                if (err) {
                                    console.log("/register");
                                    res.send({
                                        state: false,
                                        message: `Failed to create ${username} account`,
                                    });
                                } else {
                                    res.send({
                                        state: true,
                                        message: `${username} account creation completed`,
                                    });
                                }
                            }
                        );
                    });
                }
            }
        );
    }
});

function getDate() {
    const ts = Date.now();
    const date_ob = new Date(ts);

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear().toString();

    return `${year}-${month}-${date}`;
}

app.listen(port, () => {
    console.log(`Yey, your server is running on port ${port}`);
});
