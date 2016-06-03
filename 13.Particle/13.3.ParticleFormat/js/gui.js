var controls = new function(){
    this.segments = 64;
    this.radius = 1;
    this.radiusSgements = 8;
    this.closed = true;
    
    this.newPoints = function(){
        
        scene.remove(mesh)
        
        //随机生成点
        points = [];
        for (var i = 0; i < 10; i++) {
            var x1 = -20 + Math.round(Math.random() * 50);
            var y1 = -20 + Math.round(Math.random() * 40);
            var z1 = -20 + Math.round(Math.random() * 30);

            points.push(new THREE.Vector3(x1, y1, z1));
        }
        controls.draw();
    }
    
    this.draw = function(){
        
        scene.remove(mesh)
        
        // 生成图像
        tubeGeometry = new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3(points),
            controls.segments, controls.radius, controls.radiusSgements, controls.closed 
        )
        // create a multimaterial
        mesh = THREE.SceneUtils.createMultiMaterialObject(tubeGeometry, [meshMaterial, wireFrameMat]);

        scene.add(mesh);
    }
}

var gui = new dat.GUI();
gui.add(controls,"newPoints");
//加载step完改变后的值都为整数
gui.add(controls,"segments",0,500).step(1).onChange(controls.newPoints);
gui.add(controls,"radius",0,10).step(1).onChange(controls.draw);
gui.add(controls,"radiusSgements",0,50).step(1).onChange(controls.draw);
gui.add(controls,"closed").onChange(controls.draw);

