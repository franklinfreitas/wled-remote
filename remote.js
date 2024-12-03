// Help icon
// Get references to the help button, overlay, and close button
const helpButton = document.getElementById('helpButton');
const overlay = document.getElementById('overlay');
const closeOverlay = document.getElementById('closeOverlay');

// Show the overlay when the help button is clicked
helpButton.addEventListener('click', () => {
    overlay.style.display = 'flex';
});

// Hide the overlay when the close button is clicked
closeOverlay.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// On Off Button Toggle
let isOn = false; // Track the current state (off by default)

/**
 * Makes a POST request to the specified endpoint with the given payload.
 * 
 * @param {string} endpoint - The URL to send the POST request to.
 * @param {Object} payload - The data to send in the body of the POST request. This will be serialized to JSON.
 * @returns {Promise<Object>} A promise that resolves to the parsed JSON data from the response if successful.
 * @throws {Error} Throws an error if the response is not OK (i.e., status code is not 2xx) or if there is an issue with the fetch request.
 * 
 * @example
 * makePostRequest('http://example.com/api', { key: 'value' })
 *   .then(data => console.log(data))
 *   .catch(error => console.error('Error:', error));
 */
function makePostRequest(payload, endpoint = "http://127.0.0.1:8080/json/state") {
    return fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(response => {
        return response.json(); // Parse JSON if successful
    }).catch(error => console.error('makePostRequest :: Error:', error));
}

// SetUp Action Button function - in progress
function setupActionButton(buttonId, endpoint, payload) {

    const button = document.getElementById(buttonId);
    button.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default anchor behavior

        makePostRequest(payload, endpoint)  // Call the POST request
            .then(data => {
                console.log(buttonId + ' Success:', data);  // Log the returned data
                //   if (onSuccess) {
                //     onSuccess(data);  // Call the onSuccess callback if provided
                //   }
            });
    });
}

// On-Off Button Toggle
document.getElementById('onOffButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior

    // Determine the new state based on the current state
    const newState = isOn ? { on: false } : { on: true };

    makePostRequest(newState, undefined) // endpoint 'undefined' so default value will be used
        .then(data => {
            console.log('onOffButton Success:', data);  // Log the returned data
            isOn = !isOn; // Update the "isOn" state after a successful response
            this.textContent = isOn ? "Turn Off" : "Turn On"; // Update button text
        });
});



// Fade Button
// Payload for Fade
const fadePayload = { 
    "on": true, 
    "bri": 255, 
    "inputLevel": 128, 
    "transition": 7, 
    "mainseg": 0, 
    "seg": [
        { "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, 
            "col": [[255, 41, 251], [0, 0, 0], [0, 0, 0]], "fx": 8, "sx": 41, "ix": 94, "c1x": 128, "c2x": 128, "c3x": 128, 
            "pal": 11, "sel": true, "rev": false, "rev2D": false, "mi": false, "rot2D": false
        },
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 },
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 },
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }
    ] 
}
setupActionButton('fadeButton', undefined, fadePayload)

// document.getElementById('fadeButton').addEventListener('click', function (event) {
//     event.preventDefault();
//     fetch("http://127.0.0.1:8080/json/state", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ "on": true, "bri": 255, "inputLevel": 128, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "col": [[255, 41, 251], [0, 0, 0], [0, 0, 0]], "fx": 8, "sx": 41, "ix": 94, "c1x": 128, "c2x": 128, "c3x": 128, "pal": 11, "sel": true, "rev": false, "rev2D": false, "mi": false, "rot2D": false }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
//     })
//         .then(response => response.json())
//         .then(data => console.log('Fade Success:', data))
//         .catch(error => console.error('Fade Error:', error));
// });


// Dimming Button
// Initialize the brightness variable
let currentBrightness = 255; // Start at the maximum brightness
const brightnessStep = Math.floor(255 / 10); // Divide 255 into 10 equal steps (25)

