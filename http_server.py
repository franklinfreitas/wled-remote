import http.server
import socketserver
import json
import os
import mimetypes
import socket  # Import the socket module

PORT = 8080

class MyRequestHandler(http.server.BaseHTTPRequestHandler):
    # Handle GET requests (serve index.html for /)
    def do_GET(self):
        if self.path == "/":
            # Serve the index.html file for the root path
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            
            # Check if the index.html file exists
            if os.path.exists("index.html"):
                with open("index.html", "rb") as f:
                    self.wfile.write(f.read())
            else:
                self.wfile.write(b"index.html not found")
        
        elif self.path.endswith(".css") or self.path.endswith(".js"):
            # Serve any *.css or *.js file from the root directory
            self.serve_static_file()

        else:
            # Default to serving other static files (if they exist)
            super().do_GET()

    # Function to serve static files like CSS or JS
    def serve_static_file(self):
        file_path = "." + self.path  # Serve from the current directory
        if os.path.exists(file_path):
            # Get the MIME type of the file
            mime_type, _ = mimetypes.guess_type(file_path)
            if mime_type:
                self.send_response(200)
                self.send_header('Content-type', mime_type)
                self.end_headers()
                
                with open(file_path, "rb") as f:
                    self.wfile.write(f.read())
            else:
                self.send_response(415)  # Unsupported Media Type
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(b"Unsupported file type")
        else:
            self.send_response(404)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b"File not found")

    # Handle POST requests
    def do_POST(self):
        if self.path == "/json/state":
            self.handle_json_state_post()
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(b"Not Found")

    def handle_json_state_post(self):
        # Read the data sent with the POST request
        content_length = int(self.headers['Content-Length'])  # Get the length of the data
        post_data = self.rfile.read(content_length)  # Read the data
        
        # Process the POST data (here we're just printing it)
        try:
            data = json.loads(post_data)  # Assuming the data is in JSON format
            print("Received POST data at /json/state:", data)
        except json.JSONDecodeError:
            print("Failed to decode JSON data.")
        
        # Send a response to the client
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        # Respond with a simple JSON object
        response = data
        self.wfile.write(json.dumps(response).encode('utf-8'))

# Custom TCPServer with SO_REUSEADDR to allow immediate reuse of the port
class ReusableTCPServer(socketserver.TCPServer):
    def server_bind(self):
        # Allow immediate reuse of the socket address (SO_REUSEADDR)
        self.socket = socket.socket(self.address_family, self.socket_type)
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.socket.bind(self.server_address)

# Set the custom handler
Handler = MyRequestHandler

# Use the custom server class that supports address reuse
with ReusableTCPServer(("", PORT), Handler) as httpd:
    print("Serving at port", PORT)
    print(f"Open your browser at: http://127.0.0.1:{PORT}")
    httpd.serve_forever()
