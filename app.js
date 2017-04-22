var Kinect2 = require('kinect2');

var kinect = new Kinect2();

if(kinect.open()) {
    console.log("Kinect Opened");
    //listen for body frames
    kinect.on('bodyFrame', function(bodyFrame){
    	for(var i = 0; i < bodyFrame.bodies.length; i++){
		if(bodyFrame.bodies[i].tracked){
			//console.log(bodyFrame.bodies[i]);
			var rightHandPos = bodyFrame.bodies[i].joints[Kinect2.JointType.handRight].cameraX;
			var leftHandPos = bodyFrame.bodies[i].joints[Kinect2.JointType.handLeft].cameraX;
			var headPos = bodyFrame.bodies[i].joints[Kinect2.JointType.head].cameraX;
			if ( rightHandPos - 0.15 < headPos || leftHandPos - 0.15 < headPos) {
				console.log("Hand touching head");
			}
			else {
				console.log();
			}
		}
	}
    });

    //request body frames
    kinect.openBodyReader();

    //close the kinect after 200 seconds
    setTimeout(function(){
        kinect.close();
        console.log("Kinect Closed");
    }, 200000);
}
