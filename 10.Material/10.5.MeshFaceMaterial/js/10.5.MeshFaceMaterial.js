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

//魔方
var group = new THREE.Mesh();
var mats = [];
mats.push(new THREE.MeshBasicMaterial({color:0x009e60}));
mats.push(new THREE.MeshBasicMaterial({color:0x0051ba}));
mats.push(new THREE.MeshBasicMaterial({color:0xffd500}));
mats.push(new THREE.MeshBasicMaterial({color:0xff5800}));
mats.push(new THREE.MeshBasicMaterial({color:0xC41E3A}));
mats.push(new THREE.MeshBasicMaterial({color:0xfcfcfc}));
var faceMaterial = new THREE.MeshFaceMaterial(mats);

for(var x=0;x<3;x++){
    for(var y=0;y<3;y++){
        for(var z=0;z<3;z++){
            var cubeGeom = new THREE.CubeGeometry(2.9,2.9,2.9);
            var cube = new THREE.Mesh(cubeGeom,faceMaterial);
            cube.position.set(x*3-3,y*3-3,z*3-3);
            group.add(cube)
        }
    }
}
scene.add(group)

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
