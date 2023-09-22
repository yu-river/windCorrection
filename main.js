function calculate() {	
	// Get parameters from input boxes
	let dl = Number(document.getElementById("dl").value);
	let db = Number(document.getElementById("db").value);
	let ws = Number(document.getElementById("ws").value);
	let wb = Number(document.getElementById("wb").value);
	let t = Number(document.getElementById("t").value);
	
	// If all parameters are entered in, calculate the vector of travel
	if (dl && db && ws && wb && t) {
		// Convert bearing into angles in standard position (radians) and find the required x and y values by subtracting the wind from the destination
		let x = dl * Math.cos(Math.PI / 180 * (-db + 90)) - ws * Math.cos(Math.PI / 180 * (-wb + 90)) * t;
		let y = dl * Math.sin(Math.PI / 180 * (-db + 90)) - ws * Math.sin(Math.PI / 180 * (-wb + 90)) * t;
		// Find the speed of travel using the Pythagorean Theorem
		let v = Math.round(Math.sqrt(x*x + y*y)/t);

		// Find the angle using arctan
		let angle = Math.atan(y/x);
		// Since atan only outputs between -pi/2 and pi/2, make sure that the other two halves are covered. At this point the angle should be between -pi/2 and 3pi/2
		if (x < 0) angle += math.pi;

		// Convert the angle (currently in standard position) to bearing form in degrees, make it positive if necessary and map it into the range [0, 359]
		angle = Math.round((-angle + Math.PI/2) * 180 / Math.PI + 360) % 360

		// Output the result
		if (angle > 99) document.getElementById("final").innerHTML = `You should travel with a speed of ${v} km/h at a bearing of [${angle}].`;
		else if (angle > 9) document.getElementById("final").innerHTML = `You should travel with a speed of ${v} km/h at a bearing of [0${angle}].`;
		else  document.getElementById("final").innerHTML = `You should travel with a speed of ${v} km/h at a bearing of [00${angle}].`;
	} else document.getElementById("final").innerHTML = "Make sure that every box has a value.";
}
