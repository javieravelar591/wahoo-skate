CREATE TABLE contact (
    name VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL,
    `date-select` DATE NOT NULL,
    `xp-select` VARCHAR(256) NOT NULL,
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
);

CREATE TABLE sale (
    sale_text VARCHAR(256) NOT NULL,
    sale_active BOOLEAN NOT NULL DEFAULT true,
    time_started TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_ended TIMESTAMP DEFAULT NULL
);