#/testHistory

CALL testHistory(name, id);

DELIMITER //
CREATE PROCEDURE testHistory(
IN nme VARCHAR(50),
IN id INT
)
BEGIN
SELECT * FROM sprint NATURAL JOIN testsrun NATURAL JOIN state WHERE id_testcase = (SELECT id_testcase FROM testcase WHERE name = nme) AND id_sprint != id ORDER BY sprint_name, patch;
END //




#/sprintWithLogs

CALL sprintWithLogs(id);

DELIMITER //
CREATE PROCEDURE sprintWithLogs(
IN id INT
)
BEGIN
SELECT * FROM testsrun NATURAL JOIN log WHERE id_sprint = id;
END //



#/testState

CALL testState(id);

DELIMITER //
CREATE PROCEDURE testState(
IN id INT
)
BEGIN
SELECT * FROM testcase NATURAL JOIN testsrun NATURAL JOIN state WHERE id_sprint = id;
END //



#/testStateCount

CALL testStateCount(id, brwsr_id);

DELIMITER //
CREATE PROCEDURE testStateCount(
IN id INT,
IN brwsr INT
)
BEGIN
SELECT 
count(if(currentState='passed' AND id_browser = brwsr,1,NULL)) as "passed",
count(if(currentState='failed' AND id_browser = brwsr,1,NULL)) as "failed",
count(if(currentState='skipped' AND id_browser = brwsr,1,NULL)) as "skipped",
count(if(currentState='not played' AND id_browser = brwsr,1,NULL)) as "not_played" 
FROM testsrun
NATURAL JOIN State 
WHERE id_sprint = id;
END //


#/testSuite

CALL testSuite();

DELIMITER //
CREATE PROCEDURE testSuite(
)
BEGIN
SELECT * FROM testssuites;
END //



#/sprint

CALL sprint();

DELIMITER //
CREATE PROCEDURE sprint(
)
BEGIN
SELECT * FROM sprint ORDER BY sprint_name, patch
END //



#/testSuiteFromSprint

CALL testSuiteFromSprint(id);

DELIMITER //
CREATE PROCEDURE testSuiteFromSprint(
    IN id INT
)
BEGIN
SELECT DISTINCT id_testsSuites, id_browser, testsSuites_name FROM testsrun NATURAL JOIN testssuites WHERE id_sprint = id;
END //



#/browser

CALL browser();

DELIMITER //
CREATE PROCEDURE sprint(
)
BEGIN
SELECT * FROM browser;
END //



#/step

CALL step(name);

DELIMITER //
CREATE PROCEDURE sprint(
    IN nme VARCHAR(50)
)
BEGIN
SELECT * FROM testcase NATURAL JOIN composer NATURAL JOIN step WHERE name = nme;
END //

