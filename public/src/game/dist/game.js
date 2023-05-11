function game() {
    try {
        var mapSize_1 = 1.5;
        var monsterSpeed = 200;
        var enemies_1 = [];
        var placementTowersArray_1 = [];
        var canvas_1 = document.querySelector("canvas");
        var ctx_1 = canvas_1 === null || canvas_1 === void 0 ? void 0 : canvas_1.getContext('2d');
        var placementTowers2d = [];
        if (!canvas_1)
            throw new Error("[Canvas] Game Error");
        if (!ctx_1)
            throw new Error("[Canvas-ctx] Game Error");
        // Set the canvas Width and Height
        canvas_1.width = 1260;
        canvas_1.height = 720;
        // Canvas fill is optional if using a background image
        ctx_1.fillStyle = "white";
        // If using a background image this fill is optional
        ctx_1.fillRect(0, 0, canvas_1.width, canvas_1.height);
        // Need to declare a new image (which will create an img element) - canvas need to receive a img element
        var mapImage_1 = new Image();
        mapImage_1.src = "../../images/maps/Road-Of-Glory-peaceful-Map_1260x720.png";
        // Convert Towers coordinats to 2d
        for (var i = 0; i < placementTowers.length; i += 70) {
            placementTowers2d.push(placementTowers.slice(i, i + 70));
        }
        var PlacementTower_1 = /** @class */ (function () {
            function PlacementTower(_a) {
                var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
                this.position = { x: x, y: y };
                this.size = 24;
                this.color = "rgba(128,0,128,0.2)";
                console.log(this.position);
            }
            PlacementTower.prototype.draw = function () {
                if (!ctx_1)
                    throw new Error("[Canvas-ctx] Game Error");
                ctx_1.fillStyle = this.color;
                ctx_1.fillRect(this.position.x, this.position.y, this.size, this.size);
            };
            PlacementTower.prototype.update = function (mousePos) {
                this.draw();
                if (mousePos.x > this.position.x && mousePos.x < this.position.x + this.size && mousePos.y > this.position.y && mousePos.y < this.position.y + this.size) {
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
                this.width = 24;
                this.height = 24;
                this.waypointIndex = 0;
                this.zoom = mapSize_1;
                this.center = { x: this.position.x + this.width / 2, y: this.position.y + this.height / 2 };
            }
            Enemey.prototype.draw = function () {
                if (!ctx_1)
                    throw new Error("[Canvas-ctx] Game Error");
                ctx_1.fillStyle = "purple";
                ctx_1.fillRect(this.position.x * this.zoom, this.position.y * this.zoom, this.width, this.height);
            };
            Enemey.prototype.update = function () {
                this.draw();
                var waypoint = path[this.waypointIndex];
                var yWaypoint = waypoint.y - this.center.y;
                var xWaypoint = waypoint.x - this.center.x;
                var angle = Math.atan2(yWaypoint, xWaypoint);
                this.position.x += Math.cos(angle);
                this.position.y += Math.sin(angle);
                this.center = { x: this.position.x + this.width / 2, y: this.position.y + this.height / 2 };
                if (Math.round(this.center.x) === Math.round(waypoint.x) && Math.round(this.center.y) === Math.round(waypoint.y) && this.waypointIndex < path.length - 1) {
                    this.waypointIndex++;
                }
            };
            return Enemey;
        }());
        placementTowers2d.forEach(function (row, y) {
            row.forEach(function (symbol, x) {
                if (symbol === 1211) {
                    placementTowersArray_1.push(new PlacementTower_1({ x: x * 24, y: y * 24 }));
                }
            });
        });
        // Create enemies with X coordinats offset
        for (var i = 1; i < 10; i++) {
            var xOffset = i * (Math.random() * (600 - 100 + 1) + 100);
            enemies_1.push(new Enemey({ x: path[i].x - xOffset, y: path[i].y }));
        }
        // Animation function (Recursion)
        function animate() {
            requestAnimationFrame(animate);
            if (!ctx_1)
                throw new Error("[Canvas-ctx] Game Error");
            ctx_1.drawImage(mapImage_1, 0, 0);
            enemies_1.forEach(function (enemy) {
                enemy.update();
            });
            placementTowersArray_1.forEach(function (tower) {
                tower.update(mousePos_1);
            });
        }
        // Monitor mouse event "move" to catch the coordinats and use it to find elements inside the canvas
        var mousePos_1 = { x: undefined, y: undefined };
        window.addEventListener('mousemove', function (event) {
            mousePos_1.x = event.clientX - canvas_1.offsetLeft;
            mousePos_1.y = event.clientY - canvas_1.offsetTop;
            console.log(mousePos_1.x, mousePos_1.y);
        });
        animate();
    }
    catch (error) {
        console.error(error);
    }
}
game();
