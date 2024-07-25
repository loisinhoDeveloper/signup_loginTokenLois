"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""


#Configurar Flask y JWT:
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db #inicialización de la base de datos
from api.routes import api
from api.admin import setup_admin #Funciones para configurar el administrador y comandos personalizados.
from api.commands import setup_commands #Funciones para configurar el administrador y comandos personalizados.
from flask_jwt_extended import JWTManager #Módulo para manejar tokens JWT.

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__) # Inicializa la aplicación Flask.


# Configura la extensión Flask-JWT-Extended
app.config["JWT_SECRET_KEY"] = "valdoviño"  # ¡Cambia las palabras "super-secret" por otra cosa! Define la clave secreta para JWT.
jwt = JWTManager(app)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL") #Obtiene la URL de la base de datos desde una variable de entorno.
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace( #Configura la URI de la base de datos
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #Desactiva las notificaciones de modificaciones.
MIGRATE = Migrate(app, db, compare_type=True) #Configura las migraciones de la base de datos.
db.init_app(app) #Inicializa la base de datos con la aplicación Flask.

# Configura el administrador de Flask.
setup_admin(app) 

# Configura comandos personalizados
setup_commands(app)

# Registra el blueprint de las rutas de la API.
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException) #Maneja excepciones personalizadas
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/') #Define la ruta principal.
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# Inicia la aplicación en modo debug.
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