// Add event listener to the dimming button
document.getElementById('dimmingButton').addEventListener('click', function (event) {
    event.preventDefault();

    // Reduce brightness by one step
    currentBrightness -= brightnessStep;

    // Reset brightness to maximum if it goes below the minimum (0 or lower)
    if (currentBrightness < 0) {
        currentBrightness = 255;
    }

    const dimmingPayload = { "bri": currentBrightness }
    makePostRequest(dimmingPayload, undefined) // endpoint 'undefined' so default value will be used
    .then(data => {
        console.log('dimmingButton Success:', data);  // Log the returned data

    });
});


// Strobe Button
const strobePayload = { 
    "on": true, "bri": 255, "transition": 7, "mainseg": 0, 
    "seg": [
        { "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, 
            "set": 0, "n": "", "col": [[0, 0, 255], [0, 0, 0], [0, 0, 0]], "fx": 24, "sx": 214, "ix": 128, "pal": 11, "c1": 128, 
            "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 
        }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }
    ]
}
setupActionButton('strobeButton', undefined, strobePayload)


// Timer Button for 2 Hours
document.getElementById('2hrTimerButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    
    const delayInMs = 7200000; // 2 hours in milliseconds
    const timerPayload2hr = { on: false } // Turn off after timer

    console.log('Timer set for 2 hours'); // Log timer start
    setTimeout(() => {
        makePostRequest(timerPayload2hr, undefined) // endpoint 'undefined' so default value will be used
        .then(data => {
            console.log('2hrTimerButton Success:', data);  // Log the returned data
    
        });
    }, delayInMs); // Set timeout for 2 hours
});



// COLOR1 and COLOR2 BUTTONS
// Global Variables
let currentColor = null; // Temporary storage for the most recent color
let color1 = null; // Stored HEX for Color 1
let color2 = null; // Stored HEX for Color 2

// Event Listener for Remote Color Buttons
document.querySelectorAll('.colorButton').forEach(button => {
    button.addEventListener('click', function () {
        currentColor = this.getAttribute('data-hex'); // Capture HEX from the button
        console.log('Current Color Selected:', currentColor);
    });
});

// Event Listener for Color 1 Button
document.getElementById('color1Button').addEventListener('click', function () {
    if (currentColor) {
        color1 = currentColor; // Store the current color as color1
        document.getElementById('color1Status').textContent = `Color 1 Set to ${color1}`;
        console.log('Color 1 Stored:', color1);
    } else {
        alert('Please select a color first!');
    }
});

// Event Listener for Color 2 Button
document.getElementById('color2Button').addEventListener('click', function () {
    if (currentColor) {
        color2 = currentColor; // Store the current color as color2
        document.getElementById('color2Status').textContent = `Color 2 Set to ${color2}`;
        console.log('Color 2 Stored:', color2);

        const color2ButtonPayload = { 
            "on": true, "bri": 255, "transition": 7, "mainseg": 0, 
            "seg": [
                { "id": 0, "start": 0, "stop": 149, "grp": 5, "spc": 5, "of": 0, "on": true, "frz": false, 
                    "bri": 255, "cct": 127, "set": 0, "n": "red", "col": [color1,000000,000000], "fx": 0, "sx": 128, 
                    "ix": 128, "pal": 11, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, 
                    "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 
                }, 
                { "id": 1, "start": 5, "stop": 149, "grp": 5, "spc": 5, "of": 0, "on": true, "frz": false, 
                    "bri": 255, "cct": 127, "set": 0, "n": "other", "col": [color2,000000,000000], "fx": 0, "sx": 128, 
                    "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, 
                    "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 
                }
            ]
        }
        makePostRequest(color2ButtonPayload, undefined) // endpoint 'undefined' so default value will be used
        .then(data => {
            console.log('color2Button Success:', data);  // Log the returned data
        });
    } else {
        alert('Please select a color first!');
    }
});



