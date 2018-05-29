import GameController from './game_controller';
import ('../less/style.less');

var tips = {
    fail: '弹簧弹子每次弹跳都会回血哦~',
    success: '恭喜你成为真男人！赶紧分享给小伙伴吧~'
};

var preloadImg = function () {
    var imgList = [
        '/public/images/spring-up.png'
    ];
    for (var i = 0; i < imgList.length; i++) {
        var _img = new Image();
        _img.src = imgList[i];
    }
};

$(function () {
    var gc = new GameController();
    $('body').show();
    gc.on('gameover', function (e) {
        $('title').text('老子' + gc.floorScore + '层！-是男人就下100层');
        $('.text-score').text(gc.floorScore);

        if (gc.floorScore < 100) {
            $('.game-over .text-desc').text(tips.fail);
        } else {
            $('.game-over .text-desc').text(tips.success);
        }
    });

    $('#start-game').on('click', function () {
        $('.game-intro').hide();
        $('#game-ct').show();
        gc.start();
    });

    $('#restart-game').on('click', function () {
        $('#game-ct').show();
        $('.game-over').hide();
        gc.reRun();
    });

    $('.share-btn').on('click', function () {
        alert('点击右上角分享给好友');
    });
    preloadImg();
});