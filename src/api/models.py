from flask_sqlalchemy import SQLAlchemy #Módulo de SQLAlchemy para manejar la base de datos.

db = SQLAlchemy()  #Inicializa la base de datos.

#define cómo se estructura la tabla de usuarios en tu base de datos utilizando SQLAlchemy
#id, email, password, is_active: Columnas de la tabla User

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), nullable=False, unique=True)
    nombre = db.Column(db.String(250), nullable=False)
    apellidos = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self): #Método para serializar el objeto User a un formato JSON.
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }