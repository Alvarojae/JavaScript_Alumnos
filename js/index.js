const alumnosArray = new Alumnos();
let id =0;

MostrarElementos(0);

function AgregarAlumno()
{
    notas = parseInt(document.getElementById("inputText2").value);
    nombre = document.getElementById("inputText").value;
    apellido = document.getElementById("inputText1").value;

    if(ValidarCampos() == 1)
    {
        id++;
        alumnosArray.agregarAlumno(new Alumno(nombre,apellido,notas,id))
        alertify.notify('Se ingreso el alumno correctamente', 'success', 5, function(){  console.log('dismissed'); });
        LimpiarCampos();
    }
}

function LimpiarCampos()
{
    document.getElementById("idAlumnoCampo").value= "";
    document.getElementById("inputText").value= "";
    document.getElementById("inputText1").value= "";
    document.getElementById("inputText2").value = "";
}


function ValidarCampos()
{
    var regName = /^[ a-zA-Z\-\’]+$/;
    var nombre = document.getElementById('inputText').value;
    var apellido = document.getElementById('inputText1').value;
    var nota = parseInt(document.getElementById('inputText2').value);
    if(!regName.test(nombre))
        return alertify.alert('Error','Ingrese un nombre correcto');
    if(!regName.test(apellido))
        return alertify.alert('Error','Ingrese un apellido correcto');
    if(!(nota>= 1 && nota<=10))
        return alertify.alert('Error','Ingrese una nota correcta');
        
    return 1;
}



function MostrarAlumnos()
{
    let alumnos="";
    let index;
    for (index = 0; index < alumnosArray.lista.length; index++) {
        alumnos = alumnos + alumnosArray.lista[index].getAlumno() +  "  <br>  ";
    }
    return alumnos;
}

function MostrarAlumnosHtml()
{
    if(alumnosArray.getLargo()==0 )
        return alertify.notify('No hay alumnos cargados', 'error', 5, function(){  console.log('dismissed'); });

    document.getElementById("resultado").innerHTML = MostrarAlumnos();
}

function PromedioDeNotas()
{
    if(alumnosArray.getLargo()==0 )
        return alertify.notify('No hay alumnos cargados', 'error', 5, function(){  console.log('dismissed'); });

    let total=0;
    for (let index = 0; index < alumnosArray.lista.length; index++) {
        total+=alumnosArray.lista[index].notas;
    }
    if(total!=NaN || total!=0)
        alertify.alert('Alumnos','El promedio de notas es: ' + (total/alumnosArray.lista.length).toFixed(2));
    
}

function EncontrarPeorAlumno()
{
    if(alumnosArray.getLargo()==0 )
        return alertify.notify('No hay alumnos cargados', 'error', 5, function(){  console.log('dismissed'); });

    let minimo=11;
    let indice=0;
    for (let index = 0; index < alumnosArray.lista.length; index++) {
        if (alumnosArray.lista[index].notas < minimo)
        {
            minimo = alumnosArray.lista[index].notas;
            indice=index;
        }
    }
    alertify.alert('El peor alumno es:', alumnosArray.lista[indice].getAlumno());
}

function EncontrarMejorAlumno()
{
    if(alumnosArray.getLargo()==0 )
        return alertify.notify('No hay alumnos cargados', 'error', 5, function(){  console.log('dismissed'); });

    let maximo=0;
    let indice=0;
    for (let index = 0; index < alumnosArray.lista.length; index++) {
        if (alumnosArray.lista[index].notas > maximo)
        {
            maximo = alumnosArray.lista[index].notas;
            indice=index
        }
    }
    alertify.alert('El mejor alumno es:', alumnosArray.lista[indice].getAlumno());
}

function HardcodeAlumnos() 
{
    let nombres = ["juan","jose","sebastian"];
    let apellidos=["alvaro","perez","gomez"];
    let notasAlumnos=[8,2,5];
    let index;
    for (index = 0; index < 3; index++) {
        id++;
        alumnosArray.agregarAlumno(new Alumno(nombres[index],apellidos[index],notasAlumnos[index],id));
    }

    if(index>0)
        alertify.alert('Exito','Se ingresaron alumnos Hardcodeadeados ');
}

function GuardarAlumnos()
{
    if(alumnosArray.getLargo()==0)
        return alertify.notify('No hay alumnos para guardar' , 'error', 5, function(){  console.log(err); });

    const myJSON = JSON.stringify(alumnosArray);
    localStorage.setItem("Alumnos",myJSON);
    console.log(myJSON);
    alertify.notify('Se guardo correctamente', 'success', 5, function(){  console.log('dismissed'); });
}

