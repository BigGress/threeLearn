
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

//波浪型
function radialWave(u,v){
    var r = 50;
    var x = Math.sin(u+0.3)*r;
    var z = Math.sin((v+0.3)/2)*2*r;
    var y = (Math.sin((u+0.3)*4*Math.PI)+Math.cos((v+0.3)*2*Math.PI))*2.8;
    
    return new THREE.Vector3(x,y,z);
}
var meshGeo = new THREE.ParametricGeometry(radialWave,100,100,false);

// create a multimaterial
var mesh = THREE.SceneUtils.createMultiMaterialObject(meshGeo, [meshMaterial]);

mesh.position.set(-10,-10,-20);
mesh.name = "wave";

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

var zhen = 0;

function animation() {
    var childs = scene.children;
    for (var i = childs.length; i--;) {
        if (childs[i].name === "as") {
            childs[i].rotation.y += 0.02;
            childs[i].rotation.z += 0.02;
        }
    }
    
    
    zhen+=1;
        console.log(zhen)
    if(zhen>100){
        
        scene.remove(mesh);
        
         meshGeo = new THREE.ParametricGeometry(radialWave,120,120,false);
        
        mesh = THREE.SceneUtils.createMultiMaterialObject(meshGeo, [meshMaterial]);

        mesh.position.set(-10,-10,-20);
        mesh.name = "wave";

        scene.add(mesh);
        
        zhen = 0;
    }
}