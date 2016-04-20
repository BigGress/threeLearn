$(function(){
    var scene = new THREE.Scene();
    
    var camera = new THREE.PerspectiveCamera(45,
            window.innerWidth/window.innerHeight,0.1,1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE,1.0); //这个不知道为什么不能用
    renderer.setSize(window.innerWidth,window.innerHeight);
    //允许物体产生阴影
    renderer.shadowMap.enabled = true;


    //创建坐标轴
    var axes = new THREE.AxisHelper(50);
    scene.add(axes);
    //创建坐标轴结束
    //平台添加
    var planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
    var planeMaterial = new THREE.MeshLambertMaterial({
        color:0xcccccc
    });
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);

    //绕着x轴转90度
    plane.rotation.x = -0.5*Math.PI;

    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    //这是设置将阴影投影到这个平台
    plane.receiveShadow = true;

    scene.add(plane);
    //平台结束
    //立方体
    var cubeGeometry = new THREE.CubeGeometry(4,4,4);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color:0xff0000,
    });
    var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;

    //这里设置立方体体生成阴影
    cube.castShadow = true;

    scene.add(cube);
    //立方体结束
    //球体
    var sphereGeometry = new THREE.SphereGeometry(4,20,20);
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color:0x7777ff,
    })
    var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    //这里设置球体生成阴影
    sphere.castShadow = true;
    scene.add(sphere);
    //球体结束

    //添加点光源
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40,60,-10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    //点光源结束

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    //初始化fps窗口
    var stats = initStats();
    function initStats(){
        var stats = new Stats();
        //这里模式如果是0，就是监测FPS，
        //       如果是1，就是监测渲染时间
        stats.setMode(0);
        stats.domElement.style.position = "absolute";
        stats.domElement.style.right = "0px";
        stats.domElement.style.top = "0px";
        $("#Stats-output").append(stats.domElement);
        return stats
    }
    //fps初始化结束

    $("#WebGL-output").append(renderer.domElement);
    renderScene();

    function renderScene(){
        stats.update();
        requestAnimationFrame(renderScene);
        renderer.render(scene,camera);
    }


})