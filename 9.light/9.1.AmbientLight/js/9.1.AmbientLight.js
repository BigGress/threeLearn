//平台
var planeGeometry = new THREE.PlaneGeometry(60,40);
var planeMaterial = new THREE.MeshLambertMaterial({
    color:0xffffff
});
var plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -0.5*Math.PI;
plane.position.set(10,10,10);

scene.add(plane);

//方块

var cubeGeometry = new THREE.CubeGeometry(10,10,10);
var cubeMaterial = new THREE.MeshLambertMaterial({
    color:0xff0000
});
var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
cube.position.set(10,15,10);
scene.add(cube);

//环境光
var ambientLight = new THREE.AmbientLight("#0c0c0c");
scene.add(ambientLight);
//点光源
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(30,50,20);
scene.add(spotLight)

$("#webgl").append(renderer.domElement);
render()

function render(){

    cube.rotation.y += 0.02;

    renderer.render(scene,camera);
    requestAnimationFrame(render);
}
