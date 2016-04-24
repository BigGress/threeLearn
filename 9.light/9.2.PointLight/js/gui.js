var controls = new function(){
    this.ambientColor = "#0c0c0c";
    this.spotColor = 0xffffff;
    this.step = 0;
}

var gui = new dat.GUI();
gui.addColor(controls,"ambientColor").onChange(function(e){
    ambientLight.color = new THREE.Color(e);
})
gui.addColor(controls,"spotColor").onChange(function(e){
    spotLight.color = new THREE.Color(e)
})
gui.add(controls,"step",0,5).onChange(function(e){
    step = this.step = e;
})
