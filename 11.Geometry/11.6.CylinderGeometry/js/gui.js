var controls = new function(){
    this.radiusTop = 10;
    this.radiusBottom = 10;
    this.height = 10;
    this.segmentsX = 8;
    this.segmentsY = 1;
    this.openEnded = false;
}

var gui = new dat.GUI();
gui.add(controls,"radiusTop",-100,100).onChange(createSphere);

gui.add(controls,"radiusBottom",-100,100).onChange(createSphere);

gui.add(controls,"height",0,100).onChange(createSphere);

gui.add(controls,"segmentsX",0,50).onChange(createSphere);
gui.add(controls,"segmentsY",0,50).onChange(createSphere);
gui.add(controls,"openEnded").onChange(function(e){
    controls.openEnded = controls.openEnded ? true:false;
    console.log(controls.openEnded)
    createSphere();
});

function createSphere(){
    scene.remove(cylineder);
    cylinederGeometry = new THREE.CylinderGeometry(controls.radiusTop,
        controls.radiusBottom,
        controls.height,
        controls.segmentsX,
        controls.segmentsY,
        controls.openEnded);

    cylineder = new THREE.SceneUtils.createMultiMaterialObject(cylinederGeometry,[cylinederMaterial1,cylinederMaterial2]);

    scene.add(cylineder);
}
