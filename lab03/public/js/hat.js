
window.onload = function () {
    console.log("Beans")
    // Set up variables
    var cv = $(".canvas").get(0).getContext("2d")
    var x = 50
    var y = 50
    var vel = 15
    var dir = 0
    
    draw = function () {
        // Set up drawing
        cv.clearRect(0, 0, 300, 150);
        cv.fillStyle = "#33bb22"
        cv.strokeStyle = '#117705'
        // Draw bean
        cv.beginPath()
        cv.arc(x, y, 5, 0, Math.PI * 2, true)
        cv.fill()
        cv.stroke()
        cv.closePath()
        // Randomly add motion on click
        $("#canvas").click((ev) => {
            vel = Math.random() * 10 + 5;
            dir = Math.random() * Math.PI * 2;
        })
        // Edge bounce
        if (y > 140 || y < 10) {
            dir = -dir
        }
        if (x > 295 || x < 5) {
            dir = Math.PI - dir;
        }
        // Vector addition for gravity
        dx = vel * Math.cos(dir)
        dy = vel * Math.sin(dir)

        x += dx
        y += dy
        
        dir = Math.atan2(dy + 1, dx);
        vel = Math.sqrt(dx * dx + (dy + 1) * (dy + 1))
        vel *= .97 // Friction
    }
    // Run every 20ms (50fps)
    window.setInterval(draw, 20);
}