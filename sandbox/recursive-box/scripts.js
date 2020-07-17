var innerBox = $(".box");
var innerBoxDimentions;
var boxHtml = innerBox.clone().removeClass("outter");

$(document).ready(function () {
    do {
        innerBox = findInnerBox(innerBox);
        innerBoxDimentions = innerBox.width() / 2;
        drawBox();
    } while (innerBoxDimentions > 2);

    //var boxHtml = innerBox.clone().width(innerBoxDimentions/2).height(innerBoxDimentions/2);
    innerBox.append(boxHtml);
});

function findInnerBox(box) {
    if (box.children(".box").length > 0) {
        return findInnerBox(box.children(".box"));
    } else {
        return box;
    }
}

function drawBox() {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    boxHtml = boxHtml
        .clone()
        .width(innerBoxDimentions)
        .height(innerBoxDimentions)
        .css("background", randomColor);
    innerBox.append(boxHtml);
}
