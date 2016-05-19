var controls = new function(){
    this.width = 10;
    this.height = 10;
    this.depth = 10;
    this.widthSegments = 1;
    this.heightSegments = 1;
    this.depthSegments = 1;
}

var gui = new dat.GUI();
gui.add(controls,"width",0,100).onChange(createCube);

gui.add(controls,"height",0,100).onChange(createCube);

gui.add(controls,"depth",0,100).onChange(createCube);

gui.add(controls,"widthSegments",0,10).onChange(createCube);
gui.add(controls,"heightSegments",0,10).onChange(createCube);
gui.add(controls,"heightSegments",0,10).onChange(createCube);

function createCube(){
    scene.remove(cube);
    console.log(Math.round(controls.width))
    cubeGeometry = new THREE.CubeGeometry(controls.width,controls.height,controls.depth,
        Math.round(controls.widthSegments),Math.round(controls.heightSegments),Math.round(controls.depthSegments));
    cube = new THREE.SceneUtils.createMultiMaterialObject(cubeGeometry,[cubeMaterial1,cubeMaterial2]);
    cube.position.set(5,5,5);

    scene.add(cube)
}
