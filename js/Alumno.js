class Alumnos{
    constructor(){
        this.lista = [];
    }
    addAlumno(alumno)
    {
        this.lista.push(alumno);
    }

    eliminarAlumno(index)
    {
        this.lista.splice(index,1);
    }

    getLargo()
    {
        return this.lista.length;
    }

    getIndex(id)
    {
        let index;
        for (index = 0; index < this.getLargo(); index++) {
            if(this.lista[index].getId()==id)
                return index;
        }
        return -1;
    }
}

class Alumno{
    constructor(nombre, apellido, notas,id){
        this.id= id;
        this.nombre= nombre;
        this.apellido=apellido;
        this.notas=notas;
    }

    getNombre()
    {
        return this.nombre;
    }
    getApellido()
    {
        return this.apellido;
    }
    getNota()
    {
        return this.notas;
    }

    getId()
    {
        return this.id;
    }

    setId(id)
    {
        if(id >0 && id!=NaN)
            this.id = id;
        else
            this.id =0;
    }

    setNombre(nombre)
    {
        this.nombre = nombre;
    }
    setApellido(apellido)
    {
        this.apellido= apellido;
    }
    setNota(notas)
    {
        this.notas=notas;
    }

    getAlumno()
    {
        return   "Id: "+ this.getId() +" - Nombre: "+ this.getNombre() + " " + this.getApellido() + " - Nota: " + this.getNota() ;
    }
};
