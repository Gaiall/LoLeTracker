import os
import sys

if sys.version_info[0] == 3 and (sys.platform == 'win32' or sys.platform == 'win64'):
    os.system('python -m http.server')
else
    os.system('python -m SimpleHTTPServer')
