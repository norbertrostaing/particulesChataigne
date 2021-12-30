
/* ********** GENERAL SCRIPTING **********************

		This templates shows what you can do in this is module script
		All the code outside functions will be executed each time this script is loaded, meaning at file load, when hitting the "reload" button or when saving this file
*/


// You can add custom parameters to use in your script here, they will be replaced each time this script is saved
// var myFloatParam = script.addFloatParameter("My Float Param","Description of my float param",.1,0,1); 		//This will add a float number parameter (slider), default value of 0.1, with a range between 0 and 1

//Here are all the type of parameters you can create
/*
var myTrigger = script.addTrigger("My Trigger", "Trigger description"); 									//This will add a trigger (button)
var myBoolParam = script.addBoolParameter("My Bool Param","Description of my bool param",false); 			//This will add a boolean parameter (toggle), defaut unchecked
var myFloatParam = script.addFloatParameter("My Float Param","Description of my float param",.1,0,1); 		//This will add a float number parameter (slider), default value of 0.1, with a range between 0 and 1
var myIntParam = script.addIntParameter("My Int Param","Description of my int param",2,0,10); 				//This will add an integer number parameter (stepper), default value of 2, with a range between 0 and 10
var myStringParam = script.addStringParameter("My String Param","Description of my string param", "cool");	//This will add a string parameter (text field), default value is "cool"
var myColorParam = script.addColorParameter("My Color Param","Description of my color param",0xff0000ff); 	//This will add a color parameter (color picker), default value of opaque blue (ARGB)
var myP2DParam = script.addPoint2DParameter("My P2D Param","Description of my p2d param"); 					//This will add a point 2d parameter
var myP3DParam = script.addPoint3DParameter("My P3D Param","Description of my p3d param"); 					//This will add a point 3d parameter
var myTargetParam = script.addTargetParameter("My Target Param","Description of my target param"); 			//This will add a target parameter (to reference another parameter)
var myEnumParam = script.addEnumParameter("My Enum Param","Description of my enum param",					//This will add a enum parameter (dropdown with options)
											"Option 1", 1,													//Each pair of values after the first 2 arguments define an option and its linked data
											"Option 2", 5,												    //First argument of an option is the label (string)
											"Option 3", "banana"											//Second argument is the value, it can be whatever you want
											); 	
*/


//you can also declare custom internal variable
//var myValue = 5;

/*
 The init() function will allow you to init everything you want after the script has been checked and loaded
 WARNING it also means that if you change values of your parameters by hand and set their values inside the init() function, they will be reset to this value each time the script is reloaded !
*/

var tools;
var helperName;
var autoCreateName;
var autoCreateId;

var autoCreateMain;
var autoCreateEmitter;
var autoCreateAttractor;
var autoCreateFlux;

var UIColSize = 300;
var UImarginSize = 10;
var UIOtherHeight = 200;
var UIEmitterHeight = 510;


function init()
{
	tools = local.parameters.addContainer("Auto create");
	autoCreateName = tools.addStringParameter("Name", "Name of the item created", "");
	autoCreateId = tools.addIntParameter("ID", "ID of the item created", 0,0);
	autoCreateMain = tools.addTrigger("Create Main", "Create CV group and mapping for main params");
	autoCreateEmitter = tools.addTrigger("Create Emitter", "Create an emitter with given name");
	autoCreateAttractor = tools.addTrigger("Create Attractor", "Create an attractor with given name");
	autoCreateFlux = tools.addTrigger("Create Flux", "Create a flux with given name");
	autoCreateNoiseFlux = tools.addTrigger("Create Noise Flux", "Create a noise flux with given name");
	// test.addFloatParameter("position","Emmiter position", 0,0,1);

	//myFloatParam.set(5); //The .set() function set the parameter to this value.
	//myColorParam.set([1,.5,1,1]);	//for a color parameter, you need to pass an array with 3 (RGB) or 4 (RGBA) values.
	//myP2DParam.set([1.5,-5]); // for a Point2D parameter, you need to pass 2 values (XY)
	//myP3DParam.set([1.5,2,-3]); // for a Point3D parameter, you need to pass 3 values (XYZ)

}

