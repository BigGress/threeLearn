//scene.overrideMaterial = new THREE.MeshDepthMaterial();


renderer.setClearColor(0x000000);
renderer.shadowMap.enabled = true;

var planeGeometry = new THREE.PlaneGeometry(60,40);
var planeMaterial = new THREE.MeshBasicMaterial({
    color:0x777ff
});
//元素不可见
planeMaterial.visible = false;

var plane = new THREE.Mesh(planeGeometry,planeMaterial)

plane.rotation.x = -0.5*Math.PI;
plane.position.set(0,0,0);

scene.add(plane);

//环境光
var ambientlight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientlight);

//圆形
var sphereGeomerty = new THREE.SphereGeometry(10,10,10);
sphereMaterial = new THREE.MeshNormalMaterial();

//sphereMaterial.shading = THREE.FlatShading;

var sphere = new THREE.Mesh(sphereGeomerty,sphereMaterial);
for (var f = 0, fl = sphere.geometry.faces.length; f < fl; f++) {
    var face = sphere.geometry.faces[ f ];
    var arrow = new THREE.ArrowHelper(
        face.normal,
        2,
        0x3333FF);
    sphere.add(arrow);
}
scene.add(sphere);

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
        if(childs[i] instanceof THREE.Mesh){
            childs[i].rotation.y += 0.02;
            childs[i].rotation.z += 0.02;
        }
    }
}
