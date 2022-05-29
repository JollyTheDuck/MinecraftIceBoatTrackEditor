class PreviewBlock {
    constructor(x, y, z, width, height,depth, color, scene) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.color = color;
        //create a box
        this.box = BABYLON.MeshBuilder.CreateBox("box", { width: width, height: height, depth: depth}, scene);
        this.box.position.x = x;
        this.box.position.y = y;
        this.box.position.z = z;
        this.box.material = new BABYLON.StandardMaterial("material", scene);
        //add the box to the scene
        scene.addMesh(this.box);
    }

    //move the box to the new position with keyboard events
    move(event) {
        switch (event.keyCode) {
            case 87: //forward
                this.box.position.x -= 1;
                break;
            case 68: //right
                this.box.position.z += 1;
                break;
            case 83: //down
                this.box.position.x += 1;
                break;
            case 65: //left
                this.box.position.z -= 1;
                break;
        }
    }
}