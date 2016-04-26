(function () {
    var arrayProto = Array.prototype;

    function clear() {
        this.length = 0;
        return this;
    }


    function first() {
        return this[0];
    }

    function last() {
        return this[this.length - 1];
    }

    function clone() {
        return this.concat();
    }

    function size() {
        return this.length;
    }

    function insert(index, item) {
        this.splice(index, 0, item);
    };

    function outOfBound(index) {
        return index < 0 || index > this.length;
    };

    function remove(index) {
        if (isNaN(index) || outOfBound.call(this, index)) {
            return false;
        }
        this.splice(index, 1);
    };

    function removeObj(item) {
        var index = this.indexOf(item);
        this.remove(index);
    };

    function indexOf(item) {
        for (var i = 0; i < this.length; i++) {
            if (Object.equals(this[i], item))
                return i;
        }
        return -1;
    };

    Object.extend(arrayProto, {
        first: first,
        last: last,
        size: size,
        insert: insert,
        remove: remove,
        removeObj: removeObj,
        indexOf: indexOf,
        clone: clone
    });
})();