/*
 This function will be called each time a parameter of your script has changed
*/
function scriptParameterChanged(param)
{
	//You can use the script.log() function to show an information inside the logger panel. To be able to actuallt see it in the logger panel, you will have to turn on "Log" on this script.
	// script.log("Parameter changed : "+param.name); //All parameters have "name" property
	// if(param.is(myTrigger)) script.log("Trigger !"); //You can check if two variables are the reference to the same parameter or object with the method .is()
	// else if(param.is(myEnumParam)) script.log("Key = "+param.getKey()+", data = "+param.get()); //The enum parameter has a special function getKey() to get the key associated to the option. .get() will give you the data associated
	// else script.log("Value is "+param.get()); //All parameters have a get() method that will return their value
}

/*
 This function, if you declare it, will launch a timer at 50hz, calling this method on each tick
*/

/*function update(deltaTime)
{
	// script.log("Update : "+util.getTime()+", delta = "+deltaTime); //deltaTime is the time between now and last update() call, util.getTime() will give you a timestamp relative to either the launch time of the software, or the start of the computer.
	for (var i = 0; i< toDelete.length;i++) {
		var c = toDelete[i];
		var p = c.getParent();
		p.removeContainer(c.name);
		toReorder.push(p);
	}
	toDelete = [];
	for (var i = 0; i< toReorder.length; i++) {
		reorderIds(toReorder[i]);
	}
	toReorder = [];
}
*/



/* ********** MODULE SPECIFIC SCRIPTING **********************

	The "local" variable refers to the object containing the scripts. In this case, the local variable refers to the module.
	It means that you can access any control inside  this module by accessing it through its address.
	For instance, if the module has a float value named "Density", you can access it via local.values.density
	Then you can retrieve its value using local.values.density.get() and change its value using local.values.density.set()
*/

/*
 This function will be called each time a parameter of this module has changed, meaning a parameter or trigger inside the "Parameters" panel of this module
 This function only exists because the script is in a module
*/
function moduleParameterChanged(param)
{
	if(param.isParameter())
	{
		script.log("Module parameter changed : "+param.name+" > "+param.get());
	}else 
	{
		script.log("Module parameter triggered : "+param.name);	
	}

	if (param.is(autoCreateMain)) {createCVMMain();} 
	else if (param.is(autoCreateEmitter)) {createCVMEmitter();} 
	else if (param.is(autoCreateAttractor)) {createCVMAttractor();} 
	else if (param.is(autoCreateFlux)) {createCVMFlux();} 
	else if (param.is(autoCreateNoiseFlux)) {createCVMNoiseFlux();} 
	else {}

}


/*
 This function will be called each time a value of this module has changed, meaning a parameter or trigger inside the "Values" panel of this module
 This function only exists because the script is in a module
*/
function moduleValueChanged(value)
{
	if(value.isParameter())
	{
		script.log("Module value changed : "+value.name+" > "+value.get());	
	}else 
	{
		script.log("Module value triggered : "+value.name);	
	}
}

/* ********** OSC MODULE SPECIFIC SCRIPTING ********************* */
/*

OSC Modules have specific methods that can be used to send OSC message from Script.
If you want to send an OSC Message from this script, you can do the following :

local.send("/myAddress",1,.5f,"cool"); //This will send an OSC Message with address "/myAddress" and 3 arguments <int>, <float> and <string>

*/
/*
You can intercept OSC message with the function oscEvent(address, args)
*/

function oscEvent(address, args)
{
	//param "address" is the address of the OSC Message
	//param "args" is an array containing all the arguments of the OSC Message

	script.log("OSC Message received "+address+", "+args.length+" arguments");
	for(var i=0; i < args.length; i++)
	{
		script.log(" > "+args[i]);
	}
}



function explode(v) {
	script.log("  ");
	script.log(" proprietes : ");
	var content = util.getObjectProperties(v);
	for (var i = 0; i< content.length; i++) {
		script.log("  - "+content[i]+" : "+v[content[i]]);
	}

	script.log(" methodes : ");
	content = util.getObjectMethods(v);
	for (var i = 0; i< content.length; i++) {
		script.log("  - "+content[i]);
	}
	script.log("  ");
}

