
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
spotLight.position.set(0, 100, 0);

//spotLight.target = plane;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 3000;
spotLight.shadow.mapSize.height = 3000;

scene.add(spotLight);


//随机生成点
var points = [];
for (var i = 0; i < 10; i++) {
    var x = -20 + Math.round(Math.random() * 50);
    var y = -20 + Math.round(Math.random() * 40);
    var z = -20 + Math.round(Math.random() * 30);

    points.push(new THREE.Vector3(x, y, z));
}
// 生成图像
var tubeGeometry = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(points),
    64, 1, 8, true
)
// assign two materials
//var meshMaterial = new THREE.MeshNormalMaterial();
var meshMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.2 });

var wireFrameMat = new THREE.MeshBasicMaterial();
wireFrameMat.wireframe = true;

// create a multimaterial
var mesh = THREE.SceneUtils.createMultiMaterialObject(tubeGeometry, [meshMaterial, wireFrameMat]);

scene.add(mesh);


document.getElementById("webgl").appendChild(renderer.domElement);
render();
var step = 0;
function render() {

    animation();

    renderer.render(scene, camera);
    requestAnimationFrame(render)
}

function random() {
    var returnNum = Math.random() * 100 - 50;
    return returnNum;
}

function animation() {
    var childs = scene.children;
    for (var i = childs.length; i--;) {
        if (childs[i].name === "sphere") {
            childs[i].rotation.y += 0.02;
            childs[i].rotation.z += 0.02;
        }
    }
}