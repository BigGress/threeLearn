
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

//材质
var meshMaterial = new THREE.MeshPhongMaterial({specular: 0xffffff, color: 0x3399ff, shininess: 100});
meshMaterial.side = THREE.DoubleSide;

var font;
new THREE.FontLoader().load("./js/font.js",function(res){
    font = res;
    makefont()
});

function makefont(){
    
//字体属性
var options = {
    size:10,
    height:10,
    weight:"normal",
    font:font,
    style:"normal",
    bevelThickness:2,
    bevelSize:1,
    bevelSegments:12,
    bevelEnabled:true,
    curveSegments:12,
    steps:1
}
//英文
var text1Geo = new THREE.TextGeometry("English",options);
text1 = new THREE.Mesh(text1Geo,meshMaterial);
text1.position.set(0,10,-10);
text1.rotateX(-0.2*Math.PI);
scene.add(text1);
//中文
var text2Geo = new THREE.TextGeometry("中文",options);
text2 = new THREE.SceneUtils.createMultiMaterialObject(text2Geo,[meshMaterial]);
text2.position.set(10,0,0);
scene.add(text2);
}


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

var zhen = 0;

function animation() {
    var childs = scene.children;
    for (var i = childs.length; i--;) {
        if (childs[i].name === "as") {
            childs[i].rotation.y += 0.02;
            childs[i].rotation.z += 0.02;
        }
    }
}