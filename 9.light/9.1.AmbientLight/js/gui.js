var controls = new function(){
    this.ambientColor = "#0c0c0c";
}

var gui = new dat.GUI();
gui.addColor(controls,"ambientColor").onChange(function(e){
    ambientLight.color = new THREE.Color(e);
})