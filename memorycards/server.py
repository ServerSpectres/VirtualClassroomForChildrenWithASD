from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class BrotliHandler(SimpleHTTPRequestHandler):
    def guess_type(self, path):
        base, ext = os.path.splitext(path)
        if ext == '.br':
            return 'application/x-br'
        return super().guess_type(path)

    def end_headers(self):
        if self.path.endswith('.br'):
            self.send_header('Content-Encoding', 'br')
        super().end_headers()

httpd = HTTPServer(('localhost', 8000), BrotliHandler)
print("Serving at http://localhost:8000")
httpd.serve_forever()