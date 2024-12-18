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
setupActionButton('fadeButton', undefined, fadePayload);

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

    console.log('Timer set for 2 hours');
    setTimeout(() => {
        makePostRequest(timerPayload2hr, undefined) // endpoint 'undefined' so default value will be used
        .then(data => {
            console.log('2hrTimerButton Success:', data);  // Log the returned data
        });
    }, delayInMs); // Set timeout for 2 hours
});

// Timer Button for 4 Hours
document.getElementById('4hrTimerButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior

    const delayInMs = 14400000; // 4 hours in milliseconds

    console.log('Timer set for 4 hours');
    setTimeout(() => {
        makePostRequest(timerPayload2hr, undefined) // endpoint 'undefined' so default value will be used
        .then(data => {
            console.log('4hrTimerButton Success:', data);  // Log the returned data
        });
    }, delayInMs); // Set timeout for 4 hours
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
        // document.getElementById('color1Status').textContent = `Color 1 Set to ${color1}`;
        console.log('Color 1 Stored:', color1);
    } else {
        alert('Please select a color first!');
    }
});

// Event Listener for Color 2 Button
document.getElementById('color2Button').addEventListener('click', function () {
    if (currentColor) {
        color2 = currentColor; // Store the current color as color2
        // document.getElementById('color2Status').textContent = `Color 2 Set to ${color2}`;
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
// Variables for each mode press
const modePayloads = [
    // Twinkle - Mode 1 payload
    {"on": true, "bri": 255, "transition": 7, "mainseg": 0, 
        "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "red", 
            "col": [[255, 0, 0], [0, 0, 0], [0, 0, 0]], "fx": 74, "sx": 11, "ix": 33, "pal": 11, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 },
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }]
    },
    // Multi Fade - Mode 2 payload
    {"on": true, "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "red", 
        "col": [[255, 0, 0], [0, 0, 0], [0, 0, 0]], "fx": 80, "sx": 20, "ix": 210, "pal": 12, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }]
    },
    // Christmas - Mode 3 payload
    {"on": true, "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "red", 
        "col": [[255, 0, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "id": 1, "start": 5, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "white", "col": [[255, 255, 255], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "id": 2, "start": 10, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "blue", "col": [[8, 255, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }] 
    },
    
    // St Patriks Day - Mode 4 payload
    {"on": true, "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "green", 
        "col": [[8, 255, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "id": 1, "start": 5, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "dk green", "col": [[8, 255, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "id": 2, "start": 10, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "white", "col": [[255, 255, 255], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }] 
    },
    // Red White Blue - Mode 5 payload
    {"on": true, "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "red", 
        "col": [[255, 0, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "id": 1, "start": 5, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "white", "col": [[255, 255, 255], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "id": 2, "start": 10, "stop": 149, "grp": 5, "spc": 10, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "blue", "col": [[0, 0, 255], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }] 
    },
    // Fall - Mode 6 payload
    {"on": true, "bri": 128, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 5, "spc": 5, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "Orange", 
        "col": [[255, 106, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "id": 1, "start": 5, "stop": 149, "grp": 5, "spc": 5, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "Light Orange", "col": [[255, 170, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }] 
    },
    // Spring - Mode 7 payload
    {"on": true, "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 5, "spc": 15, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "teal", 
        "col": [[8, 251, 255], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "id": 1, "start": 5, "stop": 149, "grp": 5, "spc": 15, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "purple", "col": [[170, 0, 255], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "id": 2, "start": 10, "stop": 149, "grp": 5, "spc": 15, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "green", "col": [[38, 255, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "id": 3, "start": 15, "stop": 149, "grp": 5, "spc": 15, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "yellow", "col": [[255, 200, 0], [0, 0, 0], [0, 0, 0]], "fx": 0, "sx": 128, "ix": 128, "pal": 0, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }] 
    },
    // Multi - Mode 8 payload
    {"on": true, "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "red", 
        "col": [[255, 0, 0], [0, 0, 0], [0, 0, 0]], "fx": 102, "sx": 40, "ix": 80, "pal": 12, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] 
    }
];
let currentMode = 0; // Counter to track the current mode

// Event listener for the Modes button
document.getElementById('modesButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default button behavior

    // Fetch the current payload based on the current mode
    const payload = modePayloads[currentMode];

    makePostRequest(payload, undefined) // endpoint 'undefined' so default value will be used
        .then(data => {
            console.log(`Mode ${currentMode + 1} Success:`, data);
        });

    // Increment the mode counter and cycle back to 0 after 8
    currentMode = (currentMode + 1) % modePayloads.length;
});


// UE Red Color Button
const ueRedColorPayload = { "bri": 255, "transition": 7, "mainseg": 0, 
    "seg": [
        { "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["B6000D",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }
        ]
    };
setupActionButton('UERedButton', undefined, ueRedColorPayload);

// Spanish Veridian Color Button
const spanVeridPayload = { "bri": 255, "transition": 7, "mainseg": 0, 
    "seg": [
        { "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["008258",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }
    ] 
};
setupActionButton('spanVeridButton', undefined, spanVeridPayload);


// Resolution Blue Color Button
const resoBluePayload = { "bri": 255, "transition": 7, "mainseg": 0, 
    "seg": [
        { "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["001F7B",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }
    ] 
};
setupActionButton('resoBlueButton', undefined, resoBluePayload);


// Red Labeled Button
const altRedPayload = { "bri": 255, "transition": 7, "mainseg": 0, 
    "seg": [
        { "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["ff0000",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }
    ]
};
setupActionButton('altRedButton', undefined, altRedPayload);


// Flame Color Button
const flamePayload = { "bri": 255, "transition": 7, "mainseg": 0, 
    "seg": [
        { "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["E24D00",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }
    ] 
};
setupActionButton('flameButton', undefined, flamePayload);

// Blue Danube Color Button
const blueDanPayload = { "bri": 255, "transition": 7, "mainseg": 0, 
    "seg": [
        { "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["008AB6",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }
    ]
};
setupActionButton('blueDanButton', undefined, blueDanPayload);


// Navy Blue Bellflower Color Button
const navyBlueBellPayload = { "bri": 255, "transition": 7, "mainseg": 0, 
    "seg": [
        { "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["181E48",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }
    ]
};
setupActionButton('navyBlueBellButton', undefined, navyBlueBellPayload);

// Green Labeled Button
const altGreenPayload = { "bri": 255, "transition": 7, "mainseg": 0, 
    "seg": [
        { "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["008000",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }
    ] 
};
setupActionButton('altGreenButton', undefined, altGreenPayload);

// Harvest Gold Color Button
const harvestGoldPayload = { "bri": 255, "transition": 7, "mainseg": 0, 
    "seg": [
        { "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["E59000",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }
    ]
};
setupActionButton('harvestGoldButton', undefined, harvestGoldPayload);


// Honolulu Blue Color Button
const honoBluePayload = { "bri": 255, "transition": 7, "mainseg": 0, 
    "seg": [
        { "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["046EAD",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, 
        { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }
    ]
};
setupActionButton('honoBlueButton', undefined, honoBluePayload);


// Dark Purple Color Button
const darkPurplePayload = { "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["391D40",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] };
setupActionButton('darkPurpleButton', undefined, darkPurplePayload);


// Blue Labeled Button
const altBluePayload = { "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["0000ff",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] };
setupActionButton('altBlueButton', undefined, altBluePayload);


// Citrine Color Button
const citrinePayload = { "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["E4CB00",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] };
setupActionButton('citrineButton', undefined, citrinePayload);


// BDazzled Blue Color Button
const bdazzledPayload = { "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["01568D",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] };
setupActionButton('bdazzledButton', undefined, bdazzledPayload);


// Magenta Color Button
const magentaPayload = { "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["C10F76",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] };
setupActionButton('magentaButton', undefined, magentaPayload);


// White Labeled Button
const whitePayload = { "bri": 255, "transition": 7, "mainseg": 0, "seg": [{ "id": 0, "start": 0, "stop": 149, "grp": 1, "spc": 0, "of": 0, "on": true, "frz": false, "bri": 255, "cct": 127, "set": 0, "n": "", "col": ["ffffff",000000,000000], "fx": 0, "sx": 128, "ix": 128, "pal": 50, "c1": 128, "c2": 128, "c3": 16, "sel": true, "rev": false, "mi": false, "o1": false, "o2": false, "o3": false, "si": 0, "m12": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }, { "stop": 0 }] };
setupActionButton('whiteButton', undefined, whitePayload);
