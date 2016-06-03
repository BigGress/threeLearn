
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
var s1 = texttrue.load("./sprite-sheet.png");
//粒子
var geom = new THREE.Geometry();
var group = new THREE.Object3D();
//精灵材质
var material = new THREE.SpriteMaterial({
    map: s1,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity:0.6,
    color:0xff00ff
})
//精灵
material.scaleByViewPort = true;

var sprite = new THREE.Sprite(material);
sprite.scale.set(5,5,5);
sprite.position.set(0,0,0);
sprite.velocityX = 5;
group.add(sprite)
scene.add(sprite);

//复制100个
for(var i = 100;i--;){
    var a = sprite.clone();
    sprite.position.set(
        Math.random()*500-250,
        Math.random()*500-250,
        Math.random()*500-250
    )
group.add(a)
    scene.add(a);
}


document.getElementById("webgl").appendChild(renderer.domElement);
render();
var step = 0;
function render() {

    animation();

    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function random() {
    var returnNum = Math.random() * 100 - 50;
    return returnNum;
}
var step = 0;
function animation() {
    step += 0.01;
    group.rotation.x = step;
}