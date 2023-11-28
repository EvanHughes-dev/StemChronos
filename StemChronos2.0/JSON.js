const encodingMap = {
    "0": ")",
    "1": "C",
    "2": ";",
    "3": "{",
    "4": "Y",
    "5": "V",
    "6": "7",
    "7": "D",
    "8": "g",
    "9": "&",
    "A": "n",
    "B": "I",
    "C": "]",
    "D": "Q",
    "E": ">",
    "F": "w",
    "G": "R",
    "H": "q",
    "I": "6",
    "J": "!",
    "K": "e",
    "L": "3",
    "M": "0",
    "N": "p",
    "O": "W",
    "P": "%",
    "Q": "l",
    "R": "8",
    "S": "i",
    "T": "M",
    "U": "|",
    "V": "r",
    "W": "O",
    "X": "E",
    "Y": "y",
    "Z": "f",
    "a": "<",
    "b": "}",
    "c": "s",
    "d": "(",
    "e": "h",
    "f": "_",
    "g": "1",
    "h": "B",
    "i": "S",
    "j": "H",
    "k": "X",
    "l": "P",
    "m": "x",
    "n": "N",
    "o": "v",
    "p": "4",
    "q": "d",
    "r": ":",
    "s": "u",
    "t": "c",
    "u": "T",
    "v": "^",
    "w": "t",
    "x": "m",
    "y": "G",
    "z": "L",
    "!": "#",
    "@": "b",
    "#": ".",
    "$": "+",
    "%": "A",
    "^": "@",
    "&": "U",
    "*": ",",
    "(": "$",
    ")": "J",
    "_": "K",
    "+": "9",
    "[": "[",
    "]": "z",
    "{": "j",
    "}": "a",
    "|": "5",
    ";": "*",
    ":": "k",
    ",": "Z",
    ".": "?",
    "<": "o",
    ">": "2",
    "?": "F"
};


function decodeMessage(encodedMessage) {
    const decodingMap = {};
    Object.keys(encodingMap).forEach((key) => {
        decodingMap[encodingMap[key]] = key;
    });

    let decodedMessage = '';
    for (let i = 0; i < encodedMessage.length; i++) {
        const char = encodedMessage[i];
        if (decodingMap[char]) {
            decodedMessage += decodingMap[char];
        } else {
            decodedMessage += char;
        }
    }
    return decodedMessage;
}


