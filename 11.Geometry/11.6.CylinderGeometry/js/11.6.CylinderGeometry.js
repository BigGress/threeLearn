
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

var cylinederGeometry = new THREE.CylinderGeometry(20,20,10,8,8);
var cylinederMaterial1 = new THREE.MeshNormalMaterial();
cylinederMaterial1.side = THREE.DoubleSide;
var cylinederMaterial2 = new THREE.MeshBasicMaterial({
    wireframe:true
});

var cylineder = new THREE.SceneUtils.createMultiMaterialObject(cylinederGeometry,[cylinederMaterial1,cylinederMaterial2]);

scene.add(cylineder);

document.getElementById("webgl").appendChild(renderer.domElement);
render();
var step = 0;
function render(){

    renderer.render(scene,camera);
    requestAnimationFrame(render)
}

function random(){
    var returnNum = Math.random()*100-50;
    return returnNum;
}
