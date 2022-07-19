// let d = 20;
let d = 20;
let targets = [];
let obstacles = [];
let bullets = [];
let hasDrawnBullets = [];
let scoreReward = 0;
let scorePenalty = 0;
let wRect = 100;
let hRect = 10;
let initialObstacles = 3;
let maxObstacles = 10;
let speedFactorObstacles = 10000;
let wBullet = 10;
let hBullet = 30;
function setup(){
    // textFont('Georgia');
    // textFont('Helvetica');

    const t = new Date('July 20, 69 20:17:40 GMT+00:00');
    console.log(t.getTime());
    start = new Date();
    for (var i = 0; i < 1000; i++) {
        Math.sqrt(i);
    }
    end = new Date();
    console.log('Operation took ' + (end.getTime() - start.getTime()) + 'msec');

    createCanvas(400, 400);
    rectMode(CENTER);
}

function draw(){
    current = new Date();
    elapsed = current.getTime() - start.getTime()
    // console.log(elapsed);

    // background(125);
    background(0);
    fill('White');
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
    fill('blue');
    for(let i = targets.length - 1; i >= 0; i--){
        ellipse(targets[i][0], targets[i][1], d);
        // targets[i][1] += 10;
        targets[i][1] += 3;
        // targets[i][1] += 3 + elapsed / 10000
        if(isHitCircle(targets[i], [mouseX, height * 0.8], d / 2, d / 2)){
            targets.splice(i, 1);
            scoreReward++;
            continue;
        }
        if(targets[i][1] > height){
            targets.splice(i, 1);
        }
    }


    fill('red');
    for(let i = obstacles.length - 1; i >= 0; i--){
        rect(obstacles[i][0], obstacles[i][1], wRect, hRect)
        obstacle = initialObstacles + elapsed / speedFactorObstacles;
        if(obstacle > maxObstacles){
            obstacle = maxObstacles;
        }
        obstacles[i][1] += obstacle;

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

    fill('purple');
    for(let i = bullets.length - 1; i >= 0; i--){
        if(!hasDrawnBullets[i]){ //Needs correction.
            // rect(mouseX, height * 0.8 - d / 2, wBullet, hBullet);
            rect(mouseX, height * 0.8 - hBullet / 2 - d / 2, wBullet, hBullet);
            bullets[i][0] = mouseX;
            bullets[i][1] = height * 0.8 - hBullet / 2 - d / 2;
            hasDrawnBullets[i] = true;
        }
        else{
            rect(bullets[i][0], bullets[i][1], wBullet, hBullet)
        }
        bullets[i][1] -= 10;

        let a = [bullets[i][0] - wBullet / 2, bullets[i][1] + hBullet / 2];
        let b = [bullets[i][0] + wBullet / 2, bullets[i][1] + hBullet / 2];
        let c = [mouseX, height * 0.8];
        if(isHitLine2(a, b, c, d / 2)){
            bullets.splice(i, 1);
            scorePenalty++;
            continue;
        }
        if(bullets[i][1] < 0){
            bullets.splice(i, 1);
            hasDrawnBullets.splice(i, 1);
        }
        }
    fill('White');
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

function isHitLine2(a, b, c, r){
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
// }, 5000);

// console.log('bbbbbbbbbb');


function mouseClicked(){
    bullets.push([width * Math.random(), 0]);
    // bullets.push([100, 0]);
    console.log(bullets);
    hasDrawnBullets.push(false);
    console.log(hasDrawnBullets);

}

