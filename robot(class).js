function submit() {
    //RENDERING INPUTS FROM USER
    var position = document.getElementById('location').value;
    position = position.split(",").map(Number);
    const direction = document.getElementById('direction').value.toLowerCase();
    var commands = document.getElementById('commands').value;
    if (position && position.length === 2) {
        var robot = new Robot(position, direction);
        robot.addCommandsList(commands.split(","));
        var finalposition = robot.getPosition();
        if (finalposition[0] <= 9 && finalposition[1] <= 9) {
            document.getElementById("output").innerHTML = "Final position is:(" + finalposition + ")";
        } else { document.getElementById("output").innerHTML = "ROBOT OUT OF GRID"; }
        //console.log(finalposition);
    } else { document.getElementById("output").innerHTML = "INVALID INPUT"; }
}

//DEFINING A CLASS ROBOT
class Robot {

    //CONSTRUCTOR FOR GETTING INITIAL POSITION AND DIRECTION

    constructor(iposition, idirection) {
        this.iposition = iposition;
        this.idirection = idirection;
    }

    //FUNCTION TO ITERATE COMMAND LIST AND PASS THE ELEMENTS AS ARGUMENTS TO UPDATE POSITION

    addCommandsList(commands) {
        if (commands && commands.length > 0) {
            commands.forEach(element => {
                this.updatePosition(element.trim().toLowerCase());
            });
        }

    }
    //AN UPDATE FUNCTION TO UPDATE THE POSITION OF ROBOT WRT TO COMMANDS PASSED
    updatePosition(direction) {

        if (this.idirection === 'f') {
            if (direction === 'f')
                this.move(1, 1);
            else if (direction === 'r')
                this.move(0, 1);
            else if (direction === 'l')
                this.move(0, -1);
        } else if (this.idirection === 'r') {
            if (direction === 'f')
                this.move(0, 1);
            else if (direction === 'r')
                this.move(1, -1);
            else if (direction === 'l')
                this.move(1, 1);
        } else if (this.idirection === 'l') {
            if (direction === 'f')
                this.move(0, -1);
            else if (direction === 'r')
                this.move(1, 1);
            else if (direction === 'l')
                this.move(1, -1);
        }
    }
    //ALGORITHM FOR UPDATING POSITION
    move(index, value) {
        this.iposition[index] += value;
    }
    //FUNCTION TO RETURN FINAL POSITION
    getPosition() {
        return this.iposition;
    }
}