// MODES BUTTON
//  variables for each mode press
const modePayloads = [
    // Twinkle
    JSON.stringify({ "on": true, "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "red", "col": [[255, 0, 0], [0, 0, 0], [0, 0, 0]], "fx": 74, "sx": 11, "ix": 33, "pal": 11, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }), // Mode 1 payload
    // Multi Fade
    JSON.stringify({ "on": true, "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "red", "col": [[255, 0, 0], [0, 0, 0], [0, 0, 0]], "fx": 80, "sx": 20, "ix": 210, "pal": 12, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }), // Mode 2 payload
    // Christmas
    JSON.stringify({ "on": true, "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "red", "col": [[255, 0, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "id": 1, "start": 5, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "white", "col": [[255, 255, 255], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "id": 2, "start": 10, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "blue", "col": [[8, 255, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }] }), // Mode 3 payload
    // St Patriks Day
    JSON.stringify({ "on": true, "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "green", "col": [[8, 255, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "id": 1, "start": 5, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "dk green", "col": [[8, 255, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "id": 2, "start": 10, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "white", "col": [[255, 255, 255], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }] }), // Mode 4 payload
    // Red White Blue
    JSON.stringify({ "on": true, "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "red", "col": [[255, 0, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "id": 1, "start": 5, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "white", "col": [[255, 255, 255], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "id": 2, "start": 10, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "blue", "col": [[0, 0, 255], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }] }), // Mode 5 payload
    // Fall
    JSON.stringify({ "on": true, "bri": 128, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 5, "spc": 5, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "Orange", "col": [[255, 106, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "id": 1, "start": 5, "stop": 149, "grp": 5, "spc": 5, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "Light Orange", "col": [[255, 170, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }] }), // Mode 6 payload
    // Spring
    JSON.stringify({ "on": true, "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 5, "spc": 15, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "teal", "col": [[8, 251, 255], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "id": 1, "start": 5, "stop": 149, "grp": 5, "spc": 15, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "purple", "col": [[170, 0, 255], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "id": 2, "start": 10, "stop": 149, "grp": 5, "spc": 15, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "green", "col": [[38, 255, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "id": 3, "start": 15, "stop": 149, "grp": 5, "spc": 15, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "yellow", "col": [[255, 200, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }] }), // Mode 7 payload
    // Multi
    JSON.stringify({ "on": true, "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "red", "col": [[255, 0, 0], [0, 0, 0], [0, 0, 0]], "fx": 102, "sx": 40, "ix": 80, "pal": 12, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] })  // Mode 8 payload
];
let currentMode = 0; // Counter to track the current mode

// Event listener for the Modes button
document.getElementById('modesButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default button behavior

    // Fetch the current payload based on the current mode
    const payload = modePayloads[currentMode];

    // Send the JSON payload via fetch
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: payload
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log(`Mode ${currentMode + 1} Success:`, data);
            //document.getElementById('modesStatus').innerText = `Mode ${currentMode + 1} activated!`;
        })
        .catch(error => {
            console.error(`Mode ${currentMode + 1} Error:`, error);
            //document.getElementById('modesStatus').innerText = `Error activating Mode ${currentMode + 1}`;
        });

    // Increment the mode counter and cycle back to 0 after 8
    currentMode = (currentMode + 1) % modePayloads.length;
});


// Timer Button for 4 Hours
document.getElementById('4hrTimerButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior

    const delayInMs = 14400000; // 4 hours in milliseconds

    console.log('Timer set for 2 hours'); // Log timer start
    setTimeout(() => {
        fetch("http://127.0.0.1:8080/json/state", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ on: false }) // Turn off after timer
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => console.log('4hr Timer Turn Off Success:', data))
            .catch(error => console.error('4hr Timer Turn Off Error:', error));
    }, delayInMs); // Set timeout for 2 hours
});


// UE Red Color Button
document.getElementById('UERedButton').addEventListener('click', function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["B6000D",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
    })
        .then(response => response.json())
        .then(data => console.log('UE Red Color Success:', data))
        .catch(error => console.error('UE Red Color Error:', error));
});


// Spanish Veridian Color Button
document.getElementById('spanVeridButton').addEventListener('click', function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["008258",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
    })
        .then(response => response.json())
        .then(data => console.log('Spanish Veridian Color Success:', data))
        .catch(error => console.error('Spanish Veridian Color Error:', error));
});


// Resolution Blue Color Button
document.getElementById('resoBlueButton').addEventListener('click', function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["001F7B",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
    })
        .then(response => response.json())
        .then(data => console.log('Resolution Blue Color Success:', data))
        .catch(error => console.error('Resolution Blue Color Error:', error));
});


// Red Labeled Button
document.getElementById('altRedButton').addEventListener('click', function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["ff0000",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
    })
        .then(response => response.json())
        .then(data => console.log('Red Color Success:', data))
        .catch(error => console.error('Red Color Error:', error));
});


// Flame Color Button
document.getElementById('flameButton').addEventListener('click', function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["E24D00",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
    })
        .then(response => response.json())
        .then(data => console.log('Flame Color Success:', data))
        .catch(error => console.error('Flame Color Error:', error));
});


