var number = 5;
document.write("My name is: " + number + "<br/>");
myFunction(number, myCallback);

function myFunction(num, callback) {
    document.write(
        "Ran from within myFunction(): " + num + " + 5 = " + (num + 5) + "<br/>"
    );
    callback(num);
}

function myCallback(x) {
    document.write(
        "Ran from within myCallback(): " + x + " + 10 = " + (x + 10) + "<br/>"
    );
}