function emitterPosition(id, value) {
	local.send("/Emitter/"+id+"/position", value);
}
function emitterColor (id, value) {
	local.send("/Emitter/"+id+"/color", value);
}
function emitterActive (id, value) {
	value = value ? 1 : 0;
	local.send("/Emitter/"+id+"/active", value);
}
function emitterRate (id, value) {
	local.send("/Emitter/"+id+"/rate", value);
}
function emitterLineLength (id, value) {
	local.send("/Emitter/"+id+"/lineLength", value);
}
function emitterLineAngle (id, value) {
	local.send("/Emitter/"+id+"/lineAngle", value);
}
function emitterRangeInner (id, value) {
	local.send("/Emitter/"+id+"/rangeInner", value);
}
function emitterRangeWidth (id, value) {
	local.send("/Emitter/"+id+"/rangeWidth", value);
}
function emitterLifeTime (id, value) {
	local.send("/Emitter/"+id+"/lifeTime", value);
}
function emitterWeight (id, value) {
 	local.send("/Emitter/"+id+"/weight", value);
 }
function emitterInitSpeed (id, value) {
 	local.send("/Emitter/"+id+"/initSpeed", value);
 }
function emitterInitAngle(id, value) {
 	local.send("/Emitter/"+id+"/initAngle", value);
 }
function emitterInitSpread(id, value) {
 	local.send("/Emitter/"+id+"/initSpread", value);
 }
function emitterInitSpeedAngle(id, value) {
 	local.send("/Emitter/"+id+"/initSpeedAngle", value);
 }
function emitterInitSpeedSpread(id, value) {
 	local.send("/Emitter/"+id+"/initSpeedSpread", value);
 }
function emitterFluxes (id, value) {
 	local.send("/Emitter/"+id+"/fluxes", value);
 }
function emitterNoiseFluxes (id, value) {
 	local.send("/Emitter/"+id+"/noiseFluxes", value);
 }

function attractorPosition(id, value) {
	local.send("/Attractor/"+id+"/position", value);
}
 function attractorActive (id, value) {
 	value = value ? 1 : 0;
 	local.send("/Attractor/"+id+"/active", value);
 }
 function attractorStrength (id, value) {
 	local.send("/Attractor/"+id+"/strength", value);
 }
 function attractorKillingRange (id, value) {
 	local.send("/Attractor/"+id+"/killingRange", value);
 }

function fluxImage(id, value) {
	local.send("/Flux/"+id+"/image", value);
}
function fluxFile(id, value) {
	local.send("/Flux/"+id+"/file", value);
}
 function fluxActive (id, value) {
 	value = value ? 1 : 0;
 	local.send("/Flux/"+id+"/active", value);
 }
 function fluxStrength (id, value) {
 	local.send("/Flux/"+id+"/strength", value);
 }
 function fluxSpeedMult (id, value) {
 	local.send("/Flux/"+id+"/speedMult", value);
 }

 function noiseFluxActive (id, value) {
 	value = value ? 1 : 0;
 	local.send("/NoiseFlux/"+id+"/active", value);
 }
 function noiseFluxStrength (id, value) {
 	local.send("/NoiseFlux/"+id+"/strength", value);
 }
 function noiseFluxSpeedMult (id, value) {
 	local.send("/NoiseFlux/"+id+"/speedMult", value);
 }
 function noiseFluxScale(id, value) {
 	local.send("/NoiseFlux/"+id+"/scale", value);
 }
 function noiseFluxSpeed(id, value) {
 	local.send("/NoiseFlux/"+id+"/speed", value);
 }



function mainBackgroundColor(value) {
	local.send("/Main/backgroundColor", value);
}
function mainBackgroundAlpha(value) {
	local.send("/Main/backgroundAlpha", value);
}
function mainSlippyness(value) {
	local.send("/Main/slippyness", value);
}
function mainExplose(pos, range, strength) {
	local.send("/Main/explose", pos, range, strength);
}
function mainBorderType(value) {
	script.log(" hey"+ value+".");
	local.send("/Main/borderType", value);
}

function createCVAnMapping(cvGroup, state, paramType, name, category, method, number) {
	var customVariable = cvGroup.variables.addItem(paramType+' Parameter');
	customVariable.setName(name);

	var hack = customVariable.getControlAddress().split("/");
	var target = "/customVariables/customVariables/values/"+hack[2]+"/"+hack[4];
	var m = state.processors.addItem("Mapping");
	m.setName(name);
	var inputVal = m.inputs.addItem("InputValue");
	inputVal.inputValue.set(target);

	var output = m.outputs.addItem("MappingOutput");
	var command = output.setCommand(local.name, category, method);
	if (number !== undefined){
		command.number.set(number);
	}
	command.linkParamToMappingIndex(command.value, 0);
	return {"cv":customVariable, "command":command};
}