// Blue Danube Color Button
document.getElementById('blueDanButton').addEventListener('click', function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["008AB6",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
    })
        .then(response => response.json())
        .then(data => console.log('Blue Danube Color Success:', data))
        .catch(error => console.error('Blue Danube Color Error:', error));
});


// Navy Blue Bellflower Color Button
document.getElementById('navyBlueBellButton').addEventListener('click', function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["181E48",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
    })
        .then(response => response.json())
        .then(data => console.log('Navy Blue Bellflower Color Success:', data))
        .catch(error => console.error('Navy Blue Bellflower Color Error:', error));
});


// Green Labeled Button
document.getElementById('altGreenButton').addEventListener('click', function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["008000",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
    })
        .then(response => response.json())
        .then(data => console.log('Green Color Success:', data))
        .catch(error => console.error('Green Color Error:', error));
});


// Harvest Gold Color Button
document.getElementById('harvestGoldButton').addEventListener('click', function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["E59000",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
    })
        .then(response => response.json())
        .then(data => console.log('Harvest Gold Color Success:', data))
        .catch(error => console.error('Harvest Gold Color Error:', error));
});


// Honolulu Blue Color Button
document.getElementById('honoBlueButton').addEventListener('click', function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["046EAD",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
    })
        .then(response => response.json())
        .then(data => console.log('Honolulu Blue Color Success:', data))
        .catch(error => console.error('Honolulu Blue Color Error:', error));
});


// Dark Purple Color Button
document.getElementById('darkPurpleButton').addEventListener('click', function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["391D40",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
    })
        .then(response => response.json())
        .then(data => console.log('Dark Purple Color Success:', data))
        .catch(error => console.error('Dark Purple Color Error:', error));
});


// Blue Labeled Button
document.getElementById('altBlueButton').addEventListener('click', function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["0000ff",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
    })
        .then(response => response.json())
        .then(data => console.log('Blue Color Success:', data))
        .catch(error => console.error('Blue Color Error:', error));
});


// Citrine Color Button
document.getElementById('citrineButton').addEventListener('click', function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["E4CB00",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
    })
        .then(response => response.json())
        .then(data => console.log('Citrine Color Success:', data))
        .catch(error => console.error('Citrine Color Error:', error));
});


// BDazzled Blue Color Button
document.getElementById('bdazzledButton').addEventListener('click', function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["01568D",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
    })
        .then(response => response.json())
        .then(data => console.log('BDazzled Blue Color  Success:', data))
        .catch(error => console.error('BDazzled Blue Color  Error:', error));
});


// Magenta Color Button
document.getElementById('magentaButton').addEventListener('click', function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["C10F76",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
    })
        .then(response => response.json())
        .then(data => console.log('Magenta Color Success:', data))
        .catch(error => console.error('Magenta Color Error:', error));
});


// White Labeled Button
document.getElementById('whiteButton').addEventListener('click', function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/json/state", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["ffffff",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] }) // Payload for Fade
    })
        .then(response => response.json())
        .then(data => console.log('White Color Success:', data))
        .catch(error => console.error('White Color Error:', error));
});
