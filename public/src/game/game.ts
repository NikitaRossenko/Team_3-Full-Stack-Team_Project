
function game() {
    try {
        const mapSize = 1.5
        let monsterSpeed = 200
        
        const enemies:any = []
        const placementTowersArray:any = []

        const canvas = document.querySelector("canvas")
        const ctx = canvas?.getContext('2d');
        const placementTowers2d:any = []

        if (!canvas) throw new Error("[Canvas] Game Error")
        if (!ctx) throw new Error("[Canvas-ctx] Game Error")

        // Set the canvas Width and Height
        canvas.width = 1260
        canvas.height = 720

        // Canvas fill is optional if using a background image
        ctx.fillStyle = "white"

        // If using a background image this fill is optional
        ctx.fillRect(0,0,canvas.width,canvas.height)

        // Need to declare a new image (which will create an img element) - canvas need to receive a img element
        const mapImage = new Image()
        mapImage.src = "../../images/maps/Road-Of-Glory-peaceful-Map_1260x720.png"

        // Convert Towers coordinats to 2d
        for (let i = 0 ; i < placementTowers.length ; i+=70){
            placementTowers2d.push(placementTowers.slice(i,i+70))
        }

        class PlacementTower {
            position: { x: number; y: number; };
            size: number;
            color: string;
            constructor({x=0, y=0}){
                this.position = {x:x, y:y}
                this.size = 24
                this.color = "rgba(128,0,128,0.2)"
                console.log(this.position)
            }
            

            draw() {
                if (!ctx) throw new Error("[Canvas-ctx] Game Error")

                ctx.fillStyle = this.color
                ctx.fillRect(this.position.x, this.position.y, this.size, this.size)

            }

            update(mousePos){
                this.draw()
                if (mousePos.x > this.position.x && mousePos.x < this.position.x + this.size  && mousePos.y > this.position.y && mousePos.y < this.position.y + this.size){
                    this.color = "rgba(128,0,128,1)"
                } else {
                    this.color = "rgba(128,0,128,0.2)"
                }
            }
        }

        class Enemey {
            position:{x:number; y:number;}
            width: number;
            height: number;
            waypointIndex: number;
            zoom: number;
            center: { x: number; y: number; };

            constructor({x=0,y=0}){
                this.position = {x:x, y:y}
                this.width = 24
                this.height = 24
                this.waypointIndex = 0
                this.zoom = mapSize
                this.center = {x:this.position.x + this.width/2, y:this.position.y + this.height/2}
            }

            draw(){
                if (!ctx) throw new Error("[Canvas-ctx] Game Error")
                ctx.fillStyle = "purple"
                ctx.fillRect(this.position.x*this.zoom, this.position.y*this.zoom, this.width, this.height)
            }

            update() {
                this.draw()
                const waypoint = path[this.waypointIndex]
                
                const yWaypoint = waypoint.y - this.center.y
                const xWaypoint = waypoint.x - this.center.x
                const angle = Math.atan2(yWaypoint, xWaypoint)
                this.position.x += Math.cos(angle)
                this.position.y += Math.sin(angle)
                this.center = {x:this.position.x + this.width/2, y:this.position.y + this.height/2}
                

                if (Math.round(this.center.x) === Math.round(waypoint.x) && Math.round(this.center.y) === Math.round(waypoint.y) && this.waypointIndex < path.length-1){
                    this.waypointIndex++
                }
            }
        }

        placementTowers2d.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if (symbol === 1211){
                    placementTowersArray.push(new PlacementTower({x:x*24, y:y*24}))
                }
            })
        })

        // Create enemies with X coordinats offset
        for (let i = 1; i < 10 ; i++){
            const xOffset = i * (Math.random()*(600 - 100 +1) + 100)
            enemies.push(new Enemey({x:path[i].x - xOffset, y:path[i].y}))
        }

        // Animation function (Recursion)
        function animate(){
            requestAnimationFrame(animate)
            if (!ctx) throw new Error("[Canvas-ctx] Game Error")

            ctx.drawImage(mapImage,0,0)
            
            enemies.forEach( enemy => {
                enemy.update()
            })

            placementTowersArray.forEach(tower => {
                tower.update(mousePos)
            })

            
        }

        // Monitor mouse event "move" to catch the coordinats and use it to find elements inside the canvas
        const mousePos:any = {x:undefined, y:undefined}
        window.addEventListener('mousemove', (event) => {
            mousePos.x = event.clientX - canvas.offsetLeft
            mousePos.y = event.clientY - canvas.offsetTop
            console.log(mousePos.x,mousePos.y)

        })

        animate()


    } catch (error) {
        console.error(error)
    }
}

game()