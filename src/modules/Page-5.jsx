import hamster from "./assets/0fb35409-1df9-4d1b-ac84-42b23f7ff363.jpg"
import Sail from "./assets/and-his-name-is.mp3"
import "./src/style.scss"
const audio = new Audio(Sail)

export default () => {
	const pic = document.querySelector("body")
	document.body.innerHTML = '<div id="myMemes"></div>'
	document.getElementById("myMemes").innerHTML = `
		<h1>Page 5</h1>
		<h1>And his name is...</h1>
		<img id="pic" src="${hamster}" /><br />
		<h2><i>HAMSTER</i></h2>`
		
	pic.addEventListener('click', () => {
		console.log('Клик!')
		audio.play()
	})

	const lazyButton = document.createElement("button")
	lazyButton.innerText = "^.-"
	lazyButton.style = "margin: 10px auto; display: flex; font-size: 4rem"
	lazyButton.onclick = () =>
		import("./src/lazy-one").then(mod => (lazyButton.innerText = mod.default))
	document.body.appendChild(lazyButton)
}