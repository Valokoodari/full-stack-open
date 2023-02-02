CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO
    blogs (author, url, title)
VALUES (
    'Robert C. Martin',
    'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    'TDD Harms Architecture'
);
INSERT INTO
    blogs (author, url, title)
VALUES (
    'Edsger W. Dijkstra',
    'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    'Go To Statement Considered Harmful'
);
INSERT INTO
    blogs (author, url, title)
VALUES (
    'Robert C. Martin',
    'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    'First class tests'
);
