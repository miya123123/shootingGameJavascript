let d = 20;
let targets = [];
let obstacles = [];
let scoreReward = 0;
let scorePenalty = 0;
let wRect = 100;
let hRect = 10;
function setup(){
    createCanvas(400, 400);
    rectMode(CENTER);
}

function draw(){
    background(125);
    text("RewardScore: " + scoreReward, width * 0.1, height * 0.1);
    text("PenaltyScore: " + scorePenalty, width * 0.4, height * 0.1);
    if(mouseX < d / 2){
        ellipse(d / 2, height * 0.8, d);
    }
    else if(mouseX > width - d / 2){
        ellipse(width - d / 2, height * 0.8, d);
    }else{
        ellipse(mouseX, height * 0.8, d);
    }
    for(let i = targets.length - 1; i >= 0; i--){
        ellipse(targets[i][0], targets[i][1], d);
        targets[i][1] += 10;
        if(isHitCircle(targets[i], [mouseX, height * 0.8], d / 2, d / 2)){
            targets.splice(i, 1);
            scoreReward++;
            continue;
        }
        if(targets[i][1] > height){
            targets.splice(i, 1);
        }
    }


    for(let i = obstacles.length - 1; i >= 0; i--){
        rect(obstacles[i][0], obstacles[i][1], wRect, hRect)
        obstacles[i][1] += 10;
        let a = [obstacles[i][0] - wRect / 2, obstacles[i][1] + hRect / 2];
        let b = [obstacles[i][0] + wRect / 2, obstacles[i][1] + hRect / 2];
        let c = [mouseX, height * 0.8];
        if(isHitLine(a, b, c, d / 2)){
            obstacles.splice(i, 1);
            scorePenalty++;
            continue;
        }
        if(obstacles[i][1] > height){
            obstacles.splice(i, 1);
        }
    }
}

function isHitCircle(obj1, obj2, r1, r2){
    if(calcDist(obj1, obj2) < Math.pow(r1 + r2, 2)){
        return true;
    }
    return false;
}

function calcDist(a, b){
    return Math.pow((a[0] - b[0]), 2) + Math.pow((a[1] - b[1]), 2);
}

function isHitLine(a, b, c, r){
    let ab = [b[0] - a[0], b[1] - a[1]];
    let ba = [a[0] - b[0], a[1] - b[1]];
    let ac = [c[0] - a[0], c[1] - a[1]];
    let bc = [c[0] - b[0], c[1] - b[1]];
    let dist = calcVerticalLine(ab, ac);
    if(dist > r){
        return false;
    }
    let dot1 = dot(ab, ac);
    let dot2 = dot(ba, bc);
    if(dot1 >= 0 && dot2 >= 0){
        return true;
    }else if(dot1 < 0){
        if(calcDist(a, c) < Math.pow(r, 2)){
            return true;
        }
        else{
            return false;
        }
    }else if(dot2 < 0){
        if(calcDist(b, c) < Math.pow(r, 2)){
            return true;
        }
        else{
            return false;
        }
    }
}

function dot(a, b){
    return a[0] * b[0] + a[1] * b[1];
}

function cross(a, b){
    return a[0] * b[1] - a[1] * b[0];
}

function vecAbs(a){
    return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2));
}

function calcVerticalLine(a, b){
    return Math.abs(cross(a, b) / vecAbs(a));
}

setInterval(() => {
    if(Math.random() < 0.5){
        targets.push([width * Math.random(), 0]);
    } else{
        obstacles.push([width * Math.random(), 0]);
    }
}, 200);




