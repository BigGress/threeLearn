
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

//粒子
var geom = new THREE.Geometry();
var material = new THREE.ParticleBasicMaterial({
    size:4,
    vertexColors:true,
    color:0x000000
})
for(var x=-5;x<5;x++){
    for(var y=-5;y<5;y++){
        var particle = new THREE.Vector3(x*10,y*10,0);
        geom.vertices.push(particle);
        geom.colors.push(new THREE.Color(Math.random()*0x00ffff));
    }
}
//粒子系统，如果是用webgl渲染的就要用ParticleSystem，如果不想用ParticleSystem就要用canvas渲染
var system = new THREE.ParticleSystem(geom,material);
scene.add(system);

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