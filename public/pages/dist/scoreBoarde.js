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
var leaderboard_iso = null;
var local_storage_available = false;
var data = [];
var test_data = "\uD83D\uDC12,Green Monkey,14\n\uD83E\uDD8E,Orange Iguana,13\n\uD83E\uDD9C,Purple Parrot,12\n\uD83D\uDC1F,Blue Barracuda,10\n\uD83D\uDC06,Red Jaguar,9\n\uD83D\uDC0D,Silver Snake,8";
var template = "\n<li class=\"person\">\n\t<p class=\"icon\">{{icon}}</p>\n\t<p class=\"nickname\">{{nickname}}</p>\n\t<p class=\"score\">{{score}}</p>\n\t<ul class=\"point-btns\">\n\t\t<li class=\"point-btn point-btn--5\" data-points-value=\"-5\">-5</li>\n\t\t<li class=\"point-btn point-btn--2\" data-points-value=\"-2\">-2</li>\n\t\t<li class=\"point-btn point-btn--1\" data-points-value=\"-1\">-1</li>\n\t\t<li class=\"point-btn point-btn-1\" data-points-value=\"1\">+1</li>\n\t\t<li class=\"point-btn point-btn-2\" data-points-value=\"2\">+2</li>\n\t\t<li class=\"point-btn point-btn-5\" data-points-value=\"5\">+5</li>\n\t</ul>\n</li>\n";
$(document).ready(function () {
    // check if local storage is available
    // updates `local_storage_available` variable
    // test_local_storage(); // can't use local storage at codepen, chrome fails
    // some button handlers...
    initialize_basic_btn_listeners();
    // intialize isotope plugin
    leaderboard_iso = $('.leaderboard').isotope({
        // options
        itemSelector: '.person',
        layoutMode: 'vertical',
        getSortData: {
            score: '.score parseInt'
        }
    });
    // 1st step:
    // check for data in "URLSearchParams"
    // If the url has data in the query string
    // give priority to this data
    url = new URL((window.location.href));
    query_string = url.searchParams.get("q");
    if (query_string != null) {
        decoded_str = decodeURIComponent(window.atob(query_string));
        data = JSON.parse(decoded_str);
        // save data to local storage
        // refresh without data in the url
        if (local_storage_available) {
            localStorage.setItem('leaderboard_data', JSON.stringify(data));
            window.location.href = [location.protocol, '//', location.host, location.pathname].join('');
        }
        return;
    }
    // 2nd step:
    // check for data in the local storage
    if (local_storage_available) {
        data = JSON.parse(localStorage.getItem('leaderboard_data'));
        // add data to the UI
        if (data != null) {
            build_leaderboard();
        }
        else {
            data = [];
        }
    }
    //  codepen example
    $("#tarea").val(test_data);
    $('.edit-popup .ok').trigger('click');
    $("body").toggleClass("show-edit");
    $('.person .score').last().parent().toggleClass("open");
});
function sort_leaderboard() {
    leaderboard_iso.isotope('updateSortData');
    leaderboard_iso.isotope({ sortBy: "score", sortAscending: false });
}
function initialize_basic_btn_listeners() {
    // adding a new person listeners
    //
    $('.add-person').on('click', function () {
        scroll_to_top_smooth();
        $("body").toggleClass("show-add-person");
        // pick random animal emoji and clear form
        $('#rand-icon').val(emojis[getRandomInt(0, emojis.length)]);
        $('#nickname').val("");
        $('#score').val("");
    });
    $('.add-person-popup .cancel').on('click', function () {
        $("body").toggleClass("show-add-person");
    });
    $('.add-person-popup .ok').on('click', function () {
        var new_person = {
            icon: $('#rand-icon').val(),
            nickname: $('#nickname').val(),
            score: $('#score').val()
        };
        data.push(new_person);
        build_leaderboard();
        $("body").toggleClass("show-add-person");
    });
    // editing
    // 
    $('.edit').on('click', function () {
        scroll_to_top_smooth();
        $("body").toggleClass("show-edit");
        // load data to textarea
        data_str = "";
        data.forEach(function (person) {
            data_str = data_str + (person.icon + "," + person.nickname + "," + person.score + "\n");
        });
        $("#tarea").val(data_str);
    });
    $('.edit-popup .cancel').on('click', function () {
        $("body").toggleClass("show-edit");
    });
    $('.edit-popup .ok').on('click', function () {
        read_data_from_text($('#tarea').val().trim());
        build_leaderboard();
        $("body").toggleClass("show-edit");
    });
    // link sharing
    // 
    $('.link').on('click', function () {
        scroll_to_top_smooth();
        $("body").toggleClass("show-link");
        // load data to textarea
        $("#tarea-link").val(generate_share_link());
        $('#tarea-link').select();
    });
    $('.link-popup .close').on('click', function () {
        $("body").toggleClass("show-link");
    });
}
function initialize_person_btn_listeners() {
    $('.person .score').on('click', function () {
        $(this).parent().toggleClass("open");
    });
    // +/- points buttons
    // also updates data[]
    $('.point-btn').on('click', function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var $li, $score, current_score, points_clicked, target_score;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        $li = $(this).parent().parent();
                        $score = $li.find('.score');
                        current_score = parseInt($score.text());
                        points_clicked = parseInt($(this).attr('data-points-value'));
                        target_score = current_score + points_clicked;
                        if (!(target_score > current_score)) return [3 /*break*/, 5];
                        i = current_score;
                        _a.label = 1;
                    case 1:
                        if (!(i <= target_score)) return [3 /*break*/, 4];
                        $score.text(i);
                        return [4 /*yield*/, sleep(150)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        i = current_score;
                        _a.label = 6;
                    case 6:
                        if (!(i >= target_score)) return [3 /*break*/, 9];
                        $score.text(i);
                        return [4 /*yield*/, sleep(150)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        i--;
                        return [3 /*break*/, 6];
                    case 9:
                        sort_leaderboard();
                        // update data[]
                        data.forEach(function (person) {
                            if ((person.nickname == $li.find('.nickname').text()) && (person.icon == $li.find('.icon').text())) {
                                person.score = target_score;
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    });
}
function build_leaderboard() {
    // remove all current list items
    $('.leaderboard').empty();
    if (data.length == 0)
        return;
    // append all person-list-items
    data.forEach(function (person) {
        $('.leaderboard').append(template.replace(/{{icon}}/gm, person.icon)
            .replace(/{{nickname}}/gm, person.nickname)
            .replace(/{{score}}/gm, person.score));
    });
    // reload isotope
    leaderboard_iso.isotope('reloadItems');
    // save data to local storage
    // localStorage.setItem('leaderboard_data', JSON.stringify(data));
    // add button listeners for score +/-
    initialize_person_btn_listeners();
    sort_leaderboard();
}
function read_data_from_text(data_str) {
    data = [];
    if (data_str == "") {
        return;
    }
    var lines = data_str.split('\n');
    lines.forEach(function (line) {
        tokens = line.split(',');
        data.push({
            icon: tokens[0],
            nickname: tokens[1],
            score: tokens[2]
        });
    });
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generate_share_link() {
    // encode to BASE64 the data object
    base64_str = btoa(encodeURIComponent(JSON.stringify(data)));
    share_url = new URL([location.protocol, '//', location.host, location.pathname].join(''));
    share_url.searchParams.append("q", base64_str);
    return share_url.href;
}
function scroll_to_top_smooth() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
function test_local_storage() {
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        local_storage_available = true;
    }
    catch (e) {
        local_storage_available = false;
    }
}
