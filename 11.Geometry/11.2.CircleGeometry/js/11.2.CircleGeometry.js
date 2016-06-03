
renderer.setClearColor(0xfcfcfc);
renderer.shadowMap.enabled = true;
//创建平面
var planeGeometry = new THREE.PlaneGeometry(60,40,5,5);
var planeMaterial = new THREE.MeshNormalMaterial();
planeMaterial.side = THREE.DoubleSide;
var planeMaterial2 = new THREE.MeshBasicMaterial();
planeMaterial2.wireframe = true;
var plane = new THREE.SceneUtils.createMultiMaterialObject(planeGeometry,[planeMaterial,planeMaterial2]);


//plane.rotation.x = -0.5*Math.PI;
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

//spotLight.target = plane;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 3000;
spotLight.shadow.mapSize.height = 3000;

scene.add(spotLight);



document.getElementById("webgl").appendChild(renderer.domElement);
render();
var step = 0;
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
        if(childs[i].name === "sphere"){
            childs[i].rotation.y += 0.02;
            childs[i].rotation.z += 0.02;
        }
    }
}