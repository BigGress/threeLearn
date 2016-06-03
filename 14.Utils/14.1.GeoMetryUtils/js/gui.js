var controls = new function(){
    this.radius = 212;
    this.tube = 208;
    this.radialSegments = 553;
    this.tubularSegments = 55;
    this.p = 20;
    this.q = 24;
    this.scale = 24;
    
    this.review = function(){
        scene.remove(system);
        
        
    
        geom = new THREE.TorusKnotGeometry(controls.radius, 
                                                                        controls.tube,
                                                                        controls.radialSegments,
                                                                        controls.tubularSegments,
                                                                        controls.p,
                                                                        controls.q);
                                                                        
        system = new THREE.Points(geom,material);
        scene.add(system)
    }
}
var gui = new dat.GUI();
gui.add(controls,"radius",0,400).onChange(controls.review);

gui.add(controls,"tube",0,400).onChange(controls.review);
gui.add(controls,"radialSegments",0,1000).step(1).onChange(controls.review);
gui.add(controls,"tubularSegments",0,100).step(1).onChange(controls.review);
gui.add(controls,"p",0,40).step(1).onChange(controls.review);
gui.add(controls,"q",0,40).step(1).onChange(controls.review);

