status = "";
objects = [];

console.log("Fruits JS Loaded");

function preload() {
    img_fruits = loadImage("Fruit.jpg");
    console.log(img_fruits + "Fruits.JS");
}

function setup() {
    canvas = createCanvas(320, 500);
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_displayer").innerHTML = "Status : DETECTING OBJECTS";
}

function modelLoaded() {
    console.log("MODEL LOADED");
    status = true;
    object_detector.detect(img_fruits, gotresult);
}

function gotresult(error, result) {
    if (error) {
        console.log(error);
    }
    console.log(result);
    objects = result;
}

function draw() {
    image(img_fruits, 0, 0, 320, 500);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status_displayer").innerHTML = "STATUS : OBJECT DETECTED";
            fill("#9593c1");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects.y + 15);
            noFill();
            stroke("#000000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}