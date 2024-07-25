const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			mensaje: null, //almacenar mensajes informativos o de error. Por ejemplo, cuando se verifica el token
			token:null,
			user: null // Cambiado de [] a null. Para que refleje mejor el estado inicial cuando no hay datos.
		},
		actions: {
			// Acción para iniciar sesión. Es async, ya que está esperando el fech de la consulta del usuario al servidor.
			login: async (email, password) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, { //process.env.BACKEND_URL = coincide con la direccion BACKEND_URL del .env
						method: "POST", 
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password }) // el método stringify, comvierte en texto
					});
		
					if (resp.ok) {
						const data = await resp.json();
						sessionStorage.setItem("token", data.token);
						setStore({ token: data.token, user: data.user });
						return true;
					} else {
						return false;
					}
				} catch (error) {
					console.error("Error logging in", error);
					return false;
				}
			},

			// Acción para cerrar sesión
			logout: () => {
				sessionStorage.removeItem("token");
				setStore({ token: null, user: null });
			},

			
			// Acción para verificar el token y obtener datos del usuario
			verificoToken: async () => {
				const token = sessionStorage.getItem("token");
				if (token) {
					try {
						const resp = await fetch(`${process.env.BACKEND_URL}/api/protected`, {
							headers: { "Autorizacion": `Bearer ${token}` }
						});
		
						if (resp.ok) {
							const data = await resp.json();
							setStore({ user: data, mensaje: "Token OK" });

						} else {
							setStore({ token: null, user: null, mensaje: "El Token no sirve" });
						}
					} catch (error) {
						console.error("Error al verificar el token", error);
						setStore({ token: null, user: null, mensaje: "Se produjo un error al verificar tu Token" });
					}
				} else {
					setStore({ token: null, user: null, mensaje: "No existe tu Token" });
				}
			}
		}
	};
};

export default getState;
