function validar() {
    var usuario = $("#usuario").val();
    var email = $("#email").val();
    var clave = $("#clave").val();
    var clave2 = $("#clave2").val();
    var expReg = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

    if (usuario.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Debes de escribir un usuario'
        })
        return 0;
    }

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
                'El email <b>' + email + '</b> es incorrecto. <br>El correo solo puede contener letras, numero, puntos, guiones y guion bajo.'
        });
        return 0;

    }

    if (clave.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Debes de escribir una contraseña'
        })
        return 0;

    }

    if (clave2.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Debes de confirmar contraseña'
        })
        return 0;

    }

    if (clave != clave2) {
        Swal.fire({
            title: '<strong>Contraseña incorrecta</strong>',
            icon: 'error',
            html:
                'Ambas contraseñas deben ser iguales.'
        });
        return 0;

    }

    validarRegistro(email);

    /* ----- -----  LLamado a la funcion Ajax para registrar ----- -----  */

}

/* ----- -----  Funcion Ajax para validar el email ----- -----  */
function validarRegistro(email) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "http://localhost:8080/api/user/" + email,

        success: function (response) {
            if(response == false) {
                registro();
            } else{
                Swal.fire({
                    icon: 'error',
                    title: 'El email ya existe'
                });
            } 

        },

        error(jqHRX, textStatus, errorThrown) {
            Swal.fire({
                title: '<strong>Algo fallo</strong>',
                icon: 'error',
                html:
                    '<iframe src="https://giphy.com/embed/8L0Pky6C83SzkzU55a" width="280" height="150" ></iframe><p>Validacion del registro fallido</p>'
            });

        }

    });

}

/* ----- -----  Funcion Ajax para registrar un nuevo usuario ----- -----  */
function registro() {

    var elemento = {
        name: $("#usuario").val(),
        email: $("#email").val(),
        password: $("#clave").val()

    }

    $.ajax({
        type: 'POST',
        contentType: 'application/JSON',
        dataType: 'json',
        data: JSON.stringify(elemento),
        url: "http://localhost:8080/api/user/new",

        success: function (response) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario creado con exito',
                showConfirmButton: false,
                timer: 1500
            })
            location.href = "index.html"
        },

        error: function (jqHRX, textStatus, errorThrown) {
            Swal.fire({
                title: '<strong>Algo fallo</strong>',
                icon: 'error',
                html:
                    '<iframe src="https://giphy.com/embed/8L0Pky6C83SzkzU55a" width="280" height="150" ></iframe><p>Registro fallido</p>'
            });
        }

    });

}