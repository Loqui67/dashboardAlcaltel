#########################################################################################################
#to run once (insert all statements):
INSERT INTO State (currentState) VALUES ('passed'),('failed'),('skipped'),('not played');
#########################################################################################################
#to run once (first setup for browser):
INSERT INTO Browser (browser_name) VALUES ('Chrome'),('Firefox'),('Edge'),('Safari'),('Opera');

#########################################################################################################
#insert new sprint if not exist 
SELECT ISNULL((SELECT id_sprint FROM Sprint WHERE sprint_name = 'aaa' AND patch = 'bbb')) AS 'null';
# if result.null === 1 (A mettre dans le code):
INSERT INTO Sprint (sprint_name, patch) VALUES ('aaa', 'bbb');

DELIMITER //
CREATE PROCEDURE InsertSprintIfNotExist(
IN name INT,
IN ptch INT
)
BEGIN
CASE WHEN (SELECT id_sprint FROM Sprint WHERE sprint_name = name AND patch = ptch) IS NULL
THEN INSERT INTO Sprint (sprint_name, patch) VALUES (name, ptch);
ELSE BEGIN END;
END CASE;
END //


#########################################################################################################
#insert new testsSuites if not exist 
SELECT ISNULL((SELECT id_testsSuites FROM testsSuites WHERE testsSuites_name = 'aaa')) AS 'null';
# if result.null === 1 (A mettre dans le code):
INSERT INTO TestsSuites (testsSuites_name, description) VALUES ('aaa', 'bbb');

DELIMITER //
CREATE PROCEDURE InsertTestsSuitesIfNotExist(
IN name VARCHAR(100),
IN desrptn TEXT(300)
)
BEGIN
CASE WHEN (SELECT id_testsSuites FROM testsSuites WHERE testsSuites_name = name) IS NULL
THEN INSERT INTO TestsSuites (testsSuites_name, description) VALUES (name, desrptn);
ELSE BEGIN END;
END CASE;
END //


#########################################################################################################
#insert new browser if not exist 
SELECT ISNULL((SELECT id_browser FROM Browser WHERE browser_name = 'aaa')) AS 'null';
# if result.null === 1 (A mettre dans le code):
INSERT INTO Browser (browser_name) VALUES ('aaa');


DELIMITER //
CREATE PROCEDURE InsertBrowserIfNotExist(
IN name VARCHAR(50)
)
BEGIN
CASE WHEN (SELECT id_browser FROM Browser WHERE browser_name = name) IS NULL
THEN INSERT INTO Browser (browser_name) VALUES (name);
ELSE BEGIN END;
END CASE;
END //


#########################################################################################################
#insert new testCase if not exist 
SELECT ISNULL((SELECT id_testcase FROM testCase WHERE name = 'aaa')) AS 'null';
# if result.null === 1 (A mettre dans le code):
INSERT INTO testCase (name, purpose, contrainte, obselete) VALUES ('aaa', 'bbb', 'ccc', 0);
INSERT INTO step (description, verif) VALUES ('ddd', 'eee');
INSERT INTO composer(id_testcase, id_step) VALUES (
    (
        SELECT id_testcase FROM testCase WHERE name = 'aaa'
    ),
    (
        SELECT id_step FROM step WHERE description = 'ddd' AND verif = 'eee'
    )
);


DELIMITER //
CREATE PROCEDURE InsertTestCaseIfNotExist(
IN nme VARCHAR(50),
IN prps TEXT(300),
IN ctrnt TEXT(300),
IN descrptn TEXT,
IN vrf TEXT
)
BEGIN
CASE WHEN (SELECT id_testcase FROM testCase NATURAL JOIN composer NATURAL JOIN step WHERE name = nme) IS NULL
THEN 
INSERT INTO testCase (name, purpose, contrainte, obselete) VALUES (nme, prps, ctrnt, 0);
INSERT INTO step (description, verif) VALUES (descrptn, vrf);
INSERT INTO composer(id_testcase, id_step) VALUES (
    (
        SELECT id_testcase FROM testCase WHERE name = nme
    ),
    (
        SELECT id_step FROM step WHERE description = descrptn AND verif = vrf
    )
);
ELSE BEGIN END;
END CASE;
END //


#insert more step if not exist 

DELIMITER //
CREATE PROCEDURE InsertMoreStepsIfNotExist(
IN nme VARCHAR(50),
IN descrptn TEXT,
IN vrf TEXT
)
BEGIN
CASE WHEN (SELECT id_testcase FROM testCase NATURAL JOIN composer NATURAL JOIN step WHERE name = nme AND description = descrptn AND verif = vrf) IS NULL
THEN 
INSERT INTO step (description, verif) VALUES (descrptn, vrf);
INSERT INTO composer(id_testcase, id_step) VALUES (
    (
        SELECT id_testcase FROM testCase WHERE name = nme
    ),
    (
        SELECT id_step FROM step WHERE description = descrptn AND verif = vrf
    )
);
ELSE BEGIN END;
END CASE;
END //

#set testCase if exist to obselete

DELIMITER //
CREATE PROCEDURE UpdateTestCaseIfExistToObselete(
IN nme VARCHAR(50),
IN setObselete BOOLEAN
)
BEGIN
CASE WHEN (SELECT id_testcase FROM testCase WHERE name = nme) IS NOT NULL
THEN 
UPDATE testCase set obselete = setObselete WHERE name = nme;
ELSE BEGIN END;
END CASE;
END //

