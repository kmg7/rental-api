CREATE TABLE Employees(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    password BYTEA
);
CREATE TABLE Companies(
    id SERIAL PRIMARY KEY,
    name varchar(50),
    phone varchar(15)
);
CREATE TABLE Clients(
    id SERIAL PRIMARY KEY,
    name varchar(50),
    ssn varchar(50),
    email varchar(50),
    password BYTEA,
    creditCard varchar(20)
);
CREATE TABLE Vehicles(
    id SERIAL PRIMARY KEY,
    class varchar(20),
    make varchar(20),
    model varchar(20),
    transmission varchar(20),
    engineType varchar(20),
    bodyType varchar(20)
);
CREATE TABLE RentOffers(
    id SERIAL PRIMARY KEY,
    pricePerDay NUMERIC(10, 2),
    currency VARCHAR(3),
    deposit NUMERIC(10, 2),
    minDriverAge INTEGER,
    minDriverLicenceAge INTEGER,
    vehicleId INTEGER NOT NULL REFERENCES Vehicles(id),
    companyId INTEGER NOT NULL REFERENCES Companies(id)
);
CREATE TABLE Rents(
    id SERIAL PRIMARY KEY,
    startDate DATE,
    finishDate DATE,
    fee NUMERIC(10, 2),
    offerId INTEGER NOT NULL REFERENCES RentOffers(id),
    clientId INTEGER NOT NULL REFERENCES Clients(id)
);