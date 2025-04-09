import { useState } from "react";
import { Link } from "react-router";
import { useUser } from "~/Contexts/UserContext";
import { registerUser } from "~/Services/auth";

//MIRAR PARA CUÁNDO NO SE HAGA EL REGISTRO BIEN, CAMBIAR ESE REGISTERSUCCESS Y MANDAR EXCEPCIONES

function Register(){

    const [name,setName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [nick,SetNick] = useState("");
    const [password,setPassword] = useState("");
    const [registerSuccess,setRegisterSuccess] = useState(false);

    const {setNick : setNickContext} = useUser();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const token = await registerUser(name,lastName,email,nick,password);
            sessionStorage.setItem("token",token);
            sessionStorage.setItem("nick",nick);
            setNickContext(nick);
            setRegisterSuccess(true);

        }catch(error){
            console.error(error);
        }
    }

    return(

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl text-center text-cyan-500">¡Te estabamos esperando!</h2>
                <form onSubmit={handleRegister}>
                    <div className="mt-4">
                    <input type="text"
                    placeholder="Nombre"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    </div>

                    <div className="mt-4">
                    <input type="text"
                    placeholder="Apellido"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    </div>

                    <div className="mt-4">
                    <input type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    </div>

                    <div className="mt-4">
                    <input type="text"
                    placeholder="Nick"
                    required
                    value={nick}
                    onChange={(e) => SetNick(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    </div>

                    <div className="mt-4">
                    <input type="password"
                    placeholder="Contraseña"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    </div>

                    <button type="submit"
                    className="w-full bg-cyan-500 text-white p-3 rounded-md hover:bg-cyan-700 transition duration-300 mt-3">
                    Regístrate
                    </button>


                </form>

                {registerSuccess && (
                    <>
                    <p className="text-green-600 text-center mt-4">¡Sí, ya eres uno más!</p>
                    <p className="mt-4 text-center text-2xl text-cyan-700">¿Por qué no empiezas por el <span className="text-cyan-500"><Link to="/home">principio?</Link></span></p>
                    </>
                )}

            </div>
        </div>

    );

}


export default Register;