"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var towerModel_1 = require("../towers/towerModel");
var enemyModel_1 = require("../enemy/enemyModel");
var userModel_1 = require("../users/userModel");
var GameSchema = new mongoose_1.Schema({
    player: userModel_1.UserSchema,
    score: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    towers: [towerModel_1.TowerSchema],
    enemies: [enemyModel_1.EnemySchema]
});
var PlacementTower = /** @class */ (function () {
    function PlacementTower(_a) {
        var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
        this.position = { x: x, y: y };
        this.size = newTileSize;
        this.color = "rgba(128,0,128,0.2)";
        this.used = false;
        this.radius = 70 * mapZoom;
        this.width = newTileSize;
        this.height = newTileSize;
        this.center = { x: this.position.x + this.width, y: this.position.y + this.height / 2 };
    }
    PlacementTower.prototype.draw = function () {
        if (!ctx)
            throw new Error("[Canvas-ctx] Game Error");
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    };
    PlacementTower.prototype.update = function (mousePos) {
        this.draw();
        if (mousePos.x > this.position.x &&
            mousePos.x < this.position.x + this.size &&
            mousePos.y > this.position.y &&
            mousePos.y < this.position.y + this.size) {
            if (!ctx)
                throw new Error("[Canvas-ctx] Game Error");
            ctx.beginPath();
            ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.2)";
            ctx.fill();
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
        this.width = newTileSize;
        this.height = newTileSize;
        this.waypointIndex = 0;
        this.zoom = mapZoom;
        this.radius = newTileSize;
        this.health = 100;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        };
    }
    Enemey.prototype.draw = function () {
        if (!ctx)
            throw new Error("[Canvas-ctx] Game Error");
        ctx.fillStyle = "purple";
        ctx.beginPath();
        ctx.arc(this.center.x * this.zoom, this.center.y * this.zoom, this.radius, 0, Math.PI * 2);
        ctx.fill();
        // Enemy Health Bar
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x * this.zoom, this.position.y * this.zoom - newTileSize / mapZoom, this.width * mapZoom, tileSize / 2);
        ctx.fillStyle = "green";
        ctx.fillRect(this.position.x * this.zoom, this.position.y * this.zoom - newTileSize / mapZoom, (this.width * mapZoom * this.health) / 100, tileSize / 2);
    };
    Enemey.prototype.update = function () {
        this.draw();
        var waypoint = path[this.waypointIndex];
        var yWaypoint = waypoint.y - this.center.y;
        var xWaypoint = waypoint.x - this.center.x;
        var angle = Math.atan2(yWaypoint, xWaypoint);
        this.position.x += Math.cos(angle) / enemySpeed;
        this.position.y += Math.sin(angle) / enemySpeed;
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
var Tower = /** @class */ (function () {
    function Tower(_a) {
        var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
        this.position = { x: x, y: y };
        this.width = newTileSize * 2;
        this.height = newTileSize;
        this.bullets = [];
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        };
        this.radius = 70 * mapZoom;
        this.target;
        this.frames = 0;
    }
    Tower.prototype.draw = function () {
        if (!ctx)
            throw new Error("[Canvas-ctx] Game Error");
        ctx.fillStyle = "green";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
    Tower.prototype.update = function () {
        this.draw();
        this.frames++;
        if (this.frames % 100 === 0 && this.target) {
            this.bullets.push(new Bullet({ x: this.position.x, y: this.position.y }, this.target));
        }
    };
    return Tower;
}());
var Bullet = /** @class */ (function () {
    function Bullet(_a, enemy) {
        var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
        this.position = { x: x, y: y };
        this.velocity = { x: 0, y: 0 };
        this.center = {
            x: this.position.x + newTileSize,
            y: this.position.y + newTileSize / 2
        };
        this.radius = 6 * mapZoom;
        this.enemy = enemy;
        this.bulletLife = 500;
        this.image = new Image();
        this.image.src = "";
    }
    Bullet.prototype.draw = function () {
        if (!ctx)
            throw new Error("[Canvas-ctx] Game Error");
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    };
    Bullet.prototype.update = function () {
        this.draw();
        var angle = Math.atan2(this.enemy.center.y - this.position.y / mapZoom, this.enemy.center.x - this.position.x / mapZoom);
        this.velocity.x = Math.cos(angle) * bulletSpeed;
        this.velocity.y = Math.sin(angle) * bulletSpeed;
        this.center.x += this.velocity.x;
        this.center.y += this.velocity.y;
        this.bulletLife--;
    };
    return Bullet;
}());
var GameModel = mongoose_1["default"].model("game", GameSchema);
exports["default"] = GameModel;
