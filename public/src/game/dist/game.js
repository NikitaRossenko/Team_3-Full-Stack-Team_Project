function game() {
    try {
        var activePlacement_1 = undefined;
        var mapZoom_1 = 2;
        var tileSize_1 = 12;
        var newTileSize_1 = mapZoom_1 * tileSize_1;
        var monsterSpeed_1 = 4;
        var bulletSpeed_1 = 2;
        var bulletPower_1 = newTileSize_1 / 6;
        var mousePos_1 = { x: undefined, y: undefined };
        var enemiesArray_1 = [];
        var placementTowers2d = [];
        var placementTowersArray_1 = [];
        var towersArray_1 = [];
        var canvas_1 = document.querySelector("canvas");
        var ctx_1 = canvas_1 === null || canvas_1 === void 0 ? void 0 : canvas_1.getContext("2d");
        if (!canvas_1)
            throw new Error("[Canvas] Game Error");
        if (!ctx_1)
            throw new Error("[Canvas-ctx] Game Error");
        // Canvas fill is optional if using a background image
        ctx_1.fillStyle = "white";
        // If using a background image this fill is optional
        ctx_1.fillRect(0, 0, canvas_1.width, canvas_1.height);
        // Need to declare a new image (which will create an img element) - canvas need to receive a img element
        var mapImage_1 = new Image();
        // Set the canvas Width and Height
        if (mapZoom_1 === 1.5) {
            canvas_1.width = 1260;
            canvas_1.height = 720;
            mapImage_1.src =
                "../../images/maps/Road-Of-Glory-peaceful-Map_1260x720x1.5.png";
        }
        else if (mapZoom_1 === 2) {
            canvas_1.width = 1680;
            canvas_1.height = 960;
            mapImage_1.src =
                "../../images/maps/Road-Of-Glory-peaceful-Map_1680x960x2.0.png";
        }
        else {
            throw new Error("Resolution Error!");
        }
        // Convert Towers coordinats to 2d
        for (var i = 0; i < placementTowers.length; i += 70) {
            placementTowers2d.push(placementTowers.slice(i, i + 70));
        }
        var PlacementTower_1 = /** @class */ (function () {
            function PlacementTower(_a) {
                var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
                this.position = { x: x, y: y };
                this.size = newTileSize_1;
                this.color = "rgba(128,0,128,0.2)";
                this.used = false;
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
                    this.color = "rgba(128,0,128,1)";
                }
                else {
                    this.color = "rgba(128,0,128,0.2)";
                }
            };
            return PlacementTower;
        }());
        var Enemey = /** @class */ (function () {
            function Enemey(_a) {
                var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
                this.position = { x: x, y: y };
                this.width = newTileSize_1;
                this.height = newTileSize_1;
                this.waypointIndex = 0;
                this.zoom = mapZoom_1;
                this.radius = newTileSize_1;
                this.health = 100;
                this.center = {
                    x: this.position.x + this.width / 2,
                    y: this.position.y + this.height / 2
                };
            }
            Enemey.prototype.draw = function () {
                if (!ctx_1)
                    throw new Error("[Canvas-ctx] Game Error");
                ctx_1.fillStyle = "purple";
                ctx_1.beginPath();
                ctx_1.arc(this.center.x * this.zoom, this.center.y * this.zoom, this.radius, 0, Math.PI * 2);
                ctx_1.fill();
                // Enemy Health Bar
                ctx_1.fillStyle = "red";
                ctx_1.fillRect(this.position.x * this.zoom, this.position.y * this.zoom - 6, this.width * mapZoom_1, tileSize_1 / mapZoom_1);
                ctx_1.fillStyle = "green";
                ctx_1.fillRect(this.position.x * this.zoom, this.position.y * this.zoom - 6, (this.width * mapZoom_1 * this.health) / 100, tileSize_1 / mapZoom_1);
            };
            Enemey.prototype.update = function () {
                this.draw();
                var waypoint = path[this.waypointIndex];
                var yWaypoint = waypoint.y - this.center.y;
                var xWaypoint = waypoint.x - this.center.x;
                var angle = Math.atan2(yWaypoint, xWaypoint);
                this.position.x += Math.cos(angle) / monsterSpeed_1;
                this.position.y += Math.sin(angle) / monsterSpeed_1;
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
        }());
        var Tower_1 = /** @class */ (function () {
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
                ctx_1.beginPath();
                ctx_1.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
                ctx_1.fillStyle = "rgba(255,255,255,0.2)";
                ctx_1.fill();
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
        var Bullet_1 = /** @class */ (function () {
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
        // Create enemies with X coordinats offset
        for (var i = 0; i < 10; i++) {
            var xOffset = i * (Math.random() * (200 - 100 + 1) + 100);
            enemiesArray_1.push(new Enemey({ x: path[0].x - xOffset, y: path[0].y }));
        }
        // Animation function (Recursion)
        function animate() {
            requestAnimationFrame(animate);
            if (!ctx_1)
                throw new Error("[Canvas-ctx] Game Error");
            ctx_1.drawImage(mapImage_1, 0, 0);
            enemiesArray_1.forEach(function (enemy) {
                enemy.update();
            });
            placementTowersArray_1.forEach(function (tower) {
                tower.update(mousePos_1);
            });
            towersArray_1.forEach(function (tower) {
                tower.update();
                tower.target = null;
                var validEnemies = enemiesArray_1.filter(function (enemy) {
                    var xDistance = enemy.center.x - tower.center.x / mapZoom_1;
                    var yDistance = enemy.center.y - tower.center.y / mapZoom_1;
                    var distance = Math.hypot(xDistance, yDistance);
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
                    var distance = Math.hypot(xDistance, yDistance);
                    if (distance <
                        bullet.enemy.radius / mapZoom_1 + bullet.radius) {
                        bullet.enemy.health -= bulletPower_1;
                        if (bullet.enemy.health <= 0) {
                            var enemyIndex = enemiesArray_1.findIndex(function (enemy) {
                                return bullet.enemy === enemy;
                            });
                            if (enemyIndex > -1) {
                                enemiesArray_1.splice(enemyIndex, 1);
                            }
                        }
                        tower.bullets.splice(i, 1);
                    }
                };
                for (var i = tower.bullets.length - 1; i >= 0; i--) {
                    _loop_1(i);
                }
            });
        }
        // Monitor mouse event "move" to catch the coordinats and use it to find elements inside the canvas
        canvas_1.addEventListener("click", function (event) {
            if (activePlacement_1 && !activePlacement_1.used) {
                towersArray_1.push(new Tower_1({
                    x: activePlacement_1.position.x,
                    y: activePlacement_1.position.y
                }));
                activePlacement_1.used = true;
            }
        });
        window.addEventListener("mousemove", function (event) {
            mousePos_1.x = event.clientX - canvas_1.offsetLeft;
            mousePos_1.y = event.clientY - canvas_1.offsetTop;
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
    }
    catch (error) {
        console.error(error);
    }
}
game();
