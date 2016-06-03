
renderer = new THREE.CanvasRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(0x000000,1.0);

camera.lookAt(100,100,100);

camera.position.set(50,50,200)
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

//粒子,76这个版本里面Particle无法创建粒子了...但是在官方网上全部该用了Sprite
// var material = new THREE.PointsMaterial();
// for(var x=-5;x<5;x++){
//     for(var y=-5;y<5;y++){
//         var particle = new THREE.Particle(material);
//         particle.position.set(x*10,y*10,0);
//         scene.add(particle);
//     }
// }

var SEPARATION = 100;
var AMOUNTX = 50;
var AMOUNTY = 50;
var material = new THREE.SpriteMaterial();

        for ( var ix = 0; ix < AMOUNTX; ix++ ) {

            for ( var iy = 0; iy < AMOUNTY; iy++ ) {

                particle = new THREE.Sprite( material );
                particle.position.set(ix*10,iy*10,0)
                // particle.scale.y = 20;
                // particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
                // particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
                scene.add( particle );

            }

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

function animation() {
    var childs = scene.children;
    for (var i = childs.length; i--;) {
        if (childs[i].name === "sphere") {
            childs[i].rotation.y += 0.02;
            childs[i].rotation.z += 0.02;
        }
    }
}