function CargarAlumnos()
{
    const arrayTest = JSON.parse(localStorage.getItem("Alumnos"));
    for (let index = 0; index < arrayTest.lista.length; index++) {
        id++;
        alumnosArray.agregarAlumno(new Alumno(arrayTest.lista[index].nombre,arrayTest.lista[index].apellido,arrayTest.lista[index].notas,id));
    }

    if(alumnosArray.getLargo()==0)
        alertify.notify('Error cargando lo alumnos' , 'error', 5, function(){  console.log(err); });  
    else
        alertify.notify('Carga de Alumnos exitosa', 'success', 5, function(){  console.log('dismissed'); });
}


function EnviarEmail() {
    if(alumnosArray.getLargo()==0 )
        return alertify.notify('No hay alumnos para enviar', 'error', 5, function(){  console.log('dismissed'); });

    if(document.getElementById("mailAlumnoCampo").value == "")
        return alertify.notify('No se completo la casilla "Ingresar mail"', 'error', 5, function(){  console.log('dismissed'); });

    let alumnoAux = alumnosArray.getIndex(parseInt(document.getElementById("idAlumnoCampo").value));

    if(alumnoAux>=0)
    {
        alertify.confirm('Desea enviar este alumno?', alumnosArray.lista[alumnoAux].getAlumno(), 
        function()
        { 
            emailjs.send("service_8vmyxzh","template_1mxzo6p",{
                to_name: alumnosArray.lista[alumnoAux].getNombre() + " " + alumnosArray.lista[alumnoAux].getApellido(),
                message: alumnosArray.lista[alumnoAux].getNota(),
                send_to: document.getElementById("mailAlumnoCampo").value,
                })
                .then(() => {
                    alertify.notify('Mail enviado correctamente', 'success', 5, function(){  console.log('dismissed'); });
                    MostrarElementos(3);
                },(err) => {
                    alertify.notify('Error Enviando el Mail' , 'error', 5, function(){  console.log(err); });
            });
        }, 
        function(){ alertify.error('se cancelo la enviacion del mail')});
    }else
    {
        alertify.alert('Error','se cancelo la enviacion del mail');
    }
    
}

function DescargarAlumnos() {
    if(alumnosArray.getLargo()==0)
        return alertify.notify('No hay alumnos para guardar', 'error', 5, function(){  console.log('dismissed'); });
  
    const jsonTest = MostrarAlumnos();
    var a = document.createElement("a");
    var file = new Blob([jsonTest]);
    a.href = URL.createObjectURL(file);
    a.download = "inventory.json";
    a.click();
    alertify.notify('Los Alumnos se descargaron correctamente', 'success', 5, function(){  console.log('dismissed'); });
    
}

function EditarAlumno()
{
    if(alumnosArray.getLargo()==0 )
        return alertify.notify('No hay alumnos cargados', 'error', 5, function(){  console.log('dismissed'); });

    let alumnoAux = alumnosArray.getIndex(parseInt(document.getElementById("idAlumnoCampo").value));
    if(alumnoAux>=0)
    {
        alertify.confirm('Desea editar este alumno?', alumnosArray.lista[alumnoAux].getAlumno(), 
        function()
        { 
            document.getElementById("editarAlumno").style.display  = "none";
            document.getElementById("editarAlumnoConfirmacion").style.display  = "inline";
            ActivarCamposAgregarAlumno();
            document.getElementById("inputText2").value =alumnosArray.lista[alumnoAux].getNota() ;
            document.getElementById("inputText").value= alumnosArray.lista[alumnoAux].getNombre() ;
            document.getElementById("inputText1").value= alumnosArray.lista[alumnoAux].getApellido() ;

        }, 
        function(){ alertify.error('Se cancelo la eliminacion del usuario')});
    }else
    {
        alertify.alert('Error','Id ingresado no corresponde al alumno');
    }
}

function editarAlumnoConfirmacion()
{   
    let alumnoAux = alumnosArray.getIndex(parseInt(document.getElementById("idAlumnoCampo").value));
    if(alumnoAux>=0)
    {
        alertify.confirm('Cambiar valores del alumno?', 
        function()
        { 
            alumnosArray.lista[alumnoAux].setNota(parseInt(document.getElementById("inputText2").value)) ;
            alumnosArray.lista[alumnoAux].setNombre(document.getElementById("inputText").value) ;
            alumnosArray.lista[alumnoAux].setApellido(document.getElementById("inputText1").value) ;
            MostrarElementos(1);
            MostrarAlumnosHtml();
            alertify.success('Usuario Editado');
        }, 
        function(){ alertify.error('Se cancelo la Editacion del usuario')});
    }else
    {
        alertify.alert('Error','Id ingresado no corresponde al alumno');
    }


}

