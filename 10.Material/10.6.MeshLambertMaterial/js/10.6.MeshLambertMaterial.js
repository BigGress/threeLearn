
//renderer.setClearColor(0xfcfcfc);
renderer.shadowMap.enabled = true;

var planeGeometry = new THREE.PlaneGeometry(60,40);
var planeMaterial = new THREE.MeshLambertMaterial({
    color:0x777ff
});
var plane = new THREE.Mesh(planeGeometry,planeMaterial)

plane.rotation.x = -0.5*Math.PI;
plane.position.set(0,0,0);
plane.name = "plane";
plane.receiveShadow = true;

scene.add(plane);

//环境光
var ambientlight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientlight);

//锥形光
var spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(0,100,0);

spotLight.target = plane;
spotLight.castShadow = true;
spotLight.shadowMapWidth = 2300;
spotLight.shadowMapHeight = 2300;

scene.add(spotLight);

//立方体
var cubeGeomerty = new THREE.CubeGeometry(10,10,10);
var cubeMaterial = new THREE.MeshLambertMaterial({
    color:0xff5687,
    //emissive不会与其他光合成
    emissive:0x000000,
    //wireframe:true
});
var cube = new THREE.Mesh(cubeGeomerty,cubeMaterial);
cube.name = "cube";
cube.position.set(0,15,0);

cube.castShadow = true;

scene.add(cube);

document.getElementById("webgl").appendChild(renderer.domElement);
render();
function render(){

    animation();


    renderer.render(scene,camera);
    requestAnimationFrame(render)
}

function random(){
    var returnNum = Math.random()*100-50;
    return returnNum;
}

function animation(){
    var childs = scene.children;
    for(var i=childs.length;i--;){
        if(childs[i].name === "cube"){
            childs[i].rotation.y += 0.02;
            childs[i].rotation.z += 0.02;
        }
    }
}
