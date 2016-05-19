var planeGeometry = new THREE.PlaneGeometry(60,40);
var planeMaterial = new THREE.MeshBasicMaterial({
    color:0x777ff
});
//元素不可见
//planeMaterial.visible = false;

var plane = new THREE.Mesh(planeGeometry,planeMaterial)

plane.rotation.x = -0.5*Math.PI;
plane.position.set(0,0,0);

scene.add(plane);

//立方体
var cubeGeometry = new THREE.CubeGeometry(10,10,10);
var cubeMaterial = new THREE.MeshBasicMaterial({
    color:0x687665
})
//开启透明渲染
cubeMaterial.transparent = true;

var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

cube.position.set(0,10,0)
scene.add(cube);

//环境光
var ambientlight = new THREE.AmbientLight(0xfcfcfc);
scene.add(ambientlight);

document.getElementById("webgl").appendChild(renderer.domElement);
render();

function render(){

    cube.rotation.y += 0.02;

    renderer.render(scene,camera);
    requestAnimationFrame(render)
}

