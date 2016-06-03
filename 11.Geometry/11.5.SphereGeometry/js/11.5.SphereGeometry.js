
renderer.setClearColor(0xfcfcfc);
renderer.shadowMap.enabled = true;
//坐标加入
var axes = new THREE.AxisHelper(50);
scene.add(axes)

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

//球体
var sphereGeometry = new THREE.SphereGeometry(10,10,10);
var sphereMaterial1 = new THREE.MeshNormalMaterial({
    side:THREE.DoubleSide
});
var sphereMaterial2 = new THREE.MeshBasicMaterial({
    wireframe:true
});

var sphere = new THREE.SceneUtils.createMultiMaterialObject(sphereGeometry,[sphereMaterial1,sphereMaterial2]);

scene.add(sphere);


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
    //var childs = scene.children;
    //for(var i=childs.length;i--;){
    //    if(childs[i].name === "sphere"){
    //        childs[i].rotation.y += 0.02;
    //        childs[i].rotation.z += 0.02;
    //    }
    //}

    controls.thetaStart +=0.02;

    if(controls.thetaStart>2*Math.PI){
        controls.thetaStart =0;
    }

    createSphere();
}