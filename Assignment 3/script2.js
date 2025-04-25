//responsive interaction

function setup() {
    createCanvas(600, 600);
    noStroke();
  }
  
  function draw() {
    background(0);

    // mouseX controls the rotation speed
    let rotationSpeed = map(mouseX, 0, width, 0, 1); 

    // spin around when mouse is moved
    translate(width / 2, height / 2);
    // adjusted rotation speed
    rotate(radians(frameCount * rotationSpeed)); 
    translate(-width / 2, -height / 2);

    // painting code 
    drawPainting(); 
}

function drawPainting(){
    // off white inner frame
    stroke(0);
    strokeWeight(.5);
    fill(227, 223, 209);
    rect(80, 80, 440, 440);
  
    // top left gray triangle
    stroke(0);
    strokeWeight(.5);
    fill(193, 195, 204);
    triangle(90, 90, 250, 90, 90, 250);
  
    // black shape
    stroke(0);
    strokeWeight(.5);
    fill(0);
    beginShape();
    vertex(90, 250);
    vertex(250, 90);
    vertex(250, 510);
    vertex(125, 510);
    vertex(90, 510);
    endShape(CLOSE);
    rect(250, 90, 15, 420);
  
    // yellow triangle
    stroke(0);
    strokeWeight(.5);
    fill(230, 190, 0);
    triangle(90, 510, 90, 340, 265, 510);
  
    //bottom left white triangle 
    stroke(0);
    strokeWeight(.5);
    fill(232, 228, 219);
    triangle(90, 510, 265, 510, 177.5, 425);
  
    // red triangle
    noStroke();
    fill(176, 42, 14); 
     
    triangle(264.5, 337, 510, 90, 510, 510);
 
    fill(176, 42, 14); 
    beginShape();
    vertex(264.8, 320);
    vertex(510,510);
    vertex(320, 510);
    endShape(CLOSE);
  
    // middle white triangles
    fill(232, 225, 217);
    triangle(265, 90, 410, 190, 265, 335);
    triangle(266, 90, 500, 90, 400, 200);
  
    // bottom gray triangle
    fill(193, 195, 204); 
    triangle(265, 335, 445, 510, 265, 510);
  
    // right side shadow
    fill(102, 30, 15)
    rect(504,91,5,419);
  
    // top right gray triangle
    fill(150);
    triangle(305, 90, 510, 90, 410, 190);
  
    // off-white 
    noStroke();
    fill(227, 223, 209)
    rect(80,90,10,430); 
    rect(80,80,440,10);
  
    // left side shadow
    fill(116, 115, 103)
    rect(90,91,5,156);
    
    fill(116, 115, 103)
    rect(90,342,3,166.5);
}
  