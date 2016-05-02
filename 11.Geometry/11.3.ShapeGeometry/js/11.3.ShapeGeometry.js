
renderer.setClearColor(0xfcfcfc);
renderer.shadowMap.enabled = true;
//圆
var circleGeometry = new THREE.CircleGeometry(18,40,0,2*Math.PI);
var circleMaterial1 = new THREE.MeshNormalMaterial({
    side:THREE.DoubleSide
});
var circleMaterial2 = new THREE.MeshBasicMaterial({
    //color:0x00ff00,
    wireframe:true
});

var circle = new THREE.SceneUtils.createMultiMaterialObject(circleGeometry,
    [circleMaterial1,circleMaterial2]);

circle.position.set(0,0,0);
circle.rotation.y = Math.PI/5;
circle.rotation.x = -Math.PI/5;

scene.add(circle);

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