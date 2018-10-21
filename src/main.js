import * as twgl from 'twgl.js';
import Stats from 'Stats.js';
import MushShader from './shaders/MushShader.js';

const gl = document.getElementById('c').getContext('webgl');
const programInfo = twgl.createProgramInfo(gl, [MushShader.vertexShader, MushShader.fragmentShader]);

const arrays = {
	position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
};
const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

//stats
let stats = new Stats();
document.body.appendChild(stats.domElement);

function render(time) {
	twgl.resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	const uniforms = {
		time: time * 0.001,
		resolution: [gl.canvas.width, gl.canvas.height],
	};

	gl.useProgram(programInfo.program);
	twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
	twgl.setUniforms(programInfo, uniforms);
	twgl.drawBufferInfo(gl, bufferInfo);

	stats.update();

	requestAnimationFrame(render);
}
requestAnimationFrame(render);
