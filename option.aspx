<%@ Page Language="VB" AutoEventWireup="false" CodeFile="option.aspx.vb" Inherits="Common_option" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>option test</title>
    <script src="../JwrJs/base/js/basej.js"></script>
    <script src="../JwrJs/jquery/jquery-3.3.1.js"></script>
    
    <style>
        .option{
            position:relative;
            top:50px;
            width:100%;
            height:40px;
            display:inline-block;
            margin:2px 15px;
            border:1px solid red;
        }
        .option .option.name{
            position:relative;
            margin:0px 8px;
            top: 0px;
            cursor:default;
            cursor:pointer;
            cursor:hand;
            text-align:center;
            /*margin: 0 auto;*/
            width: auto;
            height: 40px;
            line-height: 40px;
            border: 1px solid #ddd;
        }
        .option .option.activeMask{
            position: absolute;
            width:30px;
            height:36px;
            top:0px;
            background-color:rgba(182, 255, 0,0.3);
            border:1px solid green;
            z-index:100;
            cursor:pointer;
            cursor:hand;
            /*display:none;*/
        }
        .option .option.items{
            position:relative;
            left:0px;
            top:0px;
            padding:0px 10px;
            /*display:none;*/
        }
        .option .option.item{
            top:0px;
            margin:2px 0px 2px 10px;
            cursor:pointer;
            cursor:hand;
        }
        .option .option.itemName{
            top:0px;
            height:22px;
        }
        .option .option.itemList{
            position:absolute;
            margin: 0;
            top: 36px;
            display:none;
        }
        .option .option.itemList ul{
            list-style-type:none;
            margin:5px 0px;
            top:0px;
        }
        .option .option.itemList ul li{
            cursor:pointer;
            cursor:hand;
        }
    </style>
    <script>
        var Position = {};
        (function () {
            Position.getAbsolute = function (reference, target) {
                //因为我们会将目标元素的边框纳入递归公式中，这里先减去对应的值
                var result = {
                    left: -target.clientLeft,
                    top: -target.clientTop
                }
                var node = target;
                while(node != reference && node != document){
                    result.left = result.left + node.offsetLeft + node.clientLeft;
                    result.top = result.top + node.offsetTop + node.clientTop;
                    node = node.parentNode;
                }
                if(isNaN(reference.scrollLeft)){
                    result.right = document.documentElement.scrollWidth - result.left;
                    result.bottom = document.documentElement.scrollHeight - result.top;
                }else {
                    result.right = reference.scrollWidth - result.left;
                    result.bottom = reference.scrollHeight - result.top;
                }
                return result;
            }
            Position.getViewport = function (target) {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
                var windowHeight = window.innerHeight || document.documentElement.offsetHeight;
                var windowWidth = window.innerWidth || document.documentElement.offsetWidth;
                var absolutePosi = this.getAbsolute(document, target);
                var Viewport = {
                    left: absolutePosi.left - scrollLeft,
                    top: absolutePosi.top - scrollTop,
                    right: windowWidth - (absolutePosi.left - scrollLeft),
                    bottom: windowHeight - (absolutePosi.top - scrollTop)
                }
                return Viewport;
            }
            Position.isViewport = function (target) {
                var position = this.getViewport(target);
                //这里需要加上元素自身的宽高，因为定位点是元素的左上角
                if(position.left + target.offsetWidth < 0 || position.top + target.offsetHeight < 0){
                    return false;
                }
                if(position.bottom < 0 || position.right < 0){
                    return false;
                }
                return true;
            }
        })();
        $(document).ready(function () {
            //var bj = new basej();
            $('.option.name').on({
                mouseover: function () {
                    //document.getElementsByClassName('.option.name').fns.init()
                    //document.getElementsByClassName('.option.name').fns()
                    //$('.option.name').fns
                    //console.log(Object.prototype)
                    //bj.fn.autoHide($('.option.items'), function () {
                    //    $('.option.items,.option.activeMask').css({ display: 'none' })
                    //});
                    $('.option.items').css({ display: 'inline-block' });
                    var w = $('.option.items').outerWidth();
                    $('.option.items').width(0);
                    $('.option.items').animate({ width: w });
                    console.log(w);
                    //
                }})
            $('.option.item').on({
                mouseover: function () {
                    var point = Position.getAbsolute($('.option')[0], this);
                    $('.option.activeMask').css({display:'block'}).animate({ top: 0, left: point.left, width: $(this).innerWidth() });
                }})
        })
    </script>
</head>
<body>
    <div class="option">
        <div class="option name">站点选择</div>
        <div class="option value"></div>
        <div class="option activeMask"></div>
        <div class="option items">
            <div class="option item">
                <div class="option itemName">裁切站</div>
                <div class="option itemList">
                    <ul class="option ul">
                        <li>A班</li>
                        <li>B班</li>
                    </ul>
                </div>
            </div>
            <div class="option item">
                <div class="option itemName">磨边站</div>
                <div class="option itemList">
                    <ul class="option ul">
                        <li>A班</li>
                        <li>B班</li>
                    </ul>
                </div>
            </div>
            <div class="option item">
                <div class="option itemName">转裁站</div>
                <div class="option itemList">
                    <ul class="option ul">
                        <li>A班</li>
                        <li>B班</li>
                    </ul>
                </div>
            </div>
        </div>

    </div>


    
    <form id="form1" runat="server">
        <div>
        </div>
    </form>
</body>
</html>
