
renderer.setClearColor(0xfcfcfc);
renderer.shadowMap.enabled = true;

camera.position.set(50,50,200);
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
var material = new THREE.PointsMaterial({
    size:1,
    vertexColors:true,
    color:0x00ff00,
    transparent:true,
    opacity:0.6,
    // setAttenuation:true//是否启动粒子的透视系统
})
var range = 500;
for(var x=0;x<1500;x++){
    for(var y=0;y<1500;y++){
        var particle = new THREE.Vector3(Math.random()*range-range/2,Math.random()*range-range/2,Math.random()*range-range/2);
        geom.vertices.push(particle);
        var color = new THREE.Color(0x00ff00);
        color.setHSL(color.getHSL().l,
        color.getHSL().s,
        Math.random()*color.getHSL().l);
        geom.colors.push(new THREE.Color(Math.random()*0x00ffff));
    }
}
//粒子系统，如果是用webgl渲染的就要用ParticleSystem，如果不想用ParticleSystem就要用canvas渲染
var system = new THREE.Points(geom,material);
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