import { useState, useEffect } from "react";
import React from "react";

const Home = () => {
	const API_URL = "https://playground.4geeks.com/todo"
	const USER_NAME = "Papa"


	const [listaTareas, setListaTareas] = useState([])
	const [tarea, setTarea] = useState("")


	const getUser = async () => {
		console.log("Obtengo las tareas");
		const response = await fetch(`${API_URL}/users/${USER_NAME}/`)
		if (!response.ok) {
			creaUser();
			console.log("Creo el usuario");	
		}
		const data = await response.json() //los datos esperaran a la respuesta en json		
		console.log("Tengo las tareas! son las siguientes:", data.todos);
		
		setListaTareas(data.todos) //nos muestra que contiene data
		console.log("Guardo las tareas en la lista");
	}

	const creaUser = async () => {
		const response = await fetch(`${API_URL}/users/${USER_NAME}/`, { method: "POST" })
	}

	const crearTarea = async (e) => {
		console.log(e.key)
		if (e.key != "Enter") return;
		console.log("Vale! envío a la api", tarea);
		const response = await fetch(`${API_URL}/todos/${USER_NAME}/`, {
				method: "POST",
				body: JSON.stringify({ "label": tarea, "is_done": false }),
				headers: { 'content-type': 'application/json' }
			})
			console.log("Enviado!");
			console.log("borramos 'tarea'");
			setTarea("")
			await getUser();
	}

	// Borrar una tarea
	const borrarTarea = async (id) => {
		const response = await fetch(`${API_URL}/todos/${id}/`,{
			method: "DELETE"
		})
		console.log("Borrame la tarea numero", id);
		
		await getUser()
	}



	useEffect(() => {
		getUser()
	}, [])

	return (
		<div className="card text-center fondo">
			<div className="card-body ">
				<div className="card container">
					<div className=" d-flex glass justify-content-center align-items-center gap-4 opacity-25 pacifico-regular " >
						<h1 className="pacifico-regular">To Do </h1>
						<input className="col-8 input-group-text" type="text" value={tarea} onChange={(e) => setTarea(e.target.value)} onKeyDown={(e) => crearTarea(e)}/>
					</div>
				</div>
				<br></br>
				<div className="container d-flex pacifico-regular justify-content-center">
					<ul className="w-75 ">
						{listaTareas.map((tarea, index) => (
							<li key={index} className=" d-flex justify-content-between align-items-center w-100 glass2 ">
								{tarea.label}
								<button className="btn btn-outline-secondary btn " type="button"><span className="material-symbols-outlined" onClick={() => borrarTarea(tarea.id)}>
									delete
								</span></button>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="card-footer text-body-secondary">
				{listaTareas.length}
			</div>
		</div>
	);
};
export default Home;










