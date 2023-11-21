console.log('Cargado')

import {Rest} from './rest.js'

window.onload = () => new Controlador()

class Controlador{
	constructor(){
		//Referencias de Interfaz
		this.btnGET = document.querySelectorAll('button')[0]
		this.btnAJAX = document.querySelectorAll('button')[1]
		this.i1 = document.querySelectorAll('input')[0]
		this.i2 = document.querySelectorAll('input')[1]

		//Asociación de eventos
		this.btnGET.onclick = this.llamarGET
        this.btnAJAX.onclick = this.llamarAJAX
	}

	llamarGET = () => {
		Rest.get('http://migueljaque.com/evg/2daw/dwec/api/php/datos_get.php', 
        {'param1': 42, 'param2': 'José Ramón'}, this.verResultadoGET)
	}

	verResultadoGET(respuesta){
		console.log('Resultado GET:', respuesta)
	}
	
    llamarAJAX =()=>{
    //recogjo los valores...validades..si todo esta bien
        const params={
            param1:this.i1.value,
            param2:this.i2.value
        }    
        Rest.getJSON('ajax1.php', params, this.verResultadoAJAX)
    }

    verResultadoAJAX = (objeto) => {
        console.log(objeto)
    }
}

function iniciar(){
	peticionGET(fun1)
	peticionPOST(fun2)
	//peticionPUT(fun3)
	document.getElementsByTagName('button')[0].onclick = enviarFichero
	console.log('Yo me ejecuto antes')
}

function peticionGET(callback){
	fetch('http://httpbin.org/get?param1=hola&param2=41')
	.then( respuesta => respuesta.json())
	.then( objeto => {
		if (objeto.args.param2 === "42")
			callback()
	})
}

function peticionPOST(callback){
	
	const formData = new FormData()
	formData.append( 'param1', 'Come sano')
	formData.append( 'param2', 17)

	const opciones = {
		method: 'POST',
		body: formData
	}

	fetch('http://httpbin.org/post', opciones)
	.then( respuesta => respuesta.json())
	.then( objeto => {
		if (objeto.form.param2 === "17")
			callback()
	})
}

function peticionPUT(callback){
	const opciones = {
		method: 'PUT'
	}
	fetch('http://httpbin.org/put/param1/hola/param2/41', opciones)
	.then( respuesta => respuesta.json())
	.then( objeto => console.log(objeto))
}
function enviarFichero(){
	const iFile = document.querySelector('input[type="file"]') 

	let reader = new FileReader()
	reader.onload = (evento) => {
		let fichero = evento.target.result
		console.log(fichero)
		const formData = new FormData()
		formData.append('ficherito', fichero)
		const opciones = {
			method: 'POST',
			body: formData
		}
		fetch('http://micasa.com/cogerFichero', opciones)
	}
	reader.readAsText(iFile.files[0])
}

function fun1(){
	console.log('Viva mi mare')
}
function fun2(){
	console.log('Viva mi pare')
}
function fun3(){
	console.log('Viva mi abuela')
}