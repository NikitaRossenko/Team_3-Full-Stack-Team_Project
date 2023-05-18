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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// function delay(milliseconds){
//     console.log("1")
//     return new Promise(resolve => {
//         setTimeout(resolve, milliseconds);
//     });
// }
function game() {
    return __awaiter(this, void 0, void 0, function () {
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
        // Create enemies with X coordinats offset
        function spawnEnemies(enemyCount) {
            var enemyImages = [
                "../../images/enemies/Evil-Angel_1_90x90.png",
                "../../images/enemies/Evil-Angel_2_90x90.png",
                "../../images/enemies/golem_1_90x90.png",
                "../../images/enemies/golem_2_90x90.png",
            ];
            for (var i = 1; i < enemyCount + 1; i++) {
                var xOffset = i * Math.floor(Math.random() * (300 - 100 + 1) + 100) +
                    newTileSize_1 * 2;
                enemiesArray_1.push(new Enemey_1({ x: path[0].x - xOffset, y: path[0].y }, enemyImages));
            }
        }
        function drawHearts(playerHealth) {
            playerHealthHearts_1.innerHTML = "";
            for (var i = 1; i <= playerHealth; i++) {
                if (i <= playerHealth) {
                    playerHealthHearts_1.insertAdjacentHTML("beforeend", '<img src="../images/icons/Full Heart 12x12.png">');
                }
                else {
                    playerHealthHearts_1.insertAdjacentHTML("beforeend", '<img src="../images/icons/Empty Heart 12x12.png">');
                }
            }
        }
        // Animation function (Recursion)
        function animate() {
            var animationFrame = requestAnimationFrame(animate);
            if (gamePaused_1) {
                cancelAnimationFrame(animationFrame);
            }
            if (!canvas_1)
                throw new Error("[Canvas] Game Error");
            if (!ctx_1)
                throw new Error("[Canvas-ctx] Game Error");
            ctx_1.clearRect(0, 0, canvas_1.width, canvas_1.height);
            // ctx.drawImage(mapImage, 0, 0);
            if (waveCount_1 === 2) {
                console.log("Congratulations!");
                gameOver_1.innerText = "Congratulations! You saved the village!";
                gameOver_1.style.fontSize = "30px";
                gameOver_1.style.display = "flex";
                uiIconsContainer_1.style.display = "none";
                replayBtn_1.style.display = "flex";
                cancelAnimationFrame(animationFrame);
                var updateHighscore = fetch("/api/game/increase-highscore", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ score: score_1 })
                });
            }
            for (var i = enemiesArray_1.length - 1; i >= 0; i--) {
                var enemy = enemiesArray_1[i];
                enemy.update();
                if (enemy.position.x * mapZoom_1 > canvas_1.width) {
                    playerHealth_1 -= 1;
                    drawHearts(playerHealth_1);
                    enemiesArray_1.splice(i, 1);
                    if (playerHealth_1 === 0) {
                        console.log("Game Over");
                        gameOver_1.style.display = "flex";
                        uiIconsContainer_1.style.display = "none";
                        replayBtn_1.style.display = "flex";
                        cancelAnimationFrame(animationFrame);
                    }
                }
                if (enemiesArray_1.length === 0) {
                    spawnEnemies(enemyCount_1);
                }
            }
            placementTowersArray_1.forEach(function (tower) {
                tower.update(mousePos_1);
            });
            towersArray_1.forEach(function (tower) {
                tower.update();
                tower.target = null;
                var validEnemies = enemiesArray_1.filter(function (enemy) {
                    var xDistance = enemy.center.x - tower.center.x / mapZoom_1;
                    var yDistance = enemy.center.y - tower.center.y / mapZoom_1;
                    var distance = Math.floor(Math.hypot(xDistance, yDistance));
                    return distance < enemy.radius + tower.radius / mapZoom_1;
                });
                tower.target = validEnemies[0];
                var _loop_1 = function (i) {
                    var bullet = tower.bullets[i];
                    bullet.update();
                    if (bullet.bulletLife <= 0) {
                        tower.bullets.splice(i, 1);
                    }
                    var xDistance = bullet.enemy.center.x - bullet.center.x / mapZoom_1;
                    var yDistance = bullet.enemy.center.y - bullet.center.y / mapZoom_1;
                    var distance = Math.floor(Math.hypot(xDistance, yDistance));
                    if (distance <
                        bullet.enemy.radius / mapZoom_1 + bullet.radius) {
                        bullet.enemy.health -= bulletPower_1;
                        if (bullet.enemy.health <= 0) {
                            var enemyIndex = enemiesArray_1.findIndex(function (enemy) {
                                return bullet.enemy === enemy;
                            });
                            if (enemyIndex > -1) {
                                score_1 += 10;
                                coins_1 += Math.floor(Math.random() * (16 - 10 + 1 + 10));
                                playerCoins_1.innerText = coins_1;
                                scoreAmount_1.innerText = score_1;
                                enemiesArray_1.splice(enemyIndex, 1);
                            }
                        }
                        if (enemiesArray_1.length === 0) {
                            enemyCount_1 += 2;
                            waveCount_1 += 1;
                            waveNumber_1.innerText = waveCount_1;
                            if (bulletPower_1 > 2) {
                                bulletPower_1 -= 1;
                            }
                            spawnEnemies(enemyCount_1);
                        }
                        tower.bullets.splice(i, 1);
                    }
                };
                for (var i = tower.bullets.length - 1; i >= 0; i--) {
                    _loop_1(i);
                }
            });
        }
        var newGame, mainContainer_1, gameOver_1, scene, playBtnContainer, replayBtn_1, playerHealthHearts_1, pauseBtnContainer, pauseBtnIcon_1, uiIconsContainer_1, playerScore, playerCoinsBag, playerCoins_1, scoreAmount_1, wave, waveNumber_1, activePlacement_1, mapZoom_1, enemyCount_1, playerHealth_1, bulletPower_1, gamePaused_1, score_1, coins_1, waveCount_1, zoomOffsetX_1, zoomOffsetY_1, tileSize_1, newTileSize_1, enemySpeed_1, bulletSpeed_1, mousePos_1, enemiesArray_1, placementTowers2d, placementTowersArray_1, towersArray_1, canvas_1, ctx_1, mapImage, i, Sprite, PlacementTower_1, Enemey_1, Tower_1, Bullet_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/game/create-game")];
                case 1:
                    newGame = _a.sent();
                    mainContainer_1 = document.querySelector(".mainContainer");
                    gameOver_1 = document.querySelector("#gameOver");
                    scene = document.querySelector("#scene");
                    playBtnContainer = document.querySelector(".playBtnContainer");
                    replayBtn_1 = document.querySelector("#replayBtn");
                    playerHealthHearts_1 = document.querySelector("#playerHealth");
                    pauseBtnContainer = document.querySelector("#pauseBtnContainer");
                    pauseBtnIcon_1 = document.querySelector("#pauseBtnIcon");
                    uiIconsContainer_1 = document.querySelector(".uiIconsContainer");
                    playerScore = document.querySelector("#playerScore");
                    playerCoinsBag = document.querySelector("#playerCoinsBag");
                    playerCoins_1 = document.querySelector("#playerCoins");
                    scoreAmount_1 = document.querySelector("#scoreAmount");
                    wave = document.querySelector("#wave");
                    waveNumber_1 = document.querySelector("#waveNumber");
                    scene.style.display = "none";
                    replayBtn_1.style.display = "none";
                    activePlacement_1 = undefined;
                    mapZoom_1 = 1.5;
                    enemyCount_1 = 4;
                    playerHealth_1 = 3;
                    bulletPower_1 = 20;
                    gamePaused_1 = false;
                    score_1 = 0;
                    return [4 /*yield*/, fetch("/api/game/get-game-coins")];
                case 2:
                    coins_1 = _a.sent();
                    console.log(coins_1);
                    waveCount_1 = 1;
                    zoomOffsetX_1 = 0;
                    zoomOffsetY_1 = 0;
                    scoreAmount_1.innerText = score_1;
                    playerCoins_1.innerText = coins_1;
                    waveNumber_1.innerText = waveCount_1;
                    tileSize_1 = 12;
                    newTileSize_1 = mapZoom_1 * tileSize_1;
                    enemySpeed_1 = 2;
                    bulletSpeed_1 = 2;
                    mousePos_1 = { x: undefined, y: undefined };
                    enemiesArray_1 = [];
                    placementTowers2d = [];
                    placementTowersArray_1 = [];
                    towersArray_1 = [];
                    canvas_1 = document.querySelector("canvas");
                    if (!canvas_1)
                        throw new Error("[Canvas] Game Error");
                    ctx_1 = canvas_1.getContext("2d");
                    if (!ctx_1)
                        throw new Error("[Canvas-ctx] Game Error");
                    // Canvas fill is optional if using a background image
                    ctx_1.fillStyle = "white";
                    // If using a background image this fill is optional
                    ctx_1.fillRect(0, 0, canvas_1.width, canvas_1.height);
                    mapImage = new Image();
                    // Set the canvas Width and Height
                    if (mapZoom_1 === 1.5) {
                        zoomOffsetX_1 = newTileSize_1;
                        zoomOffsetY_1 = newTileSize_1 * 2;
                        canvas_1.width = 1260;
                        canvas_1.height = 720;
                        mapImage.src =
                            "../../images/maps/Road-Of-Glory-peaceful-Map_1260x720x1.5.png";
                        mainContainer_1.insertAdjacentHTML("beforeend", '<img id="bgImage" src="../../images/maps/Road-Of-Glory-peaceful-Map_1260x720x1.5.png">');
                    }
                    else if (mapZoom_1 === 2) {
                        zoomOffsetY_1 = newTileSize_1;
                        canvas_1.width = 1680;
                        canvas_1.height = 960;
                        mapImage.src =
                            "../../images/maps/Road-Of-Glory-peaceful-Map_1680x960x2.0.png";
                        mainContainer_1.insertAdjacentHTML("beforeend", '<img id="bgImage" src="../../images/maps/Road-Of-Glory-peaceful-Map_1680x960x2.0.png">');
                    }
                    else {
                        throw new Error("Resolution Error!");
                    }
                    wave.style.display = "flex";
                    gameOver_1.style.display = "none";
                    playBtnContainer.style.display = "none";
                    playerHealthHearts_1.style.display = "flex";
                    uiIconsContainer_1.style.display = "flex";
                    playerScore.style.display = "flex";
                    playerCoinsBag.style.display = "flex";
                    // Convert Towers coordinats to 2d
                    for (i = 0; i < placementTowers.length; i += 70) {
                        placementTowers2d.push(placementTowers.slice(i, i + 70));
                    }
                    Sprite = /** @class */ (function () {
                        function Sprite(_a, imgSource, imgFrames) {
                            var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
                            if (imgFrames === void 0) { imgFrames = 1; }
                            this.randomEnemyIndex = Math.floor(Math.random() * (imgSource.length - 1 + 1) + 1);
                            this.position = { x: x, y: y };
                            this.image = new Image();
                            this.image.src = imgSource[this.randomEnemyIndex - 1];
                            this.width = 90;
                            this.height = 90;
                            this.zoom = mapZoom_1;
                            this.imgFrames = imgFrames;
                            this.currentFrame = 0;
                            this.framesTimeout = 0;
                            this.center = {
                                x: this.position.x * this.zoom - newTileSize_1 / mapZoom_1,
                                y: this.position.y * this.zoom - newTileSize_1 / mapZoom_1
                            };
                        }
                        Sprite.prototype.draw = function () {
                            var cropWidth = this.image.width / this.imgFrames;
                            var crop = {
                                position: { x: cropWidth * this.currentFrame, y: 0 },
                                width: cropWidth,
                                height: this.image.height
                            };
                            ctx_1 === null || ctx_1 === void 0 ? void 0 : ctx_1.drawImage(this.image, crop.position.x, crop.position.y, crop.width, crop.height, this.position.x * this.zoom -
                                newTileSize_1 +
                                mapZoom_1 * this.zoom -
                                zoomOffsetX_1, this.position.y * this.zoom -
                                newTileSize_1 +
                                mapZoom_1 * this.zoom -
                                zoomOffsetY_1, crop.width, crop.height);
                            this.framesTimeout++;
                            if (this.framesTimeout % 9 === 0) {
                                this.currentFrame++;
                                if (this.currentFrame >= this.imgFrames) {
                                    this.currentFrame = 0;
                                }
                            }
                        };
                        return Sprite;
                    }());
                    PlacementTower_1 = /** @class */ (function () {
                        function PlacementTower(_a) {
                            var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
                            this.position = { x: x, y: y };
                            this.size = newTileSize_1;
                            this.color = "rgba(128,0,128,0.2)";
                            this.used = false;
                            this.radius = 70 * mapZoom_1;
                            this.width = newTileSize_1;
                            this.height = newTileSize_1;
                            this.center = {
                                x: this.position.x + this.width,
                                y: this.position.y + this.height / 2
                            };
                        }
                        PlacementTower.prototype.draw = function () {
                            if (!ctx_1)
                                throw new Error("[Canvas-ctx] Game Error");
                            ctx_1.fillStyle = this.color;
                            ctx_1.fillRect(this.position.x, this.position.y, this.size, this.size);
                        };
                        PlacementTower.prototype.update = function (mousePos) {
                            this.draw();
                            if (mousePos.x > this.position.x &&
                                mousePos.x < this.position.x + this.size &&
                                mousePos.y > this.position.y &&
                                mousePos.y < this.position.y + this.size) {
                                if (!ctx_1)
                                    throw new Error("[Canvas-ctx] Game Error");
                                ctx_1.beginPath();
                                ctx_1.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
                                ctx_1.fillStyle = "rgba(255,255,255,0.2)";
                                ctx_1.fill();
                                this.color = "rgba(128,0,128,1)";
                            }
                            else {
                                this.color = "rgba(128,0,128,0.2)";
                            }
                        };
                        return PlacementTower;
                    }());
                    Enemey_1 = /** @class */ (function (_super) {
                        __extends(Enemey, _super);
                        function Enemey(_a, enemyImages) {
                            var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
                            var _this = _super.call(this, { x: 0, y: 0 }, enemyImages, 12) || this;
                            _this.position = { x: x, y: y };
                            _this.width = newTileSize_1;
                            _this.height = newTileSize_1;
                            _this.waypointIndex = 0;
                            _this.zoom = mapZoom_1;
                            _this.radius = newTileSize_1;
                            _this.health = 100;
                            _this.center = {
                                x: _this.position.x + _this.width / 2,
                                y: _this.position.y + _this.height / 2
                            };
                            return _this;
                        }
                        Enemey.prototype.draw = function () {
                            if (!ctx_1)
                                throw new Error("[Canvas-ctx] Game Error");
                            _super.prototype.draw.call(this);
                            // Enemy Health Bar
                            ctx_1.fillStyle = "red";
                            ctx_1.fillRect(this.position.x * this.zoom, this.position.y * this.zoom -
                                newTileSize_1 / mapZoom_1 -
                                zoomOffsetY_1, this.width * mapZoom_1, tileSize_1 / 2);
                            ctx_1.fillStyle = "green";
                            ctx_1.fillRect(this.position.x * this.zoom, this.position.y * this.zoom -
                                newTileSize_1 / mapZoom_1 -
                                zoomOffsetY_1, (this.width * mapZoom_1 * this.health) / 100, tileSize_1 / 2);
                        };
                        Enemey.prototype.update = function () {
                            this.draw();
                            var waypoint = path[this.waypointIndex];
                            var yWaypoint = waypoint.y - this.center.y;
                            var xWaypoint = waypoint.x - this.center.x;
                            var angle = Math.atan2(yWaypoint, xWaypoint);
                            this.position.x += Math.cos(angle) / enemySpeed_1;
                            this.position.y += Math.sin(angle) / enemySpeed_1;
                            this.center = {
                                x: this.position.x + this.width / 2,
                                y: this.position.y + this.height / 2
                            };
                            if (Math.round(this.center.x) === Math.round(waypoint.x) &&
                                Math.round(this.center.y) === Math.round(waypoint.y) &&
                                this.waypointIndex < path.length - 1) {
                                this.waypointIndex++;
                            }
                        };
                        return Enemey;
                    }(Sprite));
                    Tower_1 = /** @class */ (function () {
                        function Tower(_a) {
                            var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
                            this.position = { x: x, y: y };
                            this.width = newTileSize_1 * 2;
                            this.height = newTileSize_1;
                            this.bullets = [];
                            this.center = {
                                x: this.position.x + this.width / 2,
                                y: this.position.y + this.height / 2
                            };
                            this.radius = 70 * mapZoom_1;
                            this.target;
                            this.frames = 0;
                        }
                        Tower.prototype.draw = function () {
                            if (!ctx_1)
                                throw new Error("[Canvas-ctx] Game Error");
                            ctx_1.fillStyle = "green";
                            ctx_1.fillRect(this.position.x, this.position.y, this.width, this.height);
                        };
                        Tower.prototype.update = function () {
                            this.draw();
                            this.frames++;
                            if (this.frames % 100 === 0 && this.target) {
                                this.bullets.push(new Bullet_1({ x: this.position.x, y: this.position.y }, this.target));
                            }
                        };
                        return Tower;
                    }());
                    Bullet_1 = /** @class */ (function () {
                        function Bullet(_a, enemy) {
                            var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
                            this.position = { x: x, y: y };
                            this.velocity = { x: 0, y: 0 };
                            this.center = {
                                x: this.position.x + newTileSize_1,
                                y: this.position.y + newTileSize_1 / 2
                            };
                            this.radius = 6 * mapZoom_1;
                            this.enemy = enemy;
                            this.bulletLife = 500;
                            this.image = new Image();
                            this.image.src = "";
                        }
                        Bullet.prototype.draw = function () {
                            if (!ctx_1)
                                throw new Error("[Canvas-ctx] Game Error");
                            ctx_1.beginPath();
                            ctx_1.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
                            ctx_1.fillStyle = "white";
                            ctx_1.fill();
                        };
                        Bullet.prototype.update = function () {
                            this.draw();
                            var angle = Math.atan2(this.enemy.center.y - this.position.y / mapZoom_1, this.enemy.center.x - this.position.x / mapZoom_1);
                            this.velocity.x = Math.cos(angle) * bulletSpeed_1;
                            this.velocity.y = Math.sin(angle) * bulletSpeed_1;
                            this.center.x += this.velocity.x;
                            this.center.y += this.velocity.y;
                            this.bulletLife--;
                        };
                        return Bullet;
                    }());
                    placementTowers2d.forEach(function (row, y) {
                        row.forEach(function (symbol, x) {
                            if (symbol === 1211) {
                                placementTowersArray_1.push(new PlacementTower_1({
                                    x: x * newTileSize_1,
                                    y: y * newTileSize_1
                                }));
                            }
                        });
                    });
                    drawHearts(playerHealth_1);
                    spawnEnemies(enemyCount_1);
                    // Monitor mouse event "move" to catch the coordinats and use it to find elements inside the canvas
                    pauseBtnContainer.addEventListener("click", function (event) {
                        if (!gamePaused_1) {
                            gameOver_1.innerText = "Paused!";
                            gameOver_1.style.display = "flex";
                            pauseBtnIcon_1.setAttribute("src", "../images/icons/play 96x96.png");
                            gamePaused_1 = true;
                        }
                        else {
                            gameOver_1.innerText = "GAME OVER";
                            gameOver_1.style.display = "none";
                            pauseBtnIcon_1.setAttribute("src", "../images/icons/pause 96x96.png");
                            gamePaused_1 = false;
                            animate();
                        }
                    });
                    canvas_1.addEventListener("click", function (event) {
                        if (activePlacement_1 && !activePlacement_1.used && coins_1 >= 35) {
                            coins_1 -= 35;
                            playerCoins_1.innerText = coins_1;
                            towersArray_1.push(new Tower_1({
                                x: activePlacement_1.position.x,
                                y: activePlacement_1.position.y
                            }));
                            activePlacement_1.used = true;
                        }
                    });
                    window.addEventListener("mousemove", function (event) {
                        mousePos_1.x = event.clientX - mainContainer_1.offsetLeft;
                        mousePos_1.y = event.clientY - mainContainer_1.offsetTop;
                        activePlacement_1 = null;
                        for (var i = 0; i < placementTowersArray_1.length; i++) {
                            var placement = placementTowersArray_1[i];
                            if (mousePos_1.x > placement.position.x &&
                                mousePos_1.x < placement.position.x + placement.size &&
                                mousePos_1.y > placement.position.y &&
                                mousePos_1.y < placement.position.y + placement.size) {
                                activePlacement_1 = placement;
                                break;
                            }
                        }
                    });
                    animate();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
