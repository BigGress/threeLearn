
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1.0);

camera.lookAt(100, 100, 100);

camera.position.set(50, 50, 200)
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



var SEPARATION = 100;
var AMOUNTX = 50;
var AMOUNTY = 50;
var texttrue = new THREE.TextureLoader();
var s1 = texttrue.load("./raindrop-2.png");
//粒子
var geom = new THREE.Geometry();
var material = new THREE.PointsMaterial({
    size: 10,
    map: s1,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true
})


var range = 500;
for (var x = 0; x < 10; x++) {
    for (var y = 0; y < 10; y++) {
        var particle = new THREE.Vector3(
            Math.random() * range - range / 2,
            Math.random() * range - range / 2,
            Math.random() * range - range / 2);
        particle.velocityY = 0.1 + Math.random() / 5;
        particle.velocityX = (Math.random() - 0.5) / 3;
        geom.vertices.push(particle);
    }
}
var system = new THREE.Points(geom, material);
system.sortParticles = true;

scene.add(system);

document.getElementById("webgl").appendChild(renderer.domElement);
render();
var step = 0;
function render() {

    animation();

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function random() {
    var returnNum = Math.random() * 100 - 50;
    return returnNum;
}
var x = 0;
function animation() {
    var vertices = system.geometry.vertices;

    var time = Date.now() * 0.00005;
    for (i = 0; i <vertices.length; i++) {

        var object = vertices[i];


        object.y = object.y - 0.1;
        
        if(object.y<0){
             object.y = 60;
        }

    }
    scene.remove(system)
    system = new THREE.Points(geom, material);
    system.sortParticles = true;

    scene.add(system);
}