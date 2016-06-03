
//renderer.setClearColor(0xfcfcfc);
renderer.shadowMap.enabled = true;


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
var material1 = new THREE.MeshNormalMaterial();
material1.side = THREE.DoubleSide;
var material2 = new THREE.MeshBasicMaterial({
    wireframe:true
});

generatePoints()

//创建几何体
function generatePoints(){
    var points = [];
    for(var i=0;i<20;i++){
        var randomX = -15+Math.round(Math.random()*30);
        var randomY = -15+Math.round(Math.random()*30);
        var randomZ = -15+Math.round(Math.random()*30);

        points.push(new THREE.Vector3(randomX,randomY,randomZ));
    };

    var spGrop = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({
        color:0xff0000,
        transparent:false
    });
    points.forEach(function(point){
        var spGeom = new THREE.SphereGeometry(0.2);
        var spMesh = new THREE.Mesh(spGeom,material);
        spMesh.position.set(point.x,point.y,point.z);
        spGrop.add(spMesh);
    });

    scene.add(spGrop);

    var convexGeometry = new THREE.ConvexGeometry(points);
    convexMesh = new THREE.SceneUtils.createMultiMaterialObject(convexGeometry,[material1,material2]);
    scene.add(convexMesh);
}


document.getElementById("webgl").appendChild(renderer.domElement);
render();
var step = 0;
function render(){

    animation();

    renderer.render(scene,camera);
    requestAnimationFrame(render)
}

function random(){
    var returnNum = Math.random()*100-50;
    return returnNum;
}

function animation(){
    var childs = scene.children;
    for(var i=childs.length;i--;){
        //if(childs[i].name === "sphere"){
            childs[i].rotation.y += 0.01;
            childs[i].rotation.z += 0.01;
        //}
    }
}


