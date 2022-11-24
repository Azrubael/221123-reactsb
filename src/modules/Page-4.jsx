import React, {useState} from "react"
import { render } from "react-dom"

import hamster from "./assets/0fb35409-1df9-4d1b-ac84-42b23f7ff363.jpg"
import Sail from "./assets/and-his-name-is.mp3"
import "./src/style.scss"

const audio = new Audio(Sail)

const App = () => {
	const [personState, setPersonState] = useState("^.-")
	const wakeUp = () =>
		import(/* webPackChunkName: "OldLazyModule",
		webpackPreload: true*/ "./src/lazy-one").then(
			mod => setPersonState(mod.default)
		)
	const lazyBtnStyle = {
		margin: "10px auto",
		display: "flex",
		fontSize: "4rem"
	}

	return (
		<div id="myMemes">
			<h1>Page 4</h1>
			<h2>You can't expect...</h2>
			<img src={hamster} role="button" onClick={() => audio.play()} />
			<button style={lazyBtnStyle} onClick={() => wakeUp()}>
				{personState}
			</button>
		</div>
	)
}

const wrapper = document.createElement("div")
wrapper.setAttribute("id", "app")
document.body.appendChild(wrapper)

export default () => { render(<App />, wrapper) }