
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1.0);

camera.lookAt(100, 100, 100);

camera.position.set(50, 50, 200);

//环境光
var ambientlight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientlight);

//锥形光
var spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(0, 100, 0);

//spotLight.target = plane;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 3000;
spotLight.shadow.mapSize.height = 3000;

scene.add(spotLight);

//材质
var material = new THREE.MeshNormalMaterial({color: 0x00ff00, transparent: true, opacity: 0.5 });
//创建几何体
function createCube(){
    var cubegeo = new THREE.CubeGeometry(10,10,10);
    var cube = new THREE.Mesh(cubegeo,material);
    
    cube.position.x = Math.random()*200;
    cube.position.y = Math.random()*200;
    cube.position.z = Math.random()*200;
    
    return cube;
}
//创建集合组
var geometry = new THREE.Geometry();
for(var i=1000;i--;){
    THREE.GeometryUtils.merge(geometry,createCube());
}
var mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


document.getElementById("webgl").appendChild(renderer.domElement);
render();
var step = 0;
function render() {

    animation();

    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function random() {
    var returnNum = Math.random() * 100 - 50;
    return returnNum;
}
var step = 0;
function animation() {
    // system.rotation.y += 0.01;
}