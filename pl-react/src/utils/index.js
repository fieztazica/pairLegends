import * as React from "react";
import PasswordValidator from "password-validator";

function validateEmail(email) {
    const res =
        /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/;
    return res.test(String(email).toLowerCase());
}

function validatePassword(password) {
    const schema = new PasswordValidator();

    schema
        .is()
        .min(8, "at least 8 chars")
        .is()
        .max(100, "no longer than 100 chars")
        .has()
        .uppercase(1, "at least 1 uppercase")
        .has()
        .lowercase(1, "at least 1 lowercase")
        .has()
        .symbols(1, "at least 1 symbol")
        .has()
        .digits(1, "at least 1 digit")
        .has()
        .not()
        .spaces(1, "no spaces")
        .is()
        .not()
        .oneOf(["Passw0rd", "Password123"]);

    const res = schema.validate(password, { details: true });

    return !res.length
        ? true
        : `Your password must follows these: ${res
            .map((invalid) => invalid.message)
            .join(", ")}`;
}

function useWindowSize() {
    const [size, setSize] = React.useState([0, 0]);
    React.useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
}

function getChampName(id, from) {
    let champ = from[id];
    return camelize(champ);
}

function mixChampions() {
    const json = require("./champions.json");
    let clonedJson = { ...json };
    const ChampionsValues = Object.values(clonedJson).sort(
        () => Math.random() - 0.5
    );
    Object.keys(clonedJson).forEach((v, i) => {
        clonedJson[v] = ChampionsValues[i];
    });
    return clonedJson;
}

function camelize(str) {
    return str
        .replace(/^\w|[A-Z]|\b\w/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");
}

function makeScore(tilesDone, tiles, champs, timeLeft) {
    const score = Math.ceil((tilesDone / tiles) * champs * tiles + (timeLeft * champs/10 * tiles/8));
    return isNaN(score) ? 0 : (score < 0 ? 0 : score);
}

export {
    validateEmail,
    validatePassword,
    useWindowSize,
    getChampName,
    camelize,
    mixChampions,
    makeScore,
};
