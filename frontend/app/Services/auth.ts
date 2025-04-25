const API_BASE_URL="http://localhost:8080";

export const loginUser = async(nick: string, password:string): Promise<string> => {

    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nick, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }
    
      const data = await response.json();
      return data.token;
}

export const registerUser = async(name:string,lastName:string,email:string,nick:string,password:string): Promise<string> => {

const response = await fetch(`${API_BASE_URL}/api/auth/register`, {

  method: "POST",
  headers : {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({name,last_name:lastName,email,nick,password}), //last_name because it's how it's done in the backend (RegisterRequest)
});

if(!response.ok){
  throw new Error("Error");
}

const data = await response.json();
return data.token;

}

export const getCurrentUser = async () => { //Gonna return an id and nick of the user but only needed the id
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener el usuario");
    }

    const user = await response.json();
    console.log("Usuario actual:", user);
    return user;
  } catch (error) {
    console.error("Error obteniendo el usuario:", error);
  }
};