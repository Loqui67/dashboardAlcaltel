SELECT DISTINCT sprint_name FROM sprint NATURAL JOIN tests NATURAL JOIN state WHERE name = "Test3" AND id_sprint != 1 ORDER BY sprint_name, patch