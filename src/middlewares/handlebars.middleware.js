function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}
const helper = {
    json: (obj) => {
        const keys = Object.keys(obj);
        let a = '{';
        keys.forEach((key) => (a += "'" + key + "':'" + obj[key] + "',"));
        a = a.slice(0, -1) + '}';
        return a;
    },
    section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
    },
    select: function (selected, options) {
        return options.fn(this).replace(new RegExp('value="' + selected + '"'), '$& selected="selected"');
    },
    get: function (Obj, prop) {
        return Obj[prop];
    },
    ifCondition: function (v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return v1 == v2 ? options.fn(this) : options.inverse(this);
            case '===':
                return v1 === v2 ? options.fn(this) : options.inverse(this);
            case '!=':
                return v1 != v2 ? options.fn(this) : options.inverse(this);
            case '!==':
                return v1 !== v2 ? options.fn(this) : options.inverse(this);
            case '<':
                return v1 < v2 ? options.fn(this) : options.inverse(this);
            case '<=':
                return v1 <= v2 ? options.fn(this) : options.inverse(this);
            case '>':
                return v1 > v2 ? options.fn(this) : options.inverse(this);
            case '>=':
                return v1 >= v2 ? options.fn(this) : options.inverse(this);
            case '&&':
                return v1 && v2 ? options.fn(this) : options.inverse(this);
            case '||':
                return v1 || v2 ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    },
    json: function (context) {
        return JSON.stringify(context)?.replace(/"/g, '&quot;');
    },
    ternary: function (test, value1, value2) {
        return test ? value1 : value2;
    },
    inc: function (value) {
        return parseInt(value) + 1;
    },
    dec: function (value) {
        return parseInt(value) - 1;
    },
    append: function (...args) {
        res = '';
        for (let i = 0; i < args.length - 1; i++) {
            res += args[i];
        }
        return res;
    },
    sum: function (...args) {
        res = 0;
        for (let i = 0; i < args.length - 1; i++) {
            res += args[i];
        }
        return res;
    },
    product: function (...args) {
        res = 1;
        for (let i = 0; i < args.length - 1; i++) {
            res *= args[i];
        }
        return res;
    },
    numberWithCommas: function (number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    select: function (selected, options) {
        return options.fn(this).replace(
            new RegExp('value=\"' + selected + '\"'),
            '$& selected="selected"');
    },
    or: function (value, defaultValue) {
        return value || defaultValue;
    },
    date: function(date){
        return formatDate(new Date(date));
    }
};

module.exports = { helper };
