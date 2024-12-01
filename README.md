# WLED Remote Project

# Running the App
To run the app locally, you can use the startServer.sh script, which will start a simple HTTP server to serve your app files.

## Steps:

### Make sure you have the necessary permissions:
Ensure that the `startServer.sh` script has executable permissions. You can give it the necessary permissions using the following command:

```sh
chmod +x startServer.sh
```

### Run the server:
You can start the server by running the script with the following command:

```sh
./startServer.sh
```

### Access the app:
Once the server is running, you can open your browser and navigate to: http://127.0.0.1:8080

This will serve the app's index.html file along with any static assets (CSS, JS) that are located in the same directory as the script.

### Stopping the server:
To stop the server, simply press Ctrl + C in the terminal where the server is running.
