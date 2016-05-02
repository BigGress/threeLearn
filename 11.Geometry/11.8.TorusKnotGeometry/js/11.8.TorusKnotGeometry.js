
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

var torusGeometry = new THREE.TorusGeometry(10,2);
var torusMaterial1 = new THREE.MeshNormalMaterial();
torusMaterial1.side = THREE.DoubleSide;
var torusMaterial2 = new THREE.MeshBasicMaterial({
    wireframe:true
});

var torus = new THREE.SceneUtils.createMultiMaterialObject(torusGeometry,[torusMaterial1,torusMaterial2]);

scene.add(torus);

document.getElementById("webgl").appendChild(renderer.domElement);
render();
var step = 0;
function render(){

    animation()

    renderer.render(scene,camera);
    requestAnimationFrame(render)
}

function random(){
    var returnNum = Math.random()*100-50;
    return returnNum;
}

var add = 0.01*Math.PI;
function animation(){
    if(add){
        controls.arc += add;
        console.log(add,controls.arc)
        if(controls.arc>Math.PI*2||controls.arc<0){
            add = add*-1;
        }
        createSphere()
    }
}