function EliminarAlumno()
{
    if(alumnosArray.getLargo()==0 )
        return alertify.notify('No hay alumnos cargados', 'error', 5, function(){  console.log('dismissed'); });

    let alumnoAux = alumnosArray.getIndex(parseInt(document.getElementById("idAlumnoCampo").value));
    if(alumnoAux>=0)
    {
        alertify.confirm('Desea Eliminar este alumno?', alumnosArray.lista[alumnoAux].getAlumno(), 
        function()
        { 
            alumnosArray.eliminarAlumno(alumnoAux);
            MostrarAlumnosHtml();
            alertify.success('Usuario eliminado');
        }, 
        function(){ alertify.error('Se cancelo la eliminacion del usuario')});
    }else
    {
        alertify.alert('Error','Id ingresado no corresponde al alumno');
    }
}


function PaginaCargar()
{
    MostrarElementos(0);
    document.getElementById("TituloPagina").textContent = "Cargar Usuarios";
}

function PaginaEditar()
{
    MostrarElementos(1);
    document.getElementById("TituloPagina").textContent = "Editar Usuarios";
}

function PaginaEliminar()
{   
    MostrarElementos(2);
    document.getElementById("TituloPagina").textContent = "Eliminar Usuarios";
}

function PaginaEnviar()
{
    MostrarElementos(3);
    document.getElementById("TituloPagina").textContent = "Enviar Usuarios";
}

function PaginaOtros()
{
    MostrarElementos(4);
    document.getElementById("TituloPagina").textContent = "Otros";
}

function MostrarElementos(dato)
{
    LimpiarCampos();
    document.getElementById("editarAlumno").style.display = "none";
    document.getElementById("agregarAlumnos").style.display = "none";
    document.getElementById("bestAlumno").style.display = "none";
    document.getElementById("worstAlumno").style.display = "none";
    document.getElementById("prodNotas").style.display = "none";
    document.getElementById("guardarAlumnos").style.display = "none";
    document.getElementById("cargarAlumnos").style.display = "none";
    document.getElementById("hardcodearAlumnos").style.display = "none";
    document.getElementById("enviarMail").style.display = "none";
    document.getElementById("descargarUsuario").style.display = "none";
    document.getElementById("idAlumnoCampo").style.display  = "none";
    document.getElementById("mailAlumnoCampo").style.display  = "none";
    document.getElementById("EliminarAlumnos").style.display  = "none";

    document.getElementById("editarAlumnoConfirmacion").style.display  = "none";

    document.getElementById("mailAlumnoTexto").textContent = "";
    document.getElementById("idAlumnoTexto").textContent = "";

    document.getElementById("inputText").style.display  = "none";
    document.getElementById("inputText1").style.display  = "none";
    document.getElementById("inputText2").style.display  = "none";

    document.getElementById("Text").textContent = "";
    document.getElementById("Text1").textContent = "";
    document.getElementById("Text2").textContent = "";
    
    if(dato==0) //Cargar Alumnos
    {
        ActivarCamposAgregarAlumno();
        
        document.getElementById("agregarAlumnos").style.display = "inline"; 
        document.getElementById("cargarAlumnos").style.display = "inline"; 
        document.getElementById("hardcodearAlumnos").style.display = "inline";


    }else if(dato==1) //Editar Alumnos
    {
        document.getElementById("editarAlumno").style.display = "inline";
        document.getElementById("idAlumnoTexto").textContent = "Ingrese id del alumno que desea editar";
        document.getElementById("idAlumnoCampo").style.display  = "inline";

    }else if(dato==2) //Eliminar Alumnos
    {
        document.getElementById("EliminarAlumnos").style.display  = "inline";
        document.getElementById("idAlumnoCampo").style.display  = "inline";
        document.getElementById("idAlumnoTexto").textContent = "Ingrese id del alumno que desea eliminar";
        
    }else if(dato==3)//Enviar/guardar Alumnos
    {
        document.getElementById("idAlumnoTexto").textContent = "Ingrese id del alumno que desea enviar";
        document.getElementById("idAlumnoCampo").style.display  = "inline";
        document.getElementById("guardarAlumnos").style.display = "inline";
        document.getElementById("enviarMail").style.display = "inline";
        document.getElementById("descargarUsuario").style.display = "inline";

        document.getElementById("mailAlumnoTexto").textContent = "Ingresar mail para enviar";
        document.getElementById("mailAlumnoCampo").style.display  = "inline";
    }else if(dato==4)//otros
    {
        document.getElementById("bestAlumno").style.display = "inline";
        document.getElementById("worstAlumno").style.display = "inline";
        document.getElementById("prodNotas").style.display = "inline";
    }
}



function ActivarCamposAgregarAlumno()
{
    document.getElementById("Text").textContent = "Ingrese Nombre del alumno";
    document.getElementById("Text1").textContent = "Ingrese apellido del alumno";
    document.getElementById("Text2").textContent = "Ingrese nota del alumno";
    
    document.getElementById("inputText").style.display  = "inline";
    document.getElementById("inputText1").style.display  = "inline";
    document.getElementById("inputText2").style.display  = "inline"; 
}