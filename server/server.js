const {
    port,
    jwtPassword,
    sessionPassword,
    origin,
    tests,
    user,
    logImagesRootFolder,
    MySQLdumpConnection
} = require('./config');

const compression = require('compression');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt")
const express = require('express')
const cors = require('cors')
const fs = require('fs');
const mysqldump = require('mysqldump')
const jwt = require('jsonwebtoken')
const schedule = require('node-schedule')

const app = express()

const saltRounds = 10;

app.use(cors({
    origin: [origin],
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));

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
)

app.use(express.json());

app.get("/logout", (req, res) => {
    console.log("logout")
    req.session.destroy();
});




app.get("/client", (req, res) => {
    console.log("client")
    tests.query("CALL client();"
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
    console.log("clientDistinct")
    tests.query("CALL clientDistinct();"
        , (err, result) => {
            if (err) {
                console.log("/clientDistinct");
            } else {
                res.send(result);
            }
        }
    );
});


app.get("/clientVersion", (req, res) => {
    const clientChoose = req.query.clientChoose;
    const id = req.query.id;
    console.log("clientVersion")
    tests.query("CALL clientVersion(?, ?);"
        , [id, clientChoose], (err, result) => {
            if (err) {
                console.log("/clientVersion");
            } else {
                res.send(result);
            }
        }
    );
});


app.get("/date", (req, res) => {
    const id = req.query.id;
    console.log("date")
    tests.query("CALL date(?);"
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
    console.log("dateWithTS")
    tests.query("CALL dateWithTS(?);"
        , id, (err, result) => {
            if (err) {
                console.log("/dateWithTS");
            } else {
                res.send(result);
            }
        }
    );
});


app.get("/lastVersion", (req, res) => {
    const client = req.query.client;
    console.log("lastVersion")
    tests.query("CALL lastVersion(?);",client, (err, result) => {
        if (err) {
            console.log("/lastVersion");
        } else {
            res.send(result);
        }
    });
});


app.get("/state", (req, res) => {
    console.log("state")
    tests.query("CALL state();", (err, result) => {
        if (err) {
            console.log("/state");
        } else {
            res.send(result);
        }
    });
});


app.get("/step", (req, res) => {
    const id = req.query.id;
    console.log("step")
    tests.query("CALL step(?);"
        , id, (err, result) => {
            if (err) {
                console.log("/step");
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});


app.get("/testHistory", (req, res) => {
    const name = req.query.name;
    const id = req.query.id;
    const client = req.query.client;
    console.log("testHistory")
    tests.query("CALL testHistory(?, ?, ?);"
        , [name, id, client], (err, result) => {
            if (err) {
                console.log("/testHistory");
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});


app.get("/testState", (req, res) => {
    const id = req.query.id;
    const client = req.query.client;
    console.log("testState")
    tests.query("CALL testState(?, ?);"
        , [id, client], (err, result) => {
            if (err) {
                console.log("/testState");
            } else {
                res.send(result);
            }
        }
    );
});


app.get("/testStateCount", (req, res) => {
    const id = req.query.id;
    const client = req.query.client;
    console.log("testStateCount")
    tests.query("CALL testStateCount(?, ?);"
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
    console.log("testStateCountWithDate")
    tests.query("CALL testStateCountWithDate(?, ?, ?);"
        , [id, client, date], (err, result) => {
            if (err) {
                console.log("/testStateCountWithDate");
            } else {
                res.send(result);
            }
        }
    );
});


app.get("/testSuite", (req, res) => {
    console.log("testSuite")
    tests.query("CALL testSuite();", (err, result) => {
        if (err) {
            console.log("/testSuite");
        } else {
            res.send(result);
        }
    });
});


app.get("/testSuiteFromVersion", (req, res) => {
    console.log("testSuiteFromVersion")
    const id = req.query.id;
    tests.query("CALL testSuiteFromVersion(?);"
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
    console.log("testSuiteFromVersionWithDate")
    tests.query("CALL testSuiteFromVersionWithDate(?);"
        , id, (err, result) => {
            if (err) {
                console.log("/testSuiteFromVersionWithDate");
            } else {
                res.send(result);
            }
        }
    );
});


app.get("/version", (req, res) => {
    console.log("version")
    tests.query("CALL version();", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.get("/versionFromClient", (req, res) => {
    const client = req.query.client;
    console.log("versionFromClient")
    tests.query("CALL versionFromClient(?);",
        client, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});


app.get("/versionWithLogs", (req, res) => {
    const id = req.query.id;
    console.log("versionWithLogs")
    tests.query("CALL VersionWithLogs(?);"
        , id, (err, result) => {
            if (err) {
                console.log("/versionWithLogs");
            } else {
                res.send(result);
            }
        }
    );
});








function path(clientName, folderName, imageName) {
    return `${clientName}/${folderName}/ReportLogs/${imageName}`;
}

app.get("/SeleniumReports/:client/:folder/:image", (req, res) => {
    const img = path(req.params.client, req.params.folder, req.params.image);
    res.sendFile(img, { root: logImagesRootFolder })
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        res.send({ auth: false })
    } else {
        jwt.verify(token, jwtPassword, (err, decoded) => {
            if (err) {
                res.send({ auth: false })
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

app.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send({ auth: true })
})


app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false, user: [] });
    }
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("login : post")

    user.query(
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
                            const id = result[0].id_users;
                            const token = jwt.sign({ id }, jwtPassword, {
                                expiresIn: "1d"
                            })
                            req.session.user = result;
                            res.send({ username: result[0].username, admin: result[0].isAdmin, message: "", auth: true, token: token });
                        } else {
                            res.send({ username: "", admin: false, message: "Wrong username/password combination !", auth: false, token: "" });
                        }
                    });
                } else {
                    res.send({ username: "", admin: false, message: "Wrong username/password combination !", auth: false, token: "" });
                }
            }
        }
    );
});


app.post("/confirmPassword", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    console.log("confirmPassword")
    user.query("SELECT username, password FROM users WHERE username = ?",
        username, (err, result) => {
            if (result.length === 0) {
                res.send({ state: false, message: "An error occured" })
            }
            else {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        res.send({ state: true });
                    } else {
                        res.send({ state: false, message: "Wrong password !" });
                    }
                });
            }
        }
    )
});

app.put("/updatePassword", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("updatePassword")
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
            res.send({ state: false, message: `Failed to update your password` });
        } else {
            user.query("UPDATE users SET password = ? WHERE username = ?;",
                [hash, username], (err, results) => {
                    if (err) {
                        console.log("/updatePassword");
                        res.send({ state: false, message: `Failed to update your password` });
                    } else {
                        res.send({ state: true, message: `password well updated` });
                    }
                }
            );
        }
    });
});

