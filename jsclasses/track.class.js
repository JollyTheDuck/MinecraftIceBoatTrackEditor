class Track {
    constructor(gravel,scene)
    {
        this.gravel == gravel;
        this.scene = scene;
        this.track = [];
        this.path = [];
        this.line = null;
        this.meshes = [];
        this.tube = null;
        this.blockArray = [];
    }

    addTrack(block)
    {
        var actualblock = block.box;
        var pos = {
            x: actualblock.position.x,
            y: actualblock.position.y,
            z: actualblock.position.z,
            width: block.currentTrackWidth,
            gravel: block.createGravel
        }
        this.track.push(pos);
        console.log(this.track);
        //make a box
        var box = BABYLON.MeshBuilder.CreateBox("box", { width: actualblock.width, height: actualblock.height, depth: actualblock.depth}, this.scene);
        //set vector position
        box.position = actualblock.position;
        box.material = new BABYLON.StandardMaterial("material", this.scene);
        //add the box to the scene
        this.scene.addMesh(box);
        //add the box to the meshes array
        this.meshes.push(box);
        //refresh the line
        if(this.track.length > 1){
            this.refreshLine();
        }
    }

    removeTrack()
    {
        if(this.track.length > 0){
            this.track.pop();
            this.meshes.pop().dispose();
            this.refreshLine();
        }
    }

    refreshLine()
    {
        //create the line
        if(this.line != null){
            this.line.dispose();
        }
        this.line = BABYLON.MeshBuilder.CreateLines("line", {points: this.track}, this.scene);
        this.line.color = new BABYLON.Color3(1,0,0);
        this.line.alpha = 0.5;
        //add the line to the scene
        this.scene.addMesh(this.line);
    }

    cleanPath()
    {
        var tempPath = [];
        //go through the track array and create a path array
        for(var i = 0; i < this.track.length; i++){
            var pos = this.track[i];
            tempPath.push(new BABYLON.Vector3(pos.x,pos.y,pos.z));
        }
        //CreateCatmullRomSpline
        var curve = BABYLON.Curve3.CreateCatmullRomSpline(tempPath, 10);
        //make a path array from the curve
        this.path = curve.getPoints();

    }

    makeTube()
    {
        this.cleanPath();
        const radiusChange = (i) => {
            return this.track[Math.round(i/10)].width;
        }
        this.tube = BABYLON.MeshBuilder.CreateTube("tube", {path: this.path, radius: 0.5, radiusFunction: radiusChange, tessellation: 100}, this.scene);
        this.tube.material = new BABYLON.StandardMaterial("material", this.scene);
        this.tube.material.diffuseColor = new BABYLON.Color3(0,0,1);
        this.scene.addMesh(this.tube);
        //create boxes in the tube that fit the tube
        for(var i = 0; i < this.path.length; i++){
            //make boxes in the path and add them to the block array, if a position is already taken, don't create a box
            // if(this.blockArray.length > 0){
                var pos = this.path[i];
                pos.x = Math.round(pos.x);
                pos.y = Math.round(pos.y);
                pos.z = Math.round(pos.z);
                var found = false;
                for(var j = 0; j < this.blockArray.length; j++){
                    if(this.blockArray[j].x == pos.x && this.blockArray[j].y == pos.y && this.blockArray[j].z == pos.z){
                        found = true;
                    }
                }
                if(found == false){
                    var box = BABYLON.MeshBuilder.CreateBox("box", { width: this.track[Math.round(i/10)].width, height: this.track[Math.round(i/10)].height, depth: this.track[Math.round(i/10)].depth}, this.scene);
                    box.position = this.path[i];
                    box.material = new BABYLON.StandardMaterial("material", this.scene);
                    box.material.diffuseColor = new BABYLON.Color3(0,0,1);
                    this.scene.addMesh(box);
                    this.blockArray.push(box.position);
                }
            // }
        }

        
        //create a path from the outsides of the boxes
    }


}