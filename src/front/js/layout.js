/* Configura las rutas en React y usa ScrollToTop para manejar el scroll.*/

import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';;/* importa componentes de React Router para manejar rutas.*/
import injectContext from "./store/appContext"; 

/*importar las distintas paginas y componentes */
import { Home } from "./pages/home"; 
import { Privada } from "./pages/PáginaPrivada";
import ScrollToTop from "./component/scrollToTop"; /* importa componentes de React Router para manejar el scrollTo Top*/

import { Navbar } from "./component/navbar";
import { Signup } from "./component/Signup";
import { Login } from "./component/Login";
import { Footer } from "./component/footer";

const Layout = () => {
    const basename = process.env.BASENAME || ""; // Usa REACT_APP_ para variables de entorno en React

	//el nombre base se utiliza cuando su proyecto se publica en un subdirectorio y no en la raíz del dominio
// puedes establecer el nombre base en el archivo .env ubicado en la raíz de este proyecto, por ejemplo: BASENAME=/reacthello-webapp/
   
    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<Signup/>}/> {/*registro. */}
                        <Route path="/login" element={<Login/>}/> {/*loguearse */}
                        <Route path="/privada" element={<Privada/>} /> {/*info privada al loguearse*/}
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
