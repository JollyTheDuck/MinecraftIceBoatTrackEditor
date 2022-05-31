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
        const radiusChange2 = (i) => {
            return this.track[Math.round(i/10)].width-1;
        }
        this.tube = BABYLON.MeshBuilder.CreateTube("tube", {path: this.path, radius: 1, radiusFunction: radiusChange, tessellation: 100}, this.scene);
        this.tube.material = new BABYLON.StandardMaterial("material", this.scene);
        this.tube.material.diffuseColor = new BABYLON.Color3(0,0,1);
        //update facet data
        this.tube.updateFacetData();
        this.scene.addMesh(this.tube);
        //get all the positions of the tube
        var positions = this.tube.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        //create another tube with -1 radius for the gravel
        var tube2 = BABYLON.MeshBuilder.CreateTube("tube", {path: this.path, radius: 1, radiusFunction: radiusChange2, tessellation: 100}, this.scene);
        this.tube2.material = new BABYLON.StandardMaterial("material", this.scene);
        this.tube2.material.diffuseColor = new BABYLON.Color3(0,0,1);
        //update facet data
        this.tube2.updateFacetData();
        this.scene.addMesh(tube2);
        //get all the positions of the tube
        var positions2 = tube2.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        //create an array of the positions
        var positionsArrayLeft = [];
        var positionsArrayRight = [];
        var positionsArrayGravelLeft = [];
        var positionsArrayGravelRight = [];
        for(var i = 0; i < positions.length; i+=3){
            //if i+1 is between 0.16 and -0.16, add the position to the array
            if(positions[i+1] > -0.16 && positions[i+1] < 0.16){
                //get the center of the tube and look if the value is to the left or right
                var center = this.tube.getBoundingInfo().boundingBox.center;
                if(positions[i+1] < center.y){
                    //push rounded vector3 to the array
                    positionsArrayLeft.push(new BABYLON.Vector3(Math.round(positions[i]),Math.round(positions[i+1]),Math.round(positions[i+2])));
                    //push the position to the gravel array -1 distance from the center
                    positionsArrayGravelLeft.push(new BABYLON.Vector3(Math.round(positions2[i]),Math.round(positions2[i+1]),Math.round(positions2[i+2])));
                }else{
                    positionsArrayRight.push(new BABYLON.Vector3(Math.round(positions[i]),Math.round(positions[i+1]),Math.round(positions[i+2])));
                    positionsArrayGravelRight.push(new BABYLON.Vector3(Math.round(positions2[i]),Math.round(positions2[i+1]),Math.round(positions2[i+2])));
                }
                //filter
                positionsArrayLeft = this.uniq(positionsArrayLeft);
                positionsArrayRight = this.uniq(positionsArrayRight);        
            }
        }
        
        function createLines(array, color, scene){
            var path = new BABYLON.Path3D(array);
            var lines = BABYLON.MeshBuilder.CreateLines("line", {points: path.getPoints()}, scene);
            lines.color = color;
            scene.addMesh(lines);
        }
        createLines(positionsArrayLeft, new BABYLON.Color3(1,0,0), this.scene);
        createLines(positionsArrayRight, new BABYLON.Color3(1,0,0), this.scene);
        createLines(positionsArrayGravelLeft, new BABYLON.Color3(0,1,0), this.scene);
        createLines(positionsArrayGravelRight, new BABYLON.Color3(0,1,0), this.scene);

        //remove the tube
        this.tube.dispose();
    }
        
    uniq (a) {
        var seen = {};
        return a.filter(function(item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    }
        //create a path from the outsides of the boxes
    


}