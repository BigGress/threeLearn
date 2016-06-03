
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
//怪物的图像
var getTexture  = function () {

   var canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;

            var ctx = canvas.getContext('2d');
            // the body
            ctx.translate(-81, -84);

            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.moveTo(83, 116);
            ctx.lineTo(83, 102);
            ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
            ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
            ctx.lineTo(111, 116);
            ctx.lineTo(106.333, 111.333);
            ctx.lineTo(101.666, 116);
            ctx.lineTo(97, 111.333);
            ctx.lineTo(92.333, 116);
            ctx.lineTo(87.666, 111.333);
            ctx.lineTo(83, 116);
            ctx.fill();

            // the eyes
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.moveTo(91, 96);
            ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
            ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
            ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
            ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
            ctx.moveTo(103, 96);
            ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
            ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
            ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
            ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
            ctx.fill();

            // the pupils
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
            ctx.fill();


            var texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
}
// var material = new THREE.SpriteMaterial({
//     program: draw,
//     color: 0xffffff
// });
//粒子
var geom = new THREE.Geometry();
// vertexColors和map不能共存...不然会报错
var material = new THREE.PointsMaterial({
    size:2,
    // vertexColors:true,
    // color:0x00ff00,
    transparent:true,
    opacity:0.6,
    map:getTexture()
})


var range = 500;
for(var x=0;x<100;x++){
    for(var y=0;y<100;y++){
        var particle = new THREE.Vector3(
            Math.random()*range-range/2,
            Math.random()*range-range/2,
            Math.random()*range-range/2);
        geom.vertices.push(particle);
    }
}
var system = new THREE.Points(geom,material);
system.sortParticles = true;

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