app.post("/register", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const admin = req.body.admin;
    const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    console.log("register")

    if (username.length < 5 || username.length > 20 || password.length < 8 || password.length > 30 || format.test(username)) {
        res.send({ state: false, message: "Wrong username/password format" })
    }
    else {
        user.query("SELECT username, password FROM users WHERE username = ?",
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

                        user.query("INSERT INTO users (username, password, isAdmin) VALUES (?,?,?);",
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


function getDate() {
    const ts = Date.now();
    const date_ob = new Date(ts);

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear().toString();

    return `${year}-${month}-${date}`;
}

function generateHTML(allData, allTS, version, htmlFilePath) {

    const count = {};


    allData.forEach(element => {
        count[element.id_state] = (count[element.id_state] || 0) + 1;
    });

    const state = [
        { id_state: 1, currentState: "passed" },
        { id_state: 2, currentState: "failed" },
        { id_state: 3, currentState: "skipped" },
    ]

    const uniqueTestSuite = [...new Set(allData.map(item => item.id_testsSuites))];

    const style = `
    .divider {
        position: relative;
        margin-top: 20px;
        margin-bottom: 20px;
        height: 1px;
    }
    .div-transparent:before {
        content: "";
        position: absolute;
        top: 0;
        left: 5%;
        right: 5%;
        width: 90%;
        height: 1px;
        background-image: linear-gradient(to left, transparent, rgb(48, 49, 51), transparent);
    }
    html {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif
    }
    .flexColumn {
        display: flex;
        flex-direction: column;
    }
    .flexRow {
        display: flex;
        flex-direction: row;
    }
    .passed {
        color: green;
    }
    .failed {
        color: red;
    }
    .skipped {
        color: orange;
    }
    .test {
        color: blue;
    }`

    const a =
        `
        <html>
        <head>
            <style>
                ${style}
            </style>
        </head>
        <body>
            <div class="flexColumn">
                <h1>Report test auto <br/> ${allData[0].date}</h1>
                <div class="flexRow">
                    <h4>
                        total tests passed :
                        <span class=passed>
                            ${count["1"] === undefined ? 0 : count["1"]}&nbsp;
                        </span>
                    </h4>
                    <h4>
                        total tests failed :
                        <span class=failed>
                            ${count["2"] === undefined ? 0 : count["2"]}&nbsp;
                        </span>
                    </h4>
                    <h4>
                        total tests skipped :
                        <span class=skipped>
                            ${count["3"] === undefined ? 0 : count["3"]}&nbsp;
                        </span>
                    </h4>
                </div>
                ${uniqueTestSuite.map((TS) => {
                    const countTS = {};
            return (`
                        <div class="divider div-transparent" />
                        <h2>${allTS.filter((oneTS) => TS === oneTS.id_testsSuites).map((TStitle) => TStitle.testsSuites_name)}</h2>
                        ${allData.filter((data) => data.id_testsSuites === TS).forEach(element => {
                            countTS[element.id_state] = (countTS[element.id_state] || 0) + 1;
                        }) === undefined ? "" : ""
                            }

                        <div class="flexRow">
                            <h4>
                                tests passed :
                                <span class=passed>
                                    ${countTS["1"] === undefined ? 0 : countTS["1"]} &nbsp;
                                </span>
                            </h4>
                            <h4>
                                tests failed :
                                <span class=failed>
                                    ${countTS["2"] === undefined ? 0 : countTS["2"]} &nbsp;
                                </span>
                            </h4>
                            <h4>
                                tests skipped :
                                <span class=skipped>
                                    ${countTS["3"] === undefined ? 0 : countTS["3"]} &nbsp;
                                </span>
                            </h4>
                        </div>
                        ${allData.filter((data) => data.id_testsSuites === TS).map((data) => {
                    return (
                        `
                        <div class="divider div-transparent" />
                        <div class="flexColumn">
                                    <h3 class="test">
                                        ${data.name} : 
                                        ${state.filter((state) => state.id_state === data.id_state)
                            .map((state) =>
                                `<span class="${state.currentState}">
                                                ${state.currentState}
                                            </span>`
                            )}
                                    </h3>
                                    <p>Client : ${data.client_name} ${data.version}</p>
                                    <a href="http://ns3053040.ip-137-74-95.eu:3000/stats/${data.client_name}/${version}/${data.id_testRun}">Show test in dashboard</a>
                                </div>`
                    )
                }).join("")}`)
        }).join("")}
            </div>
        </body>
    </html>
    `
    fs.writeFileSync(htmlFilePath, a);
}


const MidnightRule = new schedule.RecurrenceRule();
MidnightRule.second = 0;
MidnightRule.minute = 0;
MidnightRule.hour = 0;


/* const ReportRule = new schedule.RecurrenceRule();
ReportRule.second = 0;
MidnightRule.minute = 0;
MidnightRule.hour = 20;

schedule.scheduleJob(ReportRule, () => {
    try {
        const htmlFilePath = `./report ${getDate()}.html`;
        tests.query("CALL lastVersion();", (error, result) => {
            if (error) {
                console.log("err");
            } else {
                tests.query("CALL testSuite();", (TSerror, TSresult) => {
                    if (TSerror) {
                        console.log("/testSuite");
                    } else {
                        tests.query("CALL AllForReport(?,?);",
                            [result[0][0].id_version, getDate()], (err, res) => {
                                if (err) {
                                    console.log("err");
                                } else {
                                    generateHTML(res[0], TSresult[0], result[0][0].id_version, htmlFilePath)

                                }
                            }
                        );
                    }
                })
            }
        });
    } catch (err) {
        console.log(err)
    }

}) */















schedule.scheduleJob(MidnightRule, () => {
    dumpPathDirectory = 'C:/Dashboard/dumps/';
    dumpFileName = `dump ${getDate()}.sql`;

    mysqldump({
        connection: MySQLdumpConnection,
        dumpToFile: dumpPathDirectory + dumpFileName,
    });
})


app.listen(port, () => {
    console.log(`Yey, your server is running on port ${port}`)
})