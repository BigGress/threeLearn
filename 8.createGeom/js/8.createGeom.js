$(function(){

    //添加scene
    var scene = new THREE.Scene();
    //雾化
    scene.fog = new THREE.FogExp2(0xffffff,0.015);

    //所有物体同一个材质
    scene.overrideMaterial = new THREE.MeshLambertMaterial({
        color:0xffffff
    })
    //相机
    var camera = new THREE.PerspectiveCamera(45,
                window.innerWidth/window.innerHeight,0.1,1000);

    camera.position.set(-30,40,30);
    camera.lookAt(scene.position);
    //渲染器
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);

    var vertices = [
        new THREE.Vector3(1,3,1),
        new THREE.Vector3(1,3,-1),
        new THREE.Vector3(1,-1,1),
        new THREE.Vector3(1,-1,-1),
        new THREE.Vector3(-1,3,-1),
        new THREE.Vector3(-1,3,1),
        new THREE.Vector3(-1,-1,-1),
        new THREE.Vector3(-1,-1,1)
    ];
    var faces = [
        new THREE.Face3(0,2,1),
        new THREE.Face3(2,3,1),
        new THREE.Face3(4,6,5),
        new THREE.Face3(6,7,5),
        new THREE.Face3(4,5,1),
        new THREE.Face3(5,0,1),
        new THREE.Face3(7,6,2),
        new THREE.Face3(6,3,2),
        new THREE.Face3(5,7,0),
        new THREE.Face3(7,2,0),
        new THREE.Face3(1,3,4),
        new THREE.Face3(3,6,4)
    ]

    var gom = new THREE.Geometry();
    gom.vertices = vertices;
    gom.faces = faces;
    gom.computeBoundingSphere();
    gom.mergeVertices();

    var gomMesh = new THREE.Mesh(gom,new THREE.MeshLambertMaterial({ color: Math.random()*0xffffff}))


    scene.add(gomMesh);

    //光
    var light = new THREE.AmbientLight(0x090909);
    scene.add(light);

    $("#WebGL-output").append(renderer.domElement);

    var stats = initStats();



    function initStats(){
        var stats = new Stats();

        stats.setMode(0);

        stats.domElement.style.position = "absolute";
        stats.domElement.style.left = "0px";
        stats.domElement.style.top = "0px";

        $("#Stats-output").append(stats.domElement);

        return stats
    }

    //控制器
    var controls = new function(){
        this.rotationSpeed = 0.02;
        this.numberOfObj = scene.children.length;

        this.removeChildren = function(){
            var all = scene.children;
            var last = scene.children[all.length-1];
            if(last instanceof THREE.Mesh){
                scene.remove(last);
                this.numberOfObj = scene.children.length;
            }
        }

        this.addChildren = function() {
            var cubeSize = Math.ceil(Math.random() * 3);
            var cubeGeometry = new THREE.CubeGeometry(cubeSize,cubeSize,cubeSize);
            var cubeMaterial = new THREE.MeshLambertMaterial({
                color:Math.random()*0xffffff,
            })
            var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
            cube.castShadow = true;
            cube.name = "cube-"+scene.children.length;

            console.log(planeGeometry)
            cube.position.x = -30 + Math.round((Math.random()*40));
            cube.position.y = Math.round(Math.random()*5);
            cube.position.z = -20 + Math.round((Math.random()*60));

            scene.add(cube);
            this.numberOfObj = scene.children.length;
            console.log(scene.children);
        }

        this.outputObjects = function(){
            console.log(scene.children);
        }
    }


    var gui = new dat.GUI();
    gui.add(controls, "rotationSpeed",0,0.5);
    gui.add(controls,"addChildren");
    gui.add(controls,"removeChildren");
    gui.add(controls,"outputObjects");
    gui.add(controls,"numberOfObj").listen();



    render();


    function render(){
        stats.update();

        //scene.traverse(function(e){
        //    if(e instanceof THREE.Mesh && e != plane){
        //        e.rotation.x += controls.rotationSpeed;
        //        e.rotation.y += controls.rotationSpeed;
        //        e.rotation.z += controls.rotationSpeed;
        //    }
        //})

        requestAnimationFrame(render);
        renderer.render(scene,camera);
    }
})