function createCVMMain() {
	var name = autoCreateName.get();
	if (name == "") {name = "Main "; }

	var customVariableGroup = root.customVariables.addItem();
	var groupName = " "+name;
	customVariableGroup.setName(groupName);

	var mappingState = root.states.addItem("State");
	mappingState.setName("Mappings - "+name);


	var cvBorder = createCVAnMapping(customVariableGroup, mappingState, "Enum", "BorderType", "Main", "Main Border");
	cvBorder.cv["newEnumParameter"].addOption("Loop", 0);
	cvBorder.cv["newEnumParameter"].addOption("Bounce", 1);
	cvBorder.cv["newEnumParameter"].addOption("free", 2);
	var cvAlpha = createCVAnMapping(customVariableGroup, mappingState, "Float", "Alpha", "Main", "Main Alpha");
	var cvSlippyness = createCVAnMapping(customVariableGroup, mappingState, "Float", "Slippyness", "Main", "Main Slippyness");
	customVariableGroup.presets.addItem();

	cvAlpha.cv["newFloatParameter"].setRange(0,1);
	cvAlpha.cv["newFloatParameter"].set(1);
	cvSlippyness.cv["newFloatParameter"].setRange(0,1);
	cvSlippyness.cv["newFloatParameter"].set(0.999);
	customVariableGroup.presets.addItem();

	util.delayThreadMS(500);
	mappingState.viewUISize.set(UIColSize,UIOtherHeight);
	mappingState.viewUIPosition.set(0,0);

}

