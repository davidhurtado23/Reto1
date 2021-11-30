function validar() {
    var email = $("#email").val();
    var clave = $("#clave").val();
    var expReg = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

    if (email.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Debes de escribir un email'
        });
        return 0;
    }

    if (expReg.test(email) == false) {
        Swal.fire({
            title: '<strong>Email invalido</strong>',
            icon: 'error',
            html:
                'El email <b>' + email + '</b> es incorrecto. <br>El correo solo puede contener letras, numero, puntos, guiones y guion bajo'
        });
        return 0;
    }

    if (clave.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Debes de escribir una contraseña'
        });
        return 0;
    }

    /* ----- -----  LLamado a la funcion Ajax para consultar ----- -----  */
    ingresar(email, clave)

}

/* ----- -----  Funcion Ajax para consultar por email y password----- -----  */
function ingresar(email, password) {

    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/user/" + email + "/" + password,
        type: "GET",

        success: function (response) {
            if (response.id == null) {
                Swal.fire({
                    icon: 'error',
                    title: 'No existe un usuario'
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido: ' + response.name
                });
            }
        },

        error: function (jqHRX, textStatus, errorThrown) {
            Swal.fire({
                title: '<strong>Algo fallo</strong>',
                icon: 'error',
                html:
                    '<iframe src="https://giphy.com/embed/8L0Pky6C83SzkzU55a" width="280" height="150" ></iframe><p>Ingreso fallido</p>'
            });
        }

    });

}
