function login() {
    var user, password;

    user = document.getElementById("usuario").value;
    password = document.getElementById("contrasena").value;
    
    //Usuario administrador y contraseña (cambiar la ruta de localizacion de los datos admi, en la maqiona virtual)

    if (user == "+correo electronico+" && password == "+contraseña+") {
        windows.location = "\admin\admin.html";
    }else{
        alert="Datos incorrectos";
    }
    // usuario sin privilegios (Posiblemente quitar)
    if (user == "Usuario" && password == "3456") {
        windows.location = "\Usuario\index.html";
    }else{
        alert="Datos incorrectos";
    }

}
