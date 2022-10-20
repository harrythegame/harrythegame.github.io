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
    let shortFormatting = ['million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'];
    let longPrefix = ['', 'un', 'duo', 'tre', 'quattuoro', 'quinqua', 'sexto', 'septem', 'octo', 'novem'];
    let longSuffix = ['decillion', 'vigintillion', 'trigintillion', 'quadragintillion', 'quinquagintillion', 'sexagintillion'];
    //I highly doubt it'll ever get to this point, but just in case
    if (num == NaN || num == Infinity)
        return 'Infinite';
    if (num >= 1e6) {
        let numArray = num.toLocaleString('en-US').split(',');
        let numArrayLength = numArray.length - 2;
        let format;
        if (numArrayLength < 10) {
            format = shortFormatting[numArrayLength - 1];
        }
        else {
            format = longPrefix[numArrayLength % 10] + longSuffix[Math.floor(numArrayLength / 10) - 1];
        }
        return `${numArray[0]}.${numArray[1]} ${format}`;
    }
    else {
        return num.toLocaleString('en-US');
    }
}
function FormatDate(milliseconds, sigfigs) {
    //i just put milliseconds so i can pass in Date.now() directly
    let unitNames = ['seconds', 'minutes', 'hours', 'days', 'years'];
    let unitValues = [milliseconds / 1000];
    let dividers = [1, 60, 60, 24, 365];
    for (let unitIndex = 1; unitIndex < unitNames.length; unitIndex++) {
        let previousValue = unitValues[unitIndex - 1];
        unitValues[unitIndex] = Math.floor((previousValue - previousValue % dividers[unitIndex]) / dividers[unitIndex]);
        unitValues[unitIndex - 1] = Math.floor(previousValue % dividers[unitIndex]);
    }
    let strParts = [];
    for (let i = 0; i < unitNames.length; i++) {
        //If the rest of the array is 0s, break
        let shouldBreak = true;
        for (let x = i; x < unitNames.length; x++) {
            if (unitValues[x] !== 0)
                shouldBreak = false;
        }
        if (shouldBreak)
            break;
        strParts.push(`${unitValues[i]} ${unitNames[i]}`);
    }
    strParts = strParts.reverse();
    //Remove all unecessary items
    strParts.splice(sigfigs);
    let str = '';
    for (let i = 0; i < strParts.length; i++) {
        if (i + 1 == strParts.length - 1) {
            str += `${strParts[i]} and ${strParts[i + 1]}`;
            break;
        }
        else if (strParts.length == 1) {
            str = `${strParts[0]}`;
        }
        else {
            str += `${strParts[i]}, `;
        }
    }
    return str;
}
function UpdateIfPriceAvailableOnElement(element, price) {
    element.html(`Price: ${Beautify(Math.ceil(price))} toes`);
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
    let screen;
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
