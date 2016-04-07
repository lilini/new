/**
 * Created by lilini on 2016/4/7.
 */
$(document).ready(function(){
    inintSet();
    scrollSet();
    }
);
function inintSet(){
    $('#main_box li').hover(function(){$(this).addClass('hover')},function(){$(this).removeClass('hover')});
    //设置点击li效果
    $('#main_box li').click(function(){
        if(!$(this).hasClass('current')) {
            var allLi = $('#main_box li');
            var input = $('input[name="org_change"],input[name="org_delete"]');
            if ($(this).hasClass('hoverC')) {
                $(this).removeClass('hoverC');
                input.addClass('Disabled').attr("disabled", "disabled");
            } else {
                allLi.removeClass('hoverC');
                $(this).addClass('hoverC');
                input.removeClass('Disabled').removeAttr("disabled");
            }
        }
    });
    //创建组织事件绑定
    $('input[name="org_create"]').click(function () {
        $('#cover').show();
        $('#create_org').show();
    });
    //关闭事件绑定
    $('.close').click(function () {
        $('#cover').hide();
        $('#create_org').hide();
    });
    $('input[name="cancel"]').click(function(){
        $('#cover').hide();
        $('#create_org').hide();
    });
    //切换处理事件
    $('input[name="org_change"]').click(function(){
        var allLi=$('#main_box li');
        var $htmlSpan = $("<span id='current_sign'>当前</span>");
        $('#change_after').show();
        setTimeout("$('#change_after').hide()",1200);
        allLi.removeClass('current');
        $('#current_sign').remove();
        allLi.each(function(){
            if($(this).hasClass('hoverC')){
                $(this).addClass('current').append($htmlSpan);
            }
        });
    });
}

function scrollSet(){
    var scrMinHeight = 1; //滚动条最小高度
    var scrMaxHeight = 0; //滚动条最大高度
    var scrDefualtTop = 80; //滚动条默认位置
    var scrHeight = 0;
    //初始化滚动条
    function InitScroll() {
        scrMaxHeight = $("#mainScrollContent").height(); //文本框高度
        scrHeight = document.getElementById("mainScrollContent").scrollHeight; //滚动文本高度
        scrHeight = parseInt((scrMaxHeight / scrHeight) * scrMaxHeight);
        if (scrHeight <= scrMinHeight) { scrHeight = scrMinHeight; }
        if (scrHeight >= scrMaxHeight) { $("#scrollContent").hide(); }
        else {
            $("#scrollContent").show();
            $("#scrollContent .tiao_mid").css("height", (scrHeight - 19) + "px");
        }
    }

    $(document).ready(function () {
        $(".bod").height(($(document).height() - 80) + "px");
        $("#mainScrollContent").height(($(document).height() - 125) + "px");
        scrMaxHeight = ($(document).height() - 125); //滚动条最大高度
        $("#scrollBody").height(($(document).height() - 125) + "px");
        $("#scrollBodyBack").height(($(document).height() - 125) + "px");

        InitScroll();
        $("#mainScrollContent").scroll(function () {
            ChangeScroll();
        });
        var y1 = 0;
        $("#scrollContent").mousedown(function (event) {
            var scrContentTop = $("#scrollContent").css("top");
            y1 = event.clientY - parseInt(scrContentTop.replace("px", ""));
            $("#scrollContent").mousemove(function (event) {
                if ((event.clientY - y1) < scrDefualtTop) {
                    $("#scrollContent").css("top", scrDefualtTop + "px");
                }
                else if ((event.clientY - y1) > (scrDefualtTop + scrMaxHeight - scrHeight)) {
                    $("#scrollContent").css("top", (scrDefualtTop + scrMaxHeight - scrHeight) + "px");
                }
                else {
                    $("#scrollContent").css("top", (event.clientY - y1) + "px");
                }
                ChangeScrollContent();
            });
        }).mouseup(function () {
            $("#scrollContent").unbind("mousemove");
        }).mouseout(function () {
            $("#scrollContent").unbind("mousemove");
        });
    });

    //改变滚动内容位置
    function ChangeScrollContent() {
        var scrTop = $("#scrollContent").css("top");
        var st = parseInt(scrTop.replace("px", ""));
        st = ((st - scrDefualtTop) * document.getElementById("mainScrollContent").scrollHeight) / scrMaxHeight
        $("#mainScrollContent").scrollTop(st); //滚动的高度
    }

    //改变滚动条位置
    function ChangeScroll() {
        var scrTop = $("#mainScrollContent").scrollTop(); //滚动的高度
        scrTop = (scrTop * scrMaxHeight) / document.getElementById("mainScrollContent").scrollHeight + scrDefualtTop;
        $("#scrollContent").css("top", scrTop + "px");
    }
}