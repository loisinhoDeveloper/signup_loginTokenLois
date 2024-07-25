import React, { Component } from "react";
import envFile from "../../../../docs/assets/env-file.png"

const Dark = ({children}) => <span className="bg-dark text-white px-1 rounded">{children}</span>;
export const BackendURL = () => (
	<div className="mt-5 pt-5 w-50 mx-auto">
		<h2>Falta la variable de entorno BACKEND_URL</h2>
		<p>Aquí tienes un video tutorial sobre <a target="_blank" href="https://www.awesomescreenshot.com/video/16498567?key=72dbf905fe4fa6d3224783d02a8b1b9c">cómo actualizar tu variable de entorno BACKEND_URL.</a></p>
		<p>Hay un archivo llamado <Dark>.env</Dark> que contiene las variables de entorno para tu proyecto.</p>
		<p>Hay una variable llamada <Dark>BACKEND_URL</Dark> que necesitas configurar manualmente.</p>
		<ol>
			<li>Asegúrate de que tu backend esté funcionando en el puerto 3001.</li>
			<li>Abre tu API y copia el host de la API.</li>
			<li>Abre el archivo .env (no abras el .env.example)</li>
			<li>Añade una nueva variable BACKEND_URL=<Dark>tu host de la api</Dark></li>
			<li>Reemplaza <Dark>tu host de la api</Dark> con la URL pública de la API de tu servidor flask que está ejecutándose en el puerto 3001</li>
		</ol>
		<img src={envFile} />
		<p>Nota: Si estás publicando tu sitio web en Heroku, Render.com o cualquier otro servicio de hosting, probablemente necesites seguir otros pasos.</p>
	</div>
);
