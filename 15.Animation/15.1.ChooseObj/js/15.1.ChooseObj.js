
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfefefe, 1.0);

//环境光
var ambientlight = new THREE.AmbientLight(0xfefefe);
scene.add(ambientlight);

//锥形光
var spotLight = new THREE.SpotLight(0xfcfcfc)
spotLight.position.set(10, 150, -10);

//spotLight.target = plane;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 3000;
spotLight.shadow.mapSize.height = 3000;

scene.add(spotLight);
//材质
var material = new THREE.MeshBasicMaterial({color: 0x2194CE});
var cube = new THREE.Mesh(new THREE.CubeGeometry(10,10,10),material);
cube.position.set(0,0,0);
cube.name = "test"

scene.add(cube);



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
    var children = scene.children;

    for (var i = children.length; i--;) {
        if (children[i] instanceof THREE.Object3D) {
            children[i].rotation.y += 0.01;
        }
    }
}

document.body.addEventListener("mousemove",onMouseMove);
var projector = new THREE.Projector();
//鼠标获取函数
function onMouseMove(event){
    event.preventDefault();
    var mouseVector = new THREE.Vector3(
        (event.clientX/window.innerWidth)*2 -1,
        -(event.clientY/window.innerHeight)*2 +1,
        0.5
    );
    mouseVector.unproject(camera);
    // projector.unprojectVector(mouseVector,camera);
    
    var raycaster = new THREE.Raycaster(camera.position,mouseVector.sub(camera.position).normalize());
    
    var interscts = raycaster.intersectObjects([cube]);
    
    if(interscts.length>0){
        // console.log(interscts);
        interscts[0].object.material.transparent = true;
        // interscts[0].object.material.opacity = 0.1;
        
        makeopacity(interscts[0].object.material,0.1,100)
    }
}

//透明函数
function makeopacity(material,opacity,time){
    var int = setInterval(function(){
        if(opacity<=material.opacity){
            material.opacity = (material.opacity-0.01).toFixed(2);
            
            clearInterval(int)
        }
    },time)
}