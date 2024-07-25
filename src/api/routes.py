"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

#Este archivo define las rutas para el registro, inicio de sesión y la ruta protegida.

from flask import Flask, request, jsonify, url_for, Blueprint # Módulos de Flask para crear rutas y manejar JSON.
from api.models import db, User #Base de datos y modelo de usuario.
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token , jwt_required, get_jwt_identity #Funciones de Flask-JWT-Extended para manejar tokens.

api = Blueprint('api', __name__) #Define un blueprint para las rutas de la API.

# Allow CORS requests to this API
CORS(api)



@api.route('/signup', methods=['POST']) #Ruta para registrar nuevos usuarios, relacionado con signup
def signup():
    # Obtener los datos del cuerpo de la solicitud
    username = request.json.get("username", None)
    nombre = request.json.get("nombre", None)
    apellidos = request.json.get("apellidos", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    confirm_password = request.json.get("confirmPassword", None)

    # Validar los campos requeridos
    if not username or not nombre or not apellidos or not email or not password or not confirm_password:
        return jsonify({"msg": "Todos los campos son requeridos."}), 400

    if len(password) < 6:
        return jsonify({"msg": "Contraseña demasiada corta, mínimo 6 caracteres"}), 400
    
     # Validar que las contraseñas coincidan
    if password != confirm_password:
        return jsonify({"msg": "Las contraseñas no coinciden."}), 400
    
    # Verificar si el usuario ya existe
    if User.query.filter_by(email=email).first() is not None: #.filter_by(email=email) .first()devuelve el primer resultado que coincida con el filtro.
        return jsonify({"msg": "Email está registrado"}),  #Si se ha encontrado un usuario con el correo electrónico proporcionado
    

    # Crear nuevo usuario "nuevoRegistro" (añadimos todos los campos que puse en models.py)
    nuevoRegistro = User(
        username=username,
        nombre=nombre,
        apellidos=apellidos,
        email=email,
        password=password,
        is_active=True
    )
    db.session.add(nuevoRegistro)
    db.session.commit()

    # Devolver un mensaje de éxito con el nombre del usuario
    return jsonify({"msg": f"Usuario {username} creado satisfactoriamente."}), 201 #la f" permiten insertar expresiones dentro de cadenas de texto de forma más legible y eficiente


# Crea una ruta para autenticar a los usuarios y devolver el token JWT


#Ruta para iniciar sesión y obtener un token.
# La función create_access_token() se utiliza para generar el JWT

# consulta un usuario a tráves de un FECH y lo recibe el endpoin

@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None) #"descomprimimos" email y contrseña del request.
    password = request.json.get("password", None)

    # Consulta la base de datos (user) por el nombre de usuario y la contraseña, puede que tengamos 1 o 0 elemento. Siempre nos da el primero que coincida .first()
    user = User.query.filter_by(email=email, password=password).first() # Si queremos que la consulta sea con una API OAuth,Oauth 2.0, google... debería cambiarse aqui. 

    if user is None:
        # el usuario no se encontró en la base de datos
        return jsonify({"msg": "Está mal el email o contraseña"}), 401
    
    # Crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })



# Ruta protegida que requiere autenticación.
@api.route("/privada", methods=["GET"])
@jwt_required() #Necesidad... si no tienes tu email y password, no puedes acceder.
def protected():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email }), 200








# # prueba
# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200
