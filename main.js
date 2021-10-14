status="";
objects=[];
function setup()
{
    canvas=createCanvas(430, 330);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
}
function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    object_name=document.getElementById("input").value;
}
function modelLoaded()
{
    console.log("Model Loaded !");
    status=true;
}
function gotResult(error, results)
{
    if(error){
        console.log(error)
    }
    console.log(results)
    objects=results;
}
function draw()
{
    image(video,0,0,430,330); 
    if(status !="")
    {
        objectDetector.detect(video, gotResult);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are :"+ objects.length;

            fill("#FFFF00");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FFFF00");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        if(objects[i].label==object_name)
        {
            video.stop();
            document.getElementById("status").innerHTML=object_name+"Found";
            symth=window.speechSynthesis;
            utterThis= new SpeechSynthesisUtterance(object_name+"Found");
            synth.speak(utterThis);
        }
        else{
            document.getElementById("status").innerHTML=object_name+"Not Found"
        }
    }
}