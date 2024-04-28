status1 = "";
object = [];
function setup()
{
    canvas = createCanvas(480, 380)
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}
function draw()
{
    image(video, 0, 0, 480, 380);
    if (status1 != "")
    {
        objectDetector.detect(video, gotResults)
        for (i = 0; i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects detected"

            noFill();
            stroke("red");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 10, object[i].y + 20);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if (objectName == object[i].label)
            {
                video.stop();
                document.getElementById("found").innerHTML = objectName + " found";
                objectDetector.detect(gotResults);
                synth = window.speechSynthesis
                utterThis = new SpeechSynthesisUtterance(objectName + " found");
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("found").innerHTML = objectName + " not found";
            }
        }
    }
}
function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
    objectName = document.getElementById("textinput").value;
    objectName = objectName.toLowerCase();
    console.log(objectName);
}
function modelLoaded()
{
    status1 = "true";
    console.log("The model is loaded");
}
function gotResults(error, results)
{
    if (error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        object = results;
    }
}