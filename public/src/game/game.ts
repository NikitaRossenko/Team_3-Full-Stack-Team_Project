function game() {
    try {
        let activePlacement: any = undefined;

        const monsterSpeed = 4;
        const bulletSpeed = 2;
        const mapZoom = 1.5;
        const tileSize = 12;
        const newTileSize = mapZoom * tileSize;
        const mousePos: any = { x: undefined, y: undefined };

        const enemiesArray: any = [];
        const placementTowers2d: any = [];
        const placementTowersArray: any = [];
        const towersArray: any = [];

        const canvas = document.querySelector("canvas");
        const ctx = canvas?.getContext("2d");

        if (!canvas) throw new Error("[Canvas] Game Error");
        if (!ctx) throw new Error("[Canvas-ctx] Game Error");

        // Set the canvas Width and Height
        canvas.width = 1260;
        canvas.height = 720;

        // Canvas fill is optional if using a background image
        ctx.fillStyle = "white";

        // If using a background image this fill is optional
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Need to declare a new image (which will create an img element) - canvas need to receive a img element
        const mapImage = new Image();
        mapImage.src =
            "../../images/maps/Road-Of-Glory-peaceful-Map_1260x720.png";

        // Convert Towers coordinats to 2d
        for (let i = 0; i < placementTowers.length; i += 70) {
            placementTowers2d.push(placementTowers.slice(i, i + 70));
        }

        class PlacementTower {
            position: { x: number; y: number };
            size: number;
            color: string;
            used: boolean;

            constructor({ x = 0, y = 0 }) {
                this.position = { x: x, y: y };
                this.size = newTileSize;
                this.color = "rgba(128,0,128,0.2)";
                this.used = false;
            }

            draw() {
                if (!ctx) throw new Error("[Canvas-ctx] Game Error");

                ctx.fillStyle = this.color;
                ctx.fillRect(
                    this.position.x,
                    this.position.y,
                    this.size,
                    this.size
                );
            }

            update(mousePos) {
                this.draw();
                if (
                    mousePos.x > this.position.x &&
                    mousePos.x < this.position.x + this.size &&
                    mousePos.y > this.position.y &&
                    mousePos.y < this.position.y + this.size
                ) {
                    this.color = "rgba(128,0,128,1)";
                } else {
                    this.color = "rgba(128,0,128,0.2)";
                }
            }
        }

        class Enemey {
            position: { x: number; y: number };
            width: number;
            height: number;
            waypointIndex: number;
            zoom: number;
            center: { x: number; y: number };
            radius: number;

            constructor({ x = 0, y = 0 }) {
                this.position = { x: x, y: y };
                this.width = newTileSize;
                this.height = newTileSize;
                this.waypointIndex = 0;
                this.zoom = mapZoom;
                this.radius = 10;
                this.center = {
                    x: this.position.x + this.width / 2,
                    y: this.position.y + this.height / 2,
                };
            }

            draw() {
                if (!ctx) throw new Error("[Canvas-ctx] Game Error");
                ctx.fillStyle = "purple";
                ctx.beginPath();
                ctx.arc(
                    this.center.x * this.zoom,
                    this.center.y * this.zoom,
                    this.radius,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }

            update() {
                this.draw();
                const waypoint = path[this.waypointIndex];

                const yWaypoint = waypoint.y - this.center.y;
                const xWaypoint = waypoint.x - this.center.x;
                const angle = Math.atan2(yWaypoint, xWaypoint);
                this.position.x += Math.cos(angle) / monsterSpeed;
                this.position.y += Math.sin(angle) / monsterSpeed;
                this.center = {
                    x: this.position.x + this.width / 2,
                    y: this.position.y + this.height / 2,
                };

                if (
                    Math.round(this.center.x) === Math.round(waypoint.x) &&
                    Math.round(this.center.y) === Math.round(waypoint.y) &&
                    this.waypointIndex < path.length - 1
                ) {
                    this.waypointIndex++;
                }
            }
        }

        class Tower {
            position: { x: number; y: number };
            width: number;
            height: number;
            bullets: Bullet[];
            radius: number;
            center: { x: number; y: number };
            target: any;
            frames: number;

            constructor({ x = 0, y = 0 }) {
                this.position = { x: x, y: y };
                this.width = newTileSize * 2;
                this.height = newTileSize;
                this.bullets = [];
                this.center = {
                    x: this.position.x + this.width / 2,
                    y: this.position.y + this.height / 2,
                };
                this.radius = 70 * mapZoom;
                this.target;
                this.frames = 0;
            }

            draw() {
                if (!ctx) throw new Error("[Canvas-ctx] Game Error");

                ctx.fillStyle = "green";
                ctx.fillRect(
                    this.position.x,
                    this.position.y,
                    this.width,
                    this.height
                );

                ctx.beginPath();
                ctx.arc(
                    this.center.x,
                    this.center.y,
                    this.radius,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = "rgba(255,255,255,0.2)";
                ctx.fill();
            }

            update() {
                this.draw();
                this.frames++;

                if (this.frames % 100 === 0 && this.target) {
                    this.bullets.push(
                        new Bullet(
                            { x: this.position.x, y: this.position.y },
                            this.target
                        )
                    );
                }
            }
        }

        class Bullet {
            position: { x: number; y: number };
            velocity: { x: number; y: number };
            center: { x: number; y: number };
            enemy: Enemey;
            radius: number;

            constructor({ x = 0, y = 0 }, enemy) {
                this.position = { x: x, y: y };
                this.velocity = { x: 0, y: 0 };
                this.center = {
                    x: this.position.x + newTileSize,
                    y: this.position.y + newTileSize / 2,
                };
                this.radius = 6;
                this.enemy = enemy;
            }

            draw() {
                if (!ctx) throw new Error("[Canvas-ctx] Game Error");
                ctx.beginPath();
                ctx.arc(
                    this.center.x,
                    this.center.y,
                    this.radius,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = "white";
                ctx.fill();
            }

            update() {
                this.draw();

                const angle = Math.atan2(
                    this.enemy.center.y - this.position.y,
                    this.enemy.center.x - this.position.x
                );

                this.velocity.x = Math.cos(angle) * bulletSpeed;
                this.velocity.y = Math.sin(angle) * bulletSpeed;

                this.center.x += this.velocity.x;
                this.center.y += this.velocity.y;
            }
        }

        placementTowers2d.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if (symbol === 1211) {
                    placementTowersArray.push(
                        new PlacementTower({
                            x: x * newTileSize,
                            y: y * newTileSize,
                        })
                    );
                }
            });
        });

        // Create enemies with X coordinats offset
        for (let i = 0; i < 1; i++) {
            const xOffset = i * (Math.random() * (200 - 100 + 1) + 100);
            enemiesArray.push(
                new Enemey({ x: path[0].x - xOffset, y: path[0].y })
            );
        }

        // Animation function (Recursion)
        function animate() {
            requestAnimationFrame(animate);
            if (!ctx) throw new Error("[Canvas-ctx] Game Error");

            ctx.drawImage(mapImage, 0, 0);

            enemiesArray.forEach((enemy) => {
                enemy.update();
            });

            placementTowersArray.forEach((tower) => {
                tower.update(mousePos);
            });

            towersArray.forEach((tower) => {
                tower.update();
                tower.target = null;
                const validEnemies = enemiesArray.filter((enemy) => {
                    const xDistance = enemy.center.x - tower.center.x;
                    const yDistance = enemy.center.y - tower.center.y;
                    const distance = Math.hypot(xDistance, yDistance);
                    return distance < enemy.radius + tower.radius;
                });
                tower.target = validEnemies[0];

                for (let i = tower.bullets.length - 1; i >= 0; i--) {
                    const bullet = tower.bullets[i];

                    bullet.update();

                    const xDistance = bullet.enemy.center.x - bullet.position.x;
                    const yDistance = bullet.enemy.center.y - bullet.position.y;
                    const distance = Math.hypot(xDistance, yDistance);
                    if (distance < bullet.enemy.radius + bullet.radius) {
                        tower.bullets.splice(i, 1);
                    }
                }
            });
        }

        // Monitor mouse event "move" to catch the coordinats and use it to find elements inside the canvas

        canvas.addEventListener("click", (event) => {
            console.log(towersArray);
            if (activePlacement && !activePlacement.used) {
                console.log(activePlacement);
                towersArray.push(
                    new Tower({
                        x: activePlacement.position.x,
                        y: activePlacement.position.y,
                    })
                );
                activePlacement.used = true;
            }
        });

        window.addEventListener("mousemove", (event) => {
            mousePos.x = event.clientX - canvas.offsetLeft;
            mousePos.y = event.clientY - canvas.offsetTop;
            activePlacement = null;
            for (let i = 0; i < placementTowersArray.length; i++) {
                const placement = placementTowersArray[i];
                if (
                    mousePos.x > placement.position.x &&
                    mousePos.x < placement.position.x + placement.size &&
                    mousePos.y > placement.position.y &&
                    mousePos.y < placement.position.y + placement.size
                ) {
                    activePlacement = placement;
                    break;
                }
            }
        });
        console.log(canvas.offsetTop);
        console.log(canvas.offsetLeft);

        animate();
    } catch (error) {
        console.error(error);
    }
}

game();