#########################################################################################################
#insert new testRun
INSERT INTO TestsRun (id_testsSuites, id_state, id_sprint, id_browser, id_testcase)
VALUES (
    (SELECT id_testsSuites FROM testsSuites WHERE testSuites_name = 'aaa'),
    (SELECT id_state FROM State WHERE currentState = 'bbb'),
    (SELECT id_sprint FROM Sprint WHERE sprint_name = 'ccc' AND patch = 'ddd'),
    (SELECT id_browser FROM Browser WHERE browser_name = 'eee'),
    (SELECT id_testcase FROM testCase WHERE name = 'fff')
);


DELIMITER //
CREATE PROCEDURE InsertTestsRun(
IN TSname VARCHAR(100),
IN stte VARCHAR(100),
IN sp_name INT,
IN ptch INT,
IN br_name VARCHAR(50),
IN tc_name VARCHAR(50)
)
BEGIN
INSERT INTO TestsRun (id_testsSuites, id_state, id_sprint, id_browser, id_testcase)
VALUES (
    (SELECT id_testsSuites FROM testsSuites WHERE testSuites_name = TSname),
    (SELECT id_state FROM State WHERE currentState = stte),
    (SELECT id_sprint FROM Sprint WHERE sprint_name = sp_name AND patch = ptch),
    (SELECT id_browser FROM Browser WHERE browser_name = br_name),
    (SELECT id_testcase FROM testCase WHERE name = tc_name)
);
END //

#########################################################################################################
#insert new log
INSERT INTO log (screenshot_luke, screenshot_rey, error_message, id_testsRun)
VALUES (
'screen 1',
'screen 2',
'aaa',
(
    SELECT id_testsRun FROM TestsRun 
        WHERE
            id_state = 2 
        AND
            id_browser = (SELECT id_browser FROM Browser WHERE browser_name = 'bbb') 
        AND
            id_testcase = (SELECT id_testcase FROM testCase WHERE name = 'ccc') 
        AND
            id_sprint = (SELECT id_sprint FROM Sprint WHERE sprint_name = 'ddd' AND patch = 'eee') 
        AND
            id_testsSuites = (SELECT id_testsSuites FROM testsSuites WHERE testSuites_name = 'fff')
        ORDER BY id_testRun DESC LIMIT 1
)
);


DELIMITER //
CREATE PROCEDURE InsertLogs(
IN screenLuke VARCHAR(100),
IN screenRey VARCHAR(100),
IN errMessage TEXT(1000),
IN TSname VARCHAR(100),
IN sp_name INT,
IN ptch INT,
IN br_name VARCHAR(50),
IN tc_name VARCHAR(50)
)
BEGIN
INSERT INTO log (screenshot_luke, screenshot_rey, error_message, id_testsRun)
VALUES (
screenLuke,
screenRey,
errMessage,
(
    SELECT id_testRun FROM TestsRun 
        WHERE
            id_state = 2 
        AND
            id_browser = (SELECT id_browser FROM Browser WHERE browser_name = br_name) 
        AND
            id_testcase = (SELECT id_testcase FROM testCase WHERE name = tc_name) 
        AND
            id_sprint = (SELECT id_sprint FROM Sprint WHERE sprint_name = sp_name AND patch = ptch) 
        AND
            id_testsSuites = (SELECT id_testsSuites FROM testsSuites WHERE testsSuites_name = TSname)
        ORDER BY id_testRun DESC LIMIT 1
)
);
END //
#########################################################################################################








#########################################################################################################
#to run once (insert all statements):
INSERT INTO State (currentState) VALUES ('passed'),('failed'),('skipped'),('not played');
#########################################################################################################
#to run once (first setup for browser):
INSERT INTO Browser (browser_name) VALUES ('Chrome'),('Firefox'),('Edge'),('Safari');
#########################################################################################################
#insert new sprint if not exist 
CALL InsertSprintIfNotExist(INT name, INT patch);
#########################################################################################################
#insert new testsSuites if not exist 
CALL InsertTestsSuitesIfNotExist(VARCHAR(100) name, TEXT(300) description);
#########################################################################################################
#insert new browser if not exist 
CALL InsertBrowserIfNotExist(VARCHAR(50) name);
#########################################################################################################
#insert new testCase if not exist 
CALL InsertTestCaseIfNotExist(VARCHAR(50) name, TEXT(300) purpose, TEXT(300) contrainte, TEXT description, TEXT verif);

#insert more step if not exist 
CALL InsertMoreStepsIfNotExist(VARCHAR(50) name, TEXT description, TEXT verif);

#set testCase if exist to obselete
CALL UpdateTestCaseIfExistToObselete(VARCHAR(50) name, BOOLEAN setObselete)
#########################################################################################################
#insert new testRun
CALL InsertTestsRun(VARCHAR(100) TSname, VARCHAR(100) state, INT sprint_name, INT patch, VARCHAR(50) browser_name, VARCHAR(50) testCase_name);
#########################################################################################################
#insert new log
CALL InsertLogs(VARCHAR(100) screenLuke, VARCHAR(100) screenRey, TEXT(1000) errMessage, VARCHAR(100) TSname, INT sprint_name, INT patch, VARCHAR(50) browser_name, VARCHAR(50) testCase_name);