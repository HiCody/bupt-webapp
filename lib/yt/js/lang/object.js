(function () {

    function extend(destination, source) {
        for (var property in source)
            destination[property] = source[property];
        return destination;
    }

    function clone(object) {
        return extend({ }, object);
    }

    function equals(x, y) {
        if (x === y) {
            return true;
        }

        if (!( x instanceof Object ) || !( y instanceof Object )) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        for (var p in x) {
            if ('$$hashKey' == p)
                break;
            if (x.hasOwnProperty(p)) {
                if (!y.hasOwnProperty(p)) {
                    return false;
                }

                if (x[ p ] === y[ p ]) {
                    continue;
                }

                if (typeof( x[ p ] ) !== "object") {
                    return false;
                }

                if (!Object.equals(x[ p ], y[ p ])) {
                    return false;
                }
            }
        }

        for (p in y) {
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                return false;
            }
        }
        return true;
    };

    extend(Object, {
        extend: extend,
        equals: equals,
        clone: clone
    });
})();