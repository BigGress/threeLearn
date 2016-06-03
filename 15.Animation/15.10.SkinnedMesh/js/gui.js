var controls = new function(){
    this.influence1 = 0.01;
    this.influence2 = 0.01;
    
    this.update = function(){
        cube.morphTargetInfluences[0] = controls.influence1;
        cube.morphTargetInfluences[1] = controls.influence2;
    }
}
var gui = new dat.GUI();
gui.add(controls,"influence1",0,10).onChange(controls.update);
gui.add(controls,"influence2",0,10).onChange(controls.update);

