import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, introTarea] = useState("")
	const [listaTareas, setNuevaTarea] = useState([])
	function handleguardao(evento) {
		if (evento.key != "Enter") {
			return
		}

		setNuevaTarea([...listaTareas, tarea])
		introTarea("")
	}
	function borrarTarea(indice) {
		setNuevaTarea(listaTareas.filter((_, index) => indice != index))

	}

	return (

		<div className="card text-center fondo">

			<div className="card-body ">
				<div className="card container">
					<div className=" d-flex glass justify-content-center align-items-center gap-4 opacity-25 pacifico-regular " >
						<h1 className="pacifico-regular">To Do </h1>
						<input className="col-8 input-group-text  " type="text" value={tarea} onChange={(e) => introTarea(e.target.value)} onKeyDown={(e) => handleguardao(e)} />
					</div>
				</div>
				<br></br>
				<div className="container d-flex pacifico-regular justify-content-center">
					<ul className="w-75 ">
						{listaTareas.map((tarea, index) => (

							<li key={index} className=" d-flex justify-content-between align-items-center w-100 glass2 ">

								{tarea}
								<button className="btn btn-outline-secondary btn " type="button" onClick={() => (borrarTarea(index))} ><span className="material-symbols-outlined">
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