// function handleUserUpdatecreatGame(playerId: string, enemyId: string, towersId: string) {
//     try {
//         fetch("/api/users/creat-game", {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({playerId, enemyId, towersId}),
//         });
//     } catch (error) {
//       console.error(error);
//     }
//   }



// function delay(milliseconds){

//     console.log("1")
//     return new Promise(resolve => {
//         setTimeout(resolve, milliseconds);
//     });
// }

function game(playerId: string, enemyId: string, towersId: string) {
    try {
        fetch("/api/users/creat-game", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({playerId, enemyId, towersId}),
        });
        function sound(src) {
            this.sound = document.createElement("audio");
            this.sound.src = src;
            this.sound.setAttribute("preload", "auto");
            this.sound.setAttribute("controls", "block");
            this.sound.setAttribute("loop", "true");
            this.sound.style.display = "block";
            document.body.appendChild(this.sound);
            this.play = function () {
                this.sound.play();
            };
            this.stop = function () {
                this.sound.pause();
            };
        }

        // const mySound = new sound("../../audio/Gruber - Merciful.mp3");
        // mySound.play()

        const mainContainer: any = document.querySelector(".mainContainer");
        const gameOver: any = document.querySelector("#gameOver");
        const scene: any = document.querySelector("#scene");
        const playBtnContainer: any =
            document.querySelector(".playBtnContainer");
        const replayBtn: any = document.querySelector("#replayBtn");
        const playerHealthHearts: any = document.querySelector("#playerHealth");
        const pauseBtnContainer: any =
            document.querySelector("#pauseBtnContainer");
        const pauseBtnIcon: any = document.querySelector("#pauseBtnIcon");
        const uiIconsContainer: any =
            document.querySelector(".uiIconsContainer");
        const playerScore: any = document.querySelector("#playerScore");
        const playerCoinsBag: any = document.querySelector("#playerCoinsBag");
        const playerCoins: any = document.querySelector("#playerCoins");
        const scoreAmount: any = document.querySelector("#scoreAmount");
        const wave: any = document.querySelector("#wave");
        const waveNumber: any = document.querySelector("#waveNumber");

        scene.style.display = "none";
        replayBtn.style.display = "none";

        let activePlacement: any = undefined;
        let mapZoom: number = 1.5;
        let enemyCount = 4;
        let playerHealth = 3;
        let bulletPower = 20;
        let gamePaused = false;
        let score = 0;
        let coins = 100;
        let waveCount = 1;
        let zoomOffsetX = 0;
        let zoomOffsetY = 0;

        scoreAmount.innerText = score;
        playerCoins.innerText = coins;
        waveNumber.innerText = waveCount;

        const tileSize = 12;
        const newTileSize = mapZoom * tileSize;

        const enemySpeed = 2;
        const bulletSpeed = 2;
        const mousePos: any = { x: undefined, y: undefined };

        const enemiesArray: any = [];
        const placementTowers2d: any = [];
        const placementTowersArray: any = [];
        const towersArray: any = [];

        const canvas = document.querySelector("canvas");
        if (!canvas) throw new Error("[Canvas] Game Error");

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("[Canvas-ctx] Game Error");

        // Canvas fill is optional if using a background image
        ctx.fillStyle = "white";

        // If using a background image this fill is optional
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Need to declare a new image (which will create an img element) - canvas need to receive a img element
        const mapImage = new Image();

        // Set the canvas Width and Height
        if (mapZoom === 1.5) {
            zoomOffsetX = newTileSize;
            zoomOffsetY = newTileSize * 2;
            canvas.width = 1260;
            canvas.height = 720;
            mapImage.src =
                "../../images/maps/Road-Of-Glory-peaceful-Map_1260x720x1.5.png";
            mainContainer.insertAdjacentHTML("beforeend", '<img id="bgImage" src="../../images/maps/Road-Of-Glory-peaceful-Map_1260x720x1.5.png">')
        } else if (mapZoom === 2) {
            zoomOffsetY = newTileSize;
            canvas.width = 1680;
            canvas.height = 960;
            mapImage.src =
                "../../images/maps/Road-Of-Glory-peaceful-Map_1680x960x2.0.png";
            mainContainer.insertAdjacentHTML("beforeend", '<img id="bgImage" src="../../images/maps/Road-Of-Glory-peaceful-Map_1680x960x2.0.png">')
        } else {
            throw new Error("Resolution Error!");
        }

        wave.style.display = "flex";
        gameOver.style.display = "none";
        playBtnContainer.style.display = "none";
        playerHealthHearts.style.display = "flex";
        uiIconsContainer.style.display = "flex";
        playerScore.style.display = "flex";
        playerCoinsBag.style.display = "flex";

        // Convert Towers coordinats to 2d
        for (let i = 0; i < placementTowers.length; i += 70) {
            placementTowers2d.push(placementTowers.slice(i, i + 70));
        }

        class Sprite {
            image: HTMLImageElement;
            position: { x: number; y: number };
            center: { x: number; y: number };
            width: number;
            height: number;
            zoom: number;
            imgFrames: number;
            currentFrame: number;
            framesTimeout: number;
            randomEnemyIndex: number;

            constructor({ x = 0, y = 0 }, imgSource, imgFrames = 1) {
                this.randomEnemyIndex = Math.floor(Math.random() * (imgSource.length - 1 + 1) + 1)
                this.position = { x: x, y: y };
                this.image = new Image();
                this.image.src = imgSource[this.randomEnemyIndex-1];
                this.width = 90;
                this.height = 90;
                this.zoom = mapZoom;
                this.imgFrames = imgFrames;
                this.currentFrame = 0;
                this.framesTimeout = 0;
                this.center = {
                    x: this.position.x * this.zoom - newTileSize / mapZoom,
                    y: this.position.y * this.zoom - newTileSize / mapZoom,
                };
            }

            draw() {
                const cropWidth = this.image.width / this.imgFrames;
                const crop = {
                    position: { x: cropWidth * this.currentFrame, y: 0 },
                    width: cropWidth,
                    height: this.image.height,
                };
                ctx?.drawImage(
                    this.image,
                    crop.position.x,
                    crop.position.y,
                    crop.width,
                    crop.height,
                    this.position.x * this.zoom -
                        newTileSize +
                        mapZoom * this.zoom -
                        zoomOffsetX,
                    this.position.y * this.zoom -
                        newTileSize +
                        mapZoom * this.zoom -
                        zoomOffsetY,
                    crop.width,
                    crop.height
                );
                this.framesTimeout++;
                if (this.framesTimeout % 9 === 0) {
                    this.currentFrame++;
                    if (this.currentFrame >= this.imgFrames) {
                        this.currentFrame = 0;
                    }
                }
            }
        }

        class PlacementTower {
            position: { x: number; y: number };
            size: number;
            color: string;
            used: boolean;
            radius: number;
            center: { x: number; y: number };
            width: number;
            height: number;

            constructor({ x = 0, y = 0 }) {
                this.position = { x: x, y: y };
                this.size = newTileSize;
                this.color = "rgba(128,0,128,0.2)";
                this.used = false;
                this.radius = 70 * mapZoom;
                this.width = newTileSize;
                this.height = newTileSize;

                this.center = {
                    x: this.position.x + this.width,
                    y: this.position.y + this.height / 2,
                };
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
                    if (!ctx) throw new Error("[Canvas-ctx] Game Error");
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
                    this.color = "rgba(128,0,128,1)";
                } else {
                    this.color = "rgba(128,0,128,0.2)";
                }
            }
        }

        class Enemey extends Sprite {
            position: { x: number; y: number };
            width: number;
            height: number;
            waypointIndex: number;
            zoom: number;
            center: { x: number; y: number };
            radius: number;
            health: number;

            constructor({ x = 0, y = 0 }, enemyImages) {
                super(
                    { x: 0, y: 0 },
                    enemyImages,
                    12
                );
                this.position = { x: x, y: y };
                this.width = newTileSize;
                this.height = newTileSize;
                this.waypointIndex = 0;
                this.zoom = mapZoom;
                this.radius = newTileSize;
                this.health = 100;
                this.center = {
                    x: this.position.x + this.width / 2,
                    y: this.position.y + this.height / 2,
                };
            }

            draw() {
                if (!ctx) throw new Error("[Canvas-ctx] Game Error");
                super.draw();

                // Enemy Health Bar
                ctx.fillStyle = "red";
                ctx.fillRect(
                    this.position.x * this.zoom,
                    this.position.y * this.zoom -
                        newTileSize / mapZoom -
                        zoomOffsetY,
                    this.width * mapZoom,
                    tileSize / 2
                );
                ctx.fillStyle = "green";
                ctx.fillRect(
                    this.position.x * this.zoom,
                    this.position.y * this.zoom -
                        newTileSize / mapZoom -
                        zoomOffsetY,
                    (this.width * mapZoom * this.health) / 100,
                    tileSize / 2
                );


            }

            update() {
                this.draw();
                const waypoint = path[this.waypointIndex];

                const yWaypoint = waypoint.y - this.center.y;
                const xWaypoint = waypoint.x - this.center.x;
                const angle = Math.atan2(yWaypoint, xWaypoint);
                this.position.x += Math.cos(angle) / enemySpeed;
                this.position.y += Math.sin(angle) / enemySpeed;
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
            bulletLife: number;
            image: HTMLImageElement;

            constructor({ x = 0, y = 0 }, enemy) {
                this.position = { x: x, y: y };
                this.velocity = { x: 0, y: 0 };
                this.center = {
                    x: this.position.x + newTileSize,
                    y: this.position.y + newTileSize / 2,
                };
                this.radius = 6 * mapZoom;
                this.enemy = enemy;
                this.bulletLife = 500;

                this.image = new Image();
                this.image.src = "";
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
                    this.enemy.center.y - this.position.y / mapZoom,
                    this.enemy.center.x - this.position.x / mapZoom
                );

                this.velocity.x = Math.cos(angle) * bulletSpeed;
                this.velocity.y = Math.sin(angle) * bulletSpeed;

                this.center.x += this.velocity.x;
                this.center.y += this.velocity.y;
                this.bulletLife--;
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
        function spawnEnemies(enemyCount) {
            const enemyImages = [
                "../../images/enemies/Evil-Angel_1_90x90.png",
                "../../images/enemies/Evil-Angel_2_90x90.png",
                "../../images/enemies/golem_1_90x90.png",
                "../../images/enemies/golem_2_90x90.png",
            ];
            for (let i = 1; i < enemyCount + 1; i++) {
                const xOffset =
                    i * Math.floor(Math.random() * (300 - 100 + 1) + 100) +
                    newTileSize * 2;
                enemiesArray.push(
                    new Enemey({ x: path[0].x - xOffset, y: path[0].y }, enemyImages)
                );
            }
        }

        function drawHearts(playerHealth) {
            playerHealthHearts.innerHTML = "";
            for (let i = 1; i <= playerHealth; i++) {
                if (i <= playerHealth) {
                    playerHealthHearts.insertAdjacentHTML(
                        "beforeend",
                        '<img src="../images/icons/Full Heart 12x12.png">'
                    );
                } else {
                    playerHealthHearts.insertAdjacentHTML(
                        "beforeend",
                        '<img src="../images/icons/Empty Heart 12x12.png">'
                    );
                }
            }
        }

        drawHearts(playerHealth);
        spawnEnemies(enemyCount);

        // Animation function (Recursion)
        function animate() {
            const animationFrame = requestAnimationFrame(animate);
            if (gamePaused) {
                cancelAnimationFrame(animationFrame);
            }
            if (!canvas) throw new Error("[Canvas] Game Error");
            if (!ctx) throw new Error("[Canvas-ctx] Game Error");
            ctx.clearRect(0,0,canvas.width, canvas.height)

            // ctx.drawImage(mapImage, 0, 0);

            if (waveCount === 10) {
                console.log("Congratulations!");
                gameOver.innerText = "Congratulations! You saved the village!";
                gameOver.style.fontSize = "30px";
                gameOver.style.display = "flex";
                uiIconsContainer.style.display = "none";
                replayBtn.style.display = "flex";
                cancelAnimationFrame(animationFrame);
            }

            for (let i = enemiesArray.length - 1; i >= 0; i--) {
                const enemy = enemiesArray[i];
                enemy.update();
                if (enemy.position.x * mapZoom > canvas.width) {
                    playerHealth -= 1;
                    drawHearts(playerHealth);
                    enemiesArray.splice(i, 1);

                    if (playerHealth === 0) {
                        console.log("Game Over");
                        gameOver.style.display = "flex";
                        uiIconsContainer.style.display = "none";
                        replayBtn.style.display = "flex";
                        cancelAnimationFrame(animationFrame);
                    }
                }

                if (enemiesArray.length === 0) {
                    spawnEnemies(enemyCount);
                }
            }

            placementTowersArray.forEach((tower) => {
                tower.update(mousePos);
            });

            towersArray.forEach((tower) => {
                tower.update();
                tower.target = null;
                const validEnemies = enemiesArray.filter((enemy) => {
                    const xDistance = enemy.center.x - tower.center.x / mapZoom;
                    const yDistance = enemy.center.y - tower.center.y / mapZoom;
                    const distance = Math.floor(Math.hypot(xDistance, yDistance));
                    return distance < enemy.radius + tower.radius / mapZoom;
                });
                tower.target = validEnemies[0];

                for (let i = tower.bullets.length - 1; i >= 0; i--) {
                    const bullet = tower.bullets[i];
                    bullet.update();

                    if (bullet.bulletLife <= 0) {
                        tower.bullets.splice(i, 1);
                    }

                    const xDistance =
                        bullet.enemy.center.x - bullet.center.x / mapZoom;
                    const yDistance =
                        bullet.enemy.center.y - bullet.center.y / mapZoom;
                    const distance = Math.floor(Math.hypot(xDistance, yDistance));
                    if (
                        distance <
                        bullet.enemy.radius / mapZoom + bullet.radius
                    ) {
                        bullet.enemy.health -= bulletPower;
                        if (bullet.enemy.health <= 0) {
                            const enemyIndex = enemiesArray.findIndex(
                                (enemy) => {
                                    return bullet.enemy === enemy;
                                }
                            );

                            if (enemyIndex > -1) {
                                score += 10;
                                coins += Math.floor(
                                    Math.random() * (16 - 10 + 1 + 10)
                                );
                                playerCoins.innerText = coins;
                                scoreAmount.innerText = score;
                                enemiesArray.splice(enemyIndex, 1);
                            }
                        }

                        if (enemiesArray.length === 0) {
                            enemyCount += 2;
                            waveCount += 1;
                            waveNumber.innerText = waveCount;
                            if (bulletPower > 2) {
                                bulletPower -= 1;
                            }
                            spawnEnemies(enemyCount);
                        }

                        tower.bullets.splice(i, 1);
                    }
                }
            });

        }

        // Monitor mouse event "move" to catch the coordinats and use it to find elements inside the canvas

        pauseBtnContainer.addEventListener("click", (event) => {
            if (!gamePaused) {
                gameOver.innerText = "Paused!";
                gameOver.style.display = "flex";
                pauseBtnIcon.setAttribute(
                    "src",
                    "../images/icons/play 96x96.png"
                );
                gamePaused = true;
            } else {
                gameOver.innerText = "GAME OVER";
                gameOver.style.display = "none";
                pauseBtnIcon.setAttribute(
                    "src",
                    "../images/icons/pause 96x96.png"
                );
                gamePaused = false;
                animate();
            }
        });

        canvas.addEventListener("click", (event) => {
            if (activePlacement && !activePlacement.used && coins >= 35) {
                coins -= 35;
                playerCoins.innerText = coins;
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
            mousePos.x = event.clientX - mainContainer.offsetLeft;
            mousePos.y = event.clientY - mainContainer.offsetTop;

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

        animate();
    } catch (error) {
        console.error(error);
    }
}
