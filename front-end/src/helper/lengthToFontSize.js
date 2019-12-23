export const titleFontSize = string => {
    if (string.length < 20) {
        return 1.5;
    } else if (string.length < 22) {
        return 1.5;
    } else if (string.length < 24) {
        return 1.4;
    } else if (string.length < 26) {
        return 1.3;
    } else if (string.length < 28) {
        return 1.2;
    } else {
        return 1.1;
    }
}

export const exerciseFontSize = string => {
    if (string.length < 18) {
        return 1.2;
    } else if (string.length < 20) {
        return .9;
    } else if (string.length < 22) {
        return .8;
    } else {
        return .7;
    }
}