var arr = [1, 2, 4, 4, 3, 3, 1, 5, 3];

function repeat(arr) {
    var result = arr.filter((x, i, self) => {
        return self.indexOf(x) === i && self.lastIndexOf(x) != i;
    });
    return result;
}