function createCVMEmitter() {
	var name = autoCreateName.get();
	var id = autoCreateId.get();
	if (name == "") {name = "Emitter "+id; }

	var customVariableGroup = root.customVariables.addItem();
	var groupName = " "+name;
	customVariableGroup.setName(groupName);

	var mappingState = root.states.addItem("State");
	mappingState.setName("Mappings - "+name);

	var cvActive = createCVAnMapping(customVariableGroup, mappingState, "Bool", "Active", "Emitter", "Emitter Active", id);
	var cvPosition = createCVAnMapping(customVariableGroup, mappingState, "Point2D", "Position", "Emitter", "Emitter Position",id);
	var cvColor = createCVAnMapping(customVariableGroup, mappingState, "Color", "Color", "Emitter", "Emitter Color", id);
	var cvRate = createCVAnMapping(customVariableGroup, mappingState, "Float", "Rate", "Emitter", "Emitter Rate", id);
	var cvLineLength = createCVAnMapping(customVariableGroup, mappingState, "Float", "Line Length", "Emitter", "Emitter Line Length", id);
	var cvLineAngle = createCVAnMapping(customVariableGroup, mappingState, "Float", "Line Angle", "Emitter", "Emitter Line Angle", id);
	var cvRangeInner = createCVAnMapping(customVariableGroup, mappingState, "Float", "Range Inner", "Emitter", "Emitter Range Inner", id);
	var cvRangeWidth = createCVAnMapping(customVariableGroup, mappingState, "Float", "Range Width", "Emitter", "Emitter Range Width", id);
	var cvLifeTime = createCVAnMapping(customVariableGroup, mappingState, "Float", "LifeTime", "Emitter", "Emitter LifeTime", id);
	var cvWeight = createCVAnMapping(customVariableGroup, mappingState, "Float", "Weight", "Emitter", "Emitter Weight", id);
	var cvInitAngle = createCVAnMapping(customVariableGroup, mappingState, "Float", "Init Angle", "Emitter", "Emitter Init Angle", id);
	var cvInitSpread = createCVAnMapping(customVariableGroup, mappingState, "Float", "Init Spread", "Emitter", "Emitter Init Spread", id);
	var cvParticuleSpeed = createCVAnMapping(customVariableGroup, mappingState, "Float", "Init speed", "Emitter", "Emitter Particule speed", id);
	var cvInitSpeedAngle = createCVAnMapping(customVariableGroup, mappingState, "Float", "Init Speed Angle", "Emitter", "Emitter Init Speed Angle", id);
	var cvInitSpeedSpread = createCVAnMapping(customVariableGroup, mappingState, "Float", "Init Speed Spread", "Emitter", "Emitter Init Speed Spread", id);	
	var cvFluxes = createCVAnMapping(customVariableGroup, mappingState, "String", "Fluxes", "Emitter", "Emitter Fluxes", id);
	var cvNoiseFluxes = createCVAnMapping(customVariableGroup, mappingState, "String", "Noise Fluxes", "Emitter", "Emitter Noise Fluxes", id);

	customVariableGroup.presets.addItem();

	cvPosition.cv["newPoint2DParameter"].setRange([0,0],[1,1]);
	cvPosition.cv["newPoint2DParameter"].set([0.5,0.5]);
	cvColor.cv["newColorParameter"].set([1,1,1,1]);
	cvRate.cv["newFloatParameter"].setRange(0,300);
	cvRate.cv["newFloatParameter"].set(10);
	cvLineLength.cv["newFloatParameter"].setRange(0,1000);
	cvLineAngle.cv["newFloatParameter"].setRange(0,1);
	cvRangeInner.cv["newFloatParameter"].setRange(0,1000);
	cvRangeWidth.cv["newFloatParameter"].setRange(0,1000);
	cvLifeTime.cv["newFloatParameter"].setRange(0,30);
	cvLifeTime.cv["newFloatParameter"].set(2);		
	cvWeight.cv["newFloatParameter"].setRange(0,20);
	cvWeight.cv["newFloatParameter"].set(1);		
	cvInitAngle.cv["newFloatParameter"].setRange(0,1);
	cvInitAngle.cv["newFloatParameter"].set(0);
	cvInitSpread.cv["newFloatParameter"].setRange(0,1);
	cvInitSpread.cv["newFloatParameter"].set(1);
	cvParticuleSpeed.cv["newFloatParameter"].setRange(0,20);
	cvParticuleSpeed.cv["newFloatParameter"].set(1);
	cvInitSpeedAngle.cv["newFloatParameter"].setRange(0,1);
	cvInitSpeedAngle.cv["newFloatParameter"].set(0);
	cvInitSpeedSpread.cv["newFloatParameter"].setRange(0,1);
	cvInitSpeedSpread.cv["newFloatParameter"].set(1);

	customVariableGroup.presets.addItem();

	util.delayThreadMS(500);
	mappingState.viewUISize.set(UIColSize,UIEmitterHeight);
	mappingState.viewUIPosition.set(id*(UIColSize+UImarginSize),UIOtherHeight + UImarginSize);

	// var m = mappingState.processors.addItem("Action");
	// m.setName(name+" Fluxes");
	// var output = m.consequencesTRUE.addItem("Consequence");
	// var command = output.setCommand(local.name, "Emitter", "Emitter Fluxes");
	// command.number.set(id);

	// var m = mappingState.processors.addItem("Action");
	// m.setName(name+" Noise Fluxes");
	// var output = m.consequencesTRUE.addItem("Consequence");
	// var command = output.setCommand(local.name, "Emitter", "Emitter Noise Fluxes");
	// command.number.set(id);

}

function createCVMAttractor() {
	var name = autoCreateName.get();
	var id = autoCreateId.get();
	if (name == "") {name = "Attractor "+id; }

	var customVariableGroup = root.customVariables.addItem();
	var groupName = " "+name;
	customVariableGroup.setName(groupName);

	var mappingState = root.states.addItem("State");
	mappingState.setName("Mappings - "+name);

	var cvActive = createCVAnMapping(customVariableGroup, mappingState, "Bool", "Active", "Attractor", "Attractor Active");
	var cvPosition = createCVAnMapping(customVariableGroup, mappingState, "Point2D", "Position", "Attractor", "Attractor Position", id);
	var cvStrength = createCVAnMapping(customVariableGroup, mappingState, "Float", "Strength", "Attractor", "Attractor Strength", id);
	var cvKillingRange = createCVAnMapping(customVariableGroup, mappingState, "Float", "Killing Range", "Attractor", "Attractor Killing Range", id);
	customVariableGroup.presets.addItem();
	cvPosition.cv["newPoint2DParameter"].setRange([0,0],[1,1]);
	cvPosition.cv["newPoint2DParameter"].set([0.5,0.5]);
	cvStrength.cv["newFloatParameter"].setRange(0,100);
	cvKillingRange.cv["newFloatParameter"].setRange(0,100);
	customVariableGroup.presets.addItem();

	util.delayThreadMS(500);
	mappingState.viewUISize.set(UIColSize,UIOtherHeight);
	mappingState.viewUIPosition.set(id*(UIColSize+UImarginSize), (UIEmitterHeight + UImarginSize) + (UIOtherHeight + UImarginSize));

}

