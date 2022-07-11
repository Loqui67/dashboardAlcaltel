const mysql = require('mysql')

const db = mysql.createPool({
    connectionLimit: 10,
    user: 'remote',
    host: '137.74.95.140',
    port: 3306,
    password: 'Pcloud123!',
    database: 'rainbow_autotest',
    debug: false
});

const login = mysql.createPool({
    connectionLimit: 10,
    user: 'remote',
    host: '137.74.95.140',
    port: 3306,
    password: 'Pcloud123!',
    database: 'users_dashboard',
    debug: false
});

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

const bcrypt = require("bcrypt")
const saltRounds = 10;



const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({
    origin: ["http://ns3053040.ip-137-74-95.eu:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "userID",
        secret: "Pcloud123!",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 1000 * 60 * 60 * 24,
        },
    })
)

app.use(express.json());

app.get("/logout", (req, res) => {
    req.session.destroy();
});

app.get("/version", (req, res) => {
    db.query("CALL version();", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/testSuite", (req, res) => {
    db.query("CALL testSuite();", (err, result) => {
        if (err) {
            console.log("/testSuite");
        } else {
            res.send(result);
        }
    });
});

app.get("/testSuiteFromVersion", (req, res) => {
    const id = req.query.id;
    db.query("CALL testSuiteFromVersion(?);"
        , id, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});


app.get("/testSuiteFromVersionWithDate", (req, res) => {
    const id = req.query.id;
    db.query("CALL testSuiteFromVersionWithDate(?);"
        , id, (err, result) => {
            if (err) {
                console.log("/testSuiteFromVersionWithDate");
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/testStateCount", (req, res) => {
    const id = req.query.id;
    const client = req.query.client;
    db.query("CALL testStateCount(?, ?);"
        , [id, client], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/testStateCountWithDate", (req, res) => {
    const id = req.query.id;
    const client = req.query.client;
    const date = req.query.date;
    db.query("CALL testStateCountWithDate(?, ?, ?);"
        , [id, client, date], (err, result) => {
            if (err) {
                console.log("/testStateCountWithDate");
            } else {
                res.send(result);
            }
        }
    );
});


app.get("/testState", (req, res) => {
    const id = req.query.id;
    db.query("CALL testState(?);"
        , id, (err, result) => {
            if (err) {
                console.log("/testState");
            } else {
                res.send(result);
            }
        }
    );
});


app.get("/versionWithLogs", (req, res) => {
    const id = req.query.id;
    db.query("CALL VersionWithLogs(?);"
        , id, (err, result) => {
            if (err) {
                console.log("/versionWithLogs");
            } else {
                res.send(result);
            }
        }
    );
});


app.get("/testHistory", (req, res) => {
    const name = req.query.name;
    const id = req.query.id;
    db.query("CALL testHistory(?, ?);"
        , [name, id], (err, result) => {
            if (err) {
                console.log("/testHistory");
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});


app.get("/client", (req, res) => {
    db.query("CALL client();"
        , (err, result) => {
            if (err) {
                console.log("/client");
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/clientDistinct", (req, res) => {
    db.query("CALL clientDistinct();"
        , (err, result) => {
            if (err) {
                console.log("/clientDistinct");
            } else {
                res.send(result);
            }
        }
    );
});


app.get("/step", (req, res) => {
    const name = req.query.name;
    db.query("CALL step(?);"
        , name, (err, result) => {
            if (err) {
                console.log("/step");
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/lastVersion", (req, res) => {
    db.query("CALL lastVersion();", (err, result) => {
        if (err) {
            console.log("/lastVersion");
        } else {
            res.send(result);
        }
    });
});

app.get("/state", (req, res) => {
    db.query("CALL state();", (err, result) => {
        if (err) {
            console.log("/state");
        } else {
            res.send(result);
        }
    });
});

app.get("/date", (req, res) => {
    const id = req.query.id;
    db.query("CALL date(?);"
        , id, (err, result) => {
            if (err) {
                console.log("/date");
            } else {
                res.send(result);
            }
        }
    );
});


app.get("/dateWithTS", (req, res) => {
    const id = req.query.id;
    db.query("CALL dateWithTS(?);"
        , id, (err, result) => {
            if (err) {
                console.log("/dateWithTS");
            } else {
                res.send(result);
            }
        }
    );
});


function path(folderName, imageName) {
    const path = `${folderName}/ReportLogs/${imageName}`;
    return path;
}

app.get("/SeleniumReports/:folder/:image", (req, res) => {
    const img = path(req.params.folder, req.params.image);
    res.sendFile(img, { root: "C:/Dashboard/dashboard_with_database/server/SeleniumReports" })
});

app.put("/updatePassword", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
            res.send({ state: false, message: `Hash operation failed` });
        }
        login.query("UPDATE users SET password = ? WHERE username = ?;",
            [hash, username], (err, results) => {
                if (err) {
                    console.log("/updatePassword");
                    res.send({ state: false, message: `Failed to update your password` });
                } else {
                    res.send({ state: true, message: `password well updated` });
                }
            }
        )
    })
})

app.post("/confirmPassword", (req, res) => {

    const username = req.body.username
    const password = req.body.password

    login.query("SELECT username, password FROM users WHERE username = ?",
        username, (err, result) => {
            if (result.length === 0) {
                res.send({state: false, message: "An error occured" })
            }
            else {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        res.send({state: true});
                    } else {
                        res.send({state: false, message: "Wrong password !"});
                    }
                });
            }
        }
    ) 
})

app.post("/register", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const admin = req.body.admin;
    const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

    if (username.length < 5 || username.length > 20 || password.length < 8 || password.length > 30 || format.test(username)) {
        res.send({ state: false, message: "Wrong username/password format" })
    }
    else {
        login.query("SELECT username, password FROM users WHERE username = ?",
            username, (err, result) => {
                if (result.length > 0) {
                    res.send({ state: false, message: "This username is already used" })
                }
                else {
                    bcrypt.hash(password, saltRounds, (err, hash) => {
                        if (err) {
                            console.log(err)
                            res.send({ state: false, message: `Hash operation failed` });
                        }

                        login.query("INSERT INTO users (username, password, isAdmin) VALUES (?,?,?);",
                            [username, hash, admin], (err, results) => {
                                if (err) {
                                    console.log("/register");
                                    res.send({ state: false, message: `Failed to create ${username} account` });
                                } else {
                                    res.send({ state: true, message: `${username} account creation completed` });
                                }
                            }
                        )
                    })
                }
            }
        )
    }
});


app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false, user: "" });
    }
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    login.query(
        "SELECT * FROM users WHERE username = ?;",
        username,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                if (result.length > 0) {
                    bcrypt.compare(password, result[0].password, (error, response) => {
                        if (response) {
                            req.session.user = result;
                            res.send({username: result[0].username, admin: result[0].isAdmin});
                        } else {
                            res.send({ message: "Wrong username/password combination!" });
                        }
                    });
                } else {
                    res.send({ message: "User doesn't exist" });
                }
            }
        }
    );
});



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Yey, your server is running on port ${PORT}`)
})