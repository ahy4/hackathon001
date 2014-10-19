;(function ($) {
    $.fn.alertwindow = function () { 
        /* 本来の引数はmsg, buttonOption, titleMsg, mainColor, callback
         * 
         * msg: 警告文として表示したい文字列またはhtml
         * buttonOption: 表示するボタンの種類。y/n, ok, none, またはボタン内に表示したい任意の文字列
         * titleMsg: ダイアログに表示されるタイトル。デフォルトは"警告"　省略可
         * mainColor: cssで使えるカラーコード等。省略可
         * callback: コールバック関数。引数が２つのときのみ省略可。
         */


        var msg, buttonOption, titleMsg, mainColor, callback;
        switch (arguments.length) {
            case 2:
                msg = arguments[0];
                buttonOption = arguments[1];
                callback = function(){};
                break;
            case 3:
                msg = arguments[0];
                buttonOption = arguments[1];
                callback = arguments[2];
                break;
            case 4:
                msg = arguments[0];
                buttonOption = arguments[1];
                titleMsg = arguments[2];
                callback = arguments[3];
                break;
            case 5:
                msg = arguments[0];
                buttonOption = arguments[1];
                titleMsg = arguments[2];
                mainColor = arguments[3];
                callback = arguments[4];
                break;
            default:
                console.error(".alertwindow()の引数の数が不正です");
                break;
        }
        var buttonHtml;
        switch (buttonOption) {
            case "y/n":
            case "y/N":
            case "Y/N":
                buttonHtml = '<button class="alert-button-yes">Yes</button><button class="alert-button-no">No</button>';
                mainColor = mainColor || "#FC8D49";
                break;
            case "ok":
            case "Ok":
            case "OK":
                buttonHtml = '<button class="alert-button-ok">OK</button>';
                mainColor = mainColor || "#FC8D49";
                break;
            case "none":
            case "None":
            case "NONE":
                buttonHtml = '';
                mainColor = mainColor || "#49D7FC";
                break;
            default:
                buttonHtml = '<button class="alert-button-plain">' + buttonOption + '</button>';
                mainColor = mainColor || "#49D7FC";
                break;
        }

        $('body').append(
            '<div class="alert-layer"></div>' +
            '<div class="alert-box">' +
                '<div class="alert-title">' + (titleMsg || "確認") + '</div>' +
                '<div class="alert-contents">' +
                    '<p>' + msg + '</p>' +
                    '<p>' +
                        buttonHtml +
                    '</p>' +
                '</div>' +
            '</div>'
        );
        /*
        .alert-layer
          .alert-box
            .alert-title 確認
            .alert-contents
              %p この記事を削除しますか？
              %p
                %button.alert-button-yes Yes
                %button.alert-button-no No

        */

        $('.alert-layer').css({
            "position": "fixed",
            "top": 0,
            "right": 0,
            "left": 0,
            "bottom": 0,
            "background": "rgba(0,0,0, 0.5)",
            "opacity": 0,
            "visibility": "hidden",
            "z-index": 10000,
            "-moz-transition-property": "opacity",
            "-o-transition-property": "opacit",
            "-webkit-transition-property": "opacity",
            "transition-property": "opacity",
            "-moz-transition-duration": "200ms",
            "-o-transition-duration": "200ms",
            "-webkit-transition-duration": "200ms",
            "transition-duration": "200ms"
        });
        $('.alert-box').css({
            "position": "fixed",
            "z-index": 10001,
            "top": "50%",
            "left": "50%",
            "-moz-transform": "translateX(-50%) translateY(-50%)",
            "-ms-transform": "translateX(-50%) translateY(-50%)",
            "-o-transform": "translateX(-50%) translateY(-50%)",
            "-webkit-transform": "translateX(-50%) translateY(-50%)",
            "transform": "translateX(-50%) translateY(-50%)",
            "min-width": "350px",
            "padding": "30px",
            "background": "#fff",
            "text-align": "center",
            "border-radius": "50%",
            "border-top": "2px solid " + mainColor,
            "border-bottom": "2px solid " + mainColor,
            "font-family": 'Verdana, Roboto, "Droid Sans", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, sans-serif',
            "visibility": "hidden",
            "opacity": 0
        });
        $('.alert-title').css({
            "padding-bottom": "0.62em",
            "margin-bottom": "25px",
            "font-size": "24px",
            "font-weight": "bold",
            "color": mainColor,
            "border-bottom": "1px solid " + mainColor
        });
        $('.alert-contents button').css({
            "padding": "12px 24px",
            "background": "#444",
            "font-size": "16px",
            "color": "#fff",
            "border": "3px solid #AFEC21",
            "border-radius": "5px",
            "margin": "20px auto 0"
        });
        $('.alert-contents button:hover').css({
            "background": "#888"
        });
        $('.alert-button-yes').css({
            "border-color": "#3ED4DB",
            "margin-right": "20px"
        });
        $('.alert-button-no').css({
            "border-color": "#D86060",
            "margin-left": "20px"
        });

/*

        $('.alert-contents button').hover(function (e) {
            var $target = e.currentTarget.className ? $("." + e.currentTarget.className) : $('.alert-contents button');
            $target.css({
                "background": "#888"
            });
        }, function (e) {
            var $target = e.currentTarget.className ? $("." + e.currentTarget.className) : $('.alert-contents button');
            $target.css({
                "background": "#444"
            });
        });
*/

        var alertMode = true;

        $('.alert-layer, .alert-box').css({
            "visibility": "visible",
            "opacity": 1
        });

        $('.alert-layer, .alert-contents button').on("click", function (e) {
            console.log($(e.target).attr('class'));
            if (alertMode) {
                if (e.currentTarget.localName == "button" && $(e.target).attr('class') != "alert-button-no")
                    callback(e.currentTarget.className.substr(13));
                alertMode = false;
            }

            $('.alert-layer, .alert-box').css("opacity", 0);
            setTimeout(function () {
                $('.alert-layer, .alert-box').css("visibility", "hidden");
            }, 200);
            $('.alert-layer, .alert-box').remove();

        });
    }
})(jQuery);