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
    var longPrefix = ['un', 'duo', 'tre', 'quattuoro', 'quinqua', 'sexto', 'septem', 'octo', 'novem'];
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
            format = longPrefix[numArrayLength % 10 - 1] + longSuffix[Math.floor(numArrayLength / 10) - 1];
        }
        return "".concat(numArray[0], ".").concat(numArray[1], " ").concat(format);
    }
    else {
        return num.toLocaleString('en-US');
    }
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
