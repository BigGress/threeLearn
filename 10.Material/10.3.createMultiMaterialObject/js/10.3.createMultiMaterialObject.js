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

document.getElementById("webgl").appendChild(renderer.domElement);
createCube();
render();
function render(){

    animation();


    renderer.render(scene,camera);
    requestAnimationFrame(render)
}

function createCube(){
    for(var i=100;i--;){
        //立方体
        var cubeGeometry = new THREE.CubeGeometry(10,10,10);

        //设计两种材质
        var detpMaterial = new THREE.MeshDepthMaterial();
        var colorMaterial = new THREE.MeshBasicMaterial({
            color:0xfcfcfc,
            wireframe:true,
            transparent:true,
            blending:THREE.MultiplyBlending,
        });

        var cube = new THREE.SceneUtils.createMultiMaterialObject(cubeGeometry,
        [detpMaterial,colorMaterial]);

        cube.castShadow = true;

        cube.position.set(random(),random(),random()*-8);
        scene.add(cube);
    }
}

function random(){
    var returnNum = Math.random()*100-50;
    return returnNum;
}

function animation(){
    var cubes = scene.children;
    for(var i=cubes.length;i--;){
        if(cubes[i] instanceof THREE.Mesh){
            cubes[i].rotation.y += 0.02;
            cubes[i].rotation.z += 0.02;
        }
    }
}