function createCVMFlux() {
	var name = autoCreateName.get();
	var id = autoCreateId.get();
	if (name == "") {name = "Flux "+id; }

	var customVariableGroup = root.customVariables.addItem();
	var groupName = " "+name;
	customVariableGroup.setName(groupName);

	var mappingState = root.states.addItem("State");
	mappingState.setName("Mappings - "+name);

	var cvActive = createCVAnMapping(customVariableGroup, mappingState, "Bool", "Active", "Flux", "Flux Active", id);
	var cvStrength = createCVAnMapping(customVariableGroup, mappingState, "Float", "Strength", "Flux", "Flux Strength", id);
	var cvSpeedMult = createCVAnMapping(customVariableGroup, mappingState, "Float", "Speed Mult", "Flux", "Flux Speed Mult", id);
	customVariableGroup.presets.addItem();

	cvStrength.cv["newFloatParameter"].setRange(0,1);
	cvSpeedMult.cv["newFloatParameter"].setRange(0,1);
	customVariableGroup.presets.addItem();

	var m = mappingState.processors.addItem("Action");
	m.setName(name+ " Image");
	var output = m.consequencesTRUE.addItem("Consequence");
	var command = output.setCommand(local.name, "Flux", "Flux Image");
	command.number.set(id);

	var m = mappingState.processors.addItem("Action");
	m.setName(name+ " File");
	var output = m.consequencesTRUE.addItem("Consequence");
	var command = output.setCommand(local.name, "Flux", "Flux File");
	command.number.set(id);

	util.delayThreadMS(500);
	mappingState.viewUISize.set(UIColSize,UIOtherHeight);
	mappingState.viewUIPosition.set(id*(UIColSize+UImarginSize), (UIEmitterHeight + UImarginSize) + 2*(UIOtherHeight + UImarginSize));


}

function createCVMNoiseFlux() {
	var name = autoCreateName.get();
	var id = autoCreateId.get();
	if (name == "") {name = "NoiseFlux "+id; }

	var customVariableGroup = root.customVariables.addItem();
	var groupName = " "+name;
	customVariableGroup.setName(groupName);

	var mappingState = root.states.addItem("State");
	mappingState.setName("Mappings - "+name);

	var cvActive = createCVAnMapping(customVariableGroup, mappingState, "Bool", "Active", "Noise Flux", "Noise Flux Active", id);

	var cvStrength = createCVAnMapping(customVariableGroup, mappingState, "Float", "Strength", "Noise Flux", "Noise Flux Strength", id);
	var cvScale = createCVAnMapping(customVariableGroup, mappingState, "Float", "Scale", "Noise Flux", "Noise Flux Scale", id);
	var cvSpeedMult = createCVAnMapping(customVariableGroup, mappingState, "Float", "Speed Mult", "Noise Flux", "Noise Flux Speed Mult", id);
	var cvScale = createCVAnMapping(customVariableGroup, mappingState, "Float", "Speed", "Noise Flux", "Noise Flux Speed", id);

	customVariableGroup.presets.addItem();
	cvStrength.cv["newFloatParameter"].setRange(0,1);
	cvScale.cv["newFloatParameter"].setRange(0,1000);
	cvSpeedMult.cv["newFloatParameter"].setRange(0,1);
	cvScale.cv["newFloatParameter"].setRange(0,1);
	customVariableGroup.presets.addItem();

	util.delayThreadMS(500);
	mappingState.viewUISize.set(UIColSize,UIOtherHeight);
	mappingState.viewUIPosition.set(id*(UIColSize+UImarginSize), (UIEmitterHeight + UImarginSize) + 3*(UIOtherHeight + UImarginSize));


}

