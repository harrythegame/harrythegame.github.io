//Using templates so we have type-checking (passing an array of strings will return a string)
function Choose(arr) {
    return arr[Math.round(Math.random() * (arr.length - 1))];
}
function ChooseIndex(arr) {
    return Math.round(Math.random() * (arr.length - 1));
}
function Random(min, max) {
    return min + Math.round(Math.random() * (max - min));
}
//Numbers and their formatting
function Beautify(num) {
    var shortFormatting = ['million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'];
    var longPrefix = ['', 'un', 'duo', 'tre', 'quattuoro', 'quinqua', 'sexto', 'septem', 'octo', 'novem'];
    var longSuffix = ['decillion', 'vigintillion', 'trigintillion', 'quadragintillion', 'quinquagintillion', 'sexagintillion'];
    //I highly doubt it'll ever get to this point, but just in case
    if (num == NaN || num == Infinity)
        return 'Infinite';
    if (num >= 1e6) {
        var numArray = num.toLocaleString('en-US').split(',');
        var numArrayLength = numArray.length - 2;
        var format = void 0;
        if (numArrayLength < 10) {
            format = shortFormatting[numArrayLength - 1];
        }
        else {
            format = longPrefix[numArrayLength % 10] + longSuffix[Math.floor(numArrayLength / 10) - 1];
        }
        return "".concat(numArray[0], ".").concat(numArray[1], " ").concat(format);
    }
    else {
        return num.toLocaleString('en-US');
    }
}
function FormatDate(milliseconds, sigfigs) {
    //i just put milliseconds so i can pass in Date.now() directly
    var unitNames = ['seconds', 'minutes', 'hours', 'days', 'years'];
    var unitValues = [milliseconds / 1000];
    var dividers = [1, 60, 60, 24, 365];
    for (var unitIndex = 1; unitIndex < unitNames.length; unitIndex++) {
        var previousValue = unitValues[unitIndex - 1];
        unitValues[unitIndex] = Math.floor((previousValue - previousValue % dividers[unitIndex]) / dividers[unitIndex]);
        unitValues[unitIndex - 1] = Math.floor(previousValue % dividers[unitIndex]);
    }
    var strParts = [];
    for (var i = 0; i < unitNames.length; i++) {
        //If the rest of the array is 0s, break
        var shouldBreak = true;
        for (var x = i; x < unitNames.length; x++) {
            if (unitValues[x] !== 0)
                shouldBreak = false;
        }
        if (shouldBreak)
            break;
        strParts.push("".concat(unitValues[i], " ").concat(unitNames[i]));
    }
    strParts = strParts.reverse();
    //Remove all unecessary items
    strParts.splice(sigfigs);
    var str = '';
    for (var i = 0; i < strParts.length; i++) {
        if (i + 1 == strParts.length - 1) {
            str += "".concat(strParts[i], " and ").concat(strParts[i + 1]);
            break;
        }
        else if (strParts.length == 1) {
            str = "".concat(strParts[0]);
        }
        else {
            str += "".concat(strParts[i], ", ");
        }
    }
    return str;
}
function UpdateIfPriceAvailableOnElement(element, price) {
    if (Game.Toes >= price) {
        if (!element.hasClass('price-available')) {
            element.removeClass('price-unavailable');
            element.addClass('price-available');
        }
    }
    else {
        if (!element.hasClass('price-unavailable')) {
            element.removeClass('price-available');
            element.addClass('price-unavailable');
        }
    }
}
function ConvertPercentageToPx(percentange, angle) {
    var screen;
    switch (angle) {
        case 'width':
            screen = window.innerWidth;
        case 'height':
            screen = window.innerHeight;
    }
    return (screen / 100) * percentange;
}
function ConvertPxToNum(per) {
    return parseInt(per.substring(0, per.length - 2));
}
