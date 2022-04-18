var equalOfTwoStringLimit = (src, des, index) => {
    let i = 0;
    while (i <= index && src[i] === des[i]) {
        i++;
    }
    return i - 1;
}
var longestCommonPrefix = function (strs) {
    let i = 1;
    let indexFound;
    indexFound = equalOfTwoStringLimit(strs[0], strs[1], strs[0].length - 1);
    while (i < strs.length - 1 && indexFound >= 0) {
        indexFound = equalOfTwoStringLimit(strs[i], strs[i + 1], indexFound);
        i++;
    }

    if (indexFound < 0) return "";
    return strs[0].substring(0, indexFound + 1);
};
console.log(longestCommonPrefix(["flower", "flow", "flight"]));
