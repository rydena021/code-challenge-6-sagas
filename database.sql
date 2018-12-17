CREATE TABLE "class" (
    "id" SERIAL PRIMARY KEY,
    "class_name" varchar(255) NOT NULL
);

CREATE TABLE "species" (
    "id" SERIAL PRIMARY KEY,
    "species_name" varchar(255) NOT NULL,
    "class_id" INT REFERENCES "class"
);

INSERT INTO "class" ("class_name")
VALUES ('Mammal'), ('Bird'), ('Fish'), ('Reptile'), ('Amphibian');

INSERT INTO "species" ("species_name", "class_id")
VALUES ('Blue Spiny Lizard', 4), ('Murray River Turtle', 4),
('Tomato Frog', 5), ('Wyoming Toad', 5),
('Tiger Salamander', 5), ('Freshwater Catfish', 3),
('Sarus Crane', 2), ('Great Horned Owl', 2),
('Magpie Robin', 2), ('Toco Toucan', 2),
('Northern Pintail Duck', 2), ('Blue-winged Teal', 2),
('Dwarf Mongoose', 1), ('Moutain Goat', 1),
('Guinea Pig', 1), ('Red Kangaroo', 1),
('Tammar Wallaby', 1), ('Koala', 1),
('Dwarf Zebu', 1), ('Red Panda', 1);


SELECT "species".*, "class"."class_name"
FROM "species" LEFT OUTER JOIN "class" ON "class"."id" = "species"."class_id"
ORDER BY "species"."species_name" ASC;
