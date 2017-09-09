//商品放大镜效果
window.addEventListener("load", function () {
    //获取元素
    var sBox = $(".smallbox");
    var bBox = $(".bigbox");
    var mask = $(".mask");
    var bigimg = $(".bigbox>img");
    //鼠标进入小图片,放大镜显示 并跟随移动
    sBox.mouseenter(function () {
        mask.show();
        bBox.show();
    });
    //离开隐藏
    bBox.mouseleave(function () {
        mask.hide();
        bBox.hide();
    });

    //鼠标在小盒子里移动 mask跟随
    bBox.mousemove(function (event) {
        event = event||window.event;
        //获取鼠标在页面的位置
        var pagey = event.pageY||scroll().top+event.clientY;
        var pagex = event.pageX||scroll().left+event.clientX;
        //获取小盒子的位置
        var smally = sBox.offset().top;
        var smallx = sBox.offset().left;
        //获取鼠标在盒子中坐标
        var yy = pagey-smally;
        var xx = pagex-smallx;
        //获取放大镜大小的一半
        var maskw = mask.width()/2;
        var maskh = mask.height()/2;
        //鼠标坐标-mask坐标的一半 让放大镜居中
        var y= yy-maskh;
        var x= xx-maskw;

        //限制放大镜的位置
        if(x<0){
            x=0;
        }
        if(x>sBox.width()-mask.width()){
            x=sBox.width()-mask.width();
        }
        if(y<0){
            y=0;
        }
        if(y>sBox.height()-mask.height()){
            y=sBox.height()-mask.height();
        }
        //给放大镜赋值
        mask[0].style.left=x+"px";
        mask[0].style.top=y+"px";

        //让大图片跟随移动
        //比例：大图片将移动的距离/放大镜移动的距离=（大图片-大盒子）/（小盒子-放大镜）；
        //求大图片将移动的距离 = （大图片-大盒子）/（小盒子-放大镜）*放大镜移动的距离
        var bigimgx = (bigimg.width()-bBox.width())/(sBox.width()-mask.width())*x;
        var bigimgy = (bigimg.height()-bBox.height())/(sBox.height()-mask.height())*y;

        //赋值
        bigimg[0].style.marginTop = -bigimgy+"px";//没有定位 用margin
        bigimg[0].style.marginLeft = -bigimgx+"px";
    })

    //点击小红包缓动隐藏，大红包缓动显示
    $(".hongbao").click(function () {
        $(this).stop().animate({left:-100},500, function () {
            $(".hongbaobig").animate({left:0},500);
        });
    })
    //点击大红包隐藏 小红包显示、
    $(".hongbaobig").click(function () {
        $(this).stop().animate({left:-135},500, function () {
            $(".hongbao").animate({left:0},500);
        });
    })

    //鼠标移入li切换图片
    //添加li效果
    $(".yulan li").mouseenter(function () {
        $(this).find("img").stop().animate({"width":72,"height":89,"opacity":1},100);
        $(this).siblings("li").find("img").stop().animate({"width":62,"height":79,"opacity":.4},100);
        $(".smallbox img")[0].src="img/da/b"+$(this).index()+".png";
        $(".bigbox img")[0].src="img/big/bigImg"+$(this).index()+".png";
        //$(this).siblings("li").find("img").attr({"opacity":0.5});
    });


    //点击尺码。添加类样式，其他的取消
    $(".chima li").click(function () {
        $(this).addClass("current").siblings("li").removeClass("current");
    })

    //点击☆加收藏
    $(".bianma").children(".xx").click(function () {
        $(this).toggleClass("hongxx");
        if($(this).hasClass("hongxx")){
            $(this).next("span").css("color","red");
        }else{
            $(this).next("span").css("color","#bcb7ba");
        }
    })


    //倒计时
    //设置未来时间
    var futureTime = new Date("2017-7-15 18:30:00");
    var timer=null;
    var str ="";
    clearInterval(timer);
    function setTime() {
        var nowTime = new Date();
        //计算时间差
        var cha = futureTime-nowTime;
        if(cha<=0){
            str = "下课啦!";
            $(".time").html(str);
            clearInterval(timer);
        }
        var tian = parseInt(cha / 1000 / 60 / 60 / 24);//根据毫秒 转成成整天数
        //console.log(tian);//144

        var hour = parseInt(cha / 1000 / 60 / 60 % 24);//整小时数
        //console.log(hour);

        var min = parseInt(cha / 1000 / 60 % 60);//分钟数
        //console.log(min);

        var sec = parseInt(cha / 1000 % 60);//整秒数
        //console.log(sec);

        //var ms = cha % 1000;
        //console.log(ms);

        str = "距离放学:"+tian + "天" + zero(hour) + "小时" + zero(min) + "分" + zero(sec)+"秒";
        $(".time").html(str);
    }
    //定时器会1秒钟之后执行，所以先调用一次。
    setTime();
    timer = setInterval(setTime,1000);
    //小时分钟秒补零
    function zero(m) {
        return m < 10 ? "0" + m : m
    }

    //选择颜色区域 ，鼠标滑动改变边框颜色
    $(".commodity-right-center .color ").find("li").mouseenter(function () {
        $(this).removeClass("color-current").siblings("li").addClass("color-current");
    })
    //移除恢复默认
    $(".commodity-right-center .color ").mouseleave(function () {
        $(this).find("li").removeClass("color-current").siblings("li").removeClass("color-current");
    })

    //点击+号 增加数量
    var num = 1;
    $(".push").click(function () {
        num++;
        if(num > 99){
            num = 99;
            alert("木有库存了 还点啊！！");
            return;
        }else{
            $(".jj-2").html(num);
        }

    })
    $(".pop").click(function () {
        num--;
        if(num<=0){
            num=0;
            $(".jj-2").html("-");
        }else{
            $(".jj-2").html(num);
        }
        //取消文字选中状态
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

    })

    //商品区tab切换
    $(".main-nav li").mouseenter(function () {
        $(this).addClass("current").siblings("li").removeClass("current");
    });
    //点击跳到该楼层
    $(".main-nav .f1").click(function () {
        var y = $(".commodity-size").offset().top;
        $("body").animate({scrollTop:y},500);
    })
    $(".main-nav .f2").click(function () {
        var y = $(".FW-question").offset().top;
        $("body").animate({scrollTop:y},500);
    })
    $(".main-nav .f3").click(function () {
        var y = $(".comment").offset().top;
        $("body").animate({scrollTop:y},500);
    })
    //固定tab栏
    var taby =$(".main-nav").offset().top;
    var tabx =$(".main-nav").offset().left;
    $(window).scroll(function () {
        //获取tab栏距顶部的位置
        if($(window).scrollTop()>taby){
            $(".main-nav").css({position: "fixed",top: 0,left: tabx+"px","z-index":99,background:"skyblue"});
            $(".commodity-size").css({"margin-top": $(".main-nav").height()});
        }else{
            //否则归零
            $(".main-nav").css({position: "static",background:""});
            $(".commodity-size").css({"margin-top": 0});
        }
    })





    //评论区
    //获取内容
    $("#btn").click(function () {
        //获取用户名文本框内容/和评论框内容
        var uName = $("#userName").val();
        var uTxt = $("#txt").val();
        //创建整个显示评论区的div
        var dvShowpp = $("<div></div>");
        dvShowpp.addClass("show-p clearfloat");
        $(".show").append(dvShowpp);
        //创建显示用户名和头像的div
        var dvName = $("<div class='show-name'><div class='portrait'><img src='img/tx/tx.png'/></div> <div class='mz'></div></div>");
        //判断如果用户名为空，则显示匿名用户
        if(uName == ""){
            uName = "匿名用户";
            dvName.find("img").attr("src","img/tx/default.jpg");
        }
        //给姓名区赋值
        dvName.children(".mz").text(uName);
        //把姓名和头像的div加入到大的div中
        dvShowpp.append(dvName);
        //创建显示评论内容的div
        var time = new Date();
        var year = time.getFullYear();
        var moth = time.getMonth()+1;
        var day = time.getDate();
        var hour = time.getHours();
        var min = time.getMinutes();
        var s= time.getSeconds();
        var dvTxt = $("<div class='show-txt'> <div class='wenzi'></div> <div class='timer'></div></div><span class='del'><a href='javascript:;'>删除</a></span>");

        if(min<10){
            min = "0"+min;
        }
        //给内容区赋值
        dvTxt.children(".wenzi").text(uTxt);
        dvTxt.children(".timer").html(year+"年"+moth+"月"+day+"日"+hour+":"+min+":"+s+" &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp尺码：XXXL 颜色分类：奶白色【喜欢度40%】");

        //把内容区加入到大的div中
        dvShowpp.append(dvTxt);
        //清空输入区内容
        $("#userName").val("");
        $("#txt").val("");
    })

    //点击a标签删除当前评论行
    //$(".del").find("a").click(function () {
    //    $(this).parent().parent().remove();
    //})
    $(".show").on("click","a",function () {
        $(this).parent().parent().remove();
    })

    //返回顶部小火箭代码
    //检测是否显示小火箭
    window.addEventListener("scroll", function () {
        if($(window).scrollTop()>500){
            $(".hj").css({display:"block"});
        }else{
            $(".hj").css({display:""});
        }
    })
    //点击图片，页面滚动到顶部
    //鼠标移入高亮
    $(".hj").mouseenter(function () {
        $(this).find("img").attr({"src":"img/index1.png"});
    })
    //移除变灰色
    //$(".hj").mouseleave(function () {
    //    $(this).find("img").attr({"src":"img/index0.png"});
    //})

    $(".hj").find("img").click(function () {
        $(this).attr({"src":"img/index2.png"});
        $("body").animate({scrollTop:0},600);
        $(".hj").animate({top:"0"},1000, function () {
            $(".hj").css({top:600});
            $(".hj").find("img").attr({"src":"img/index0.png"});
        });
        //var timer=null;
        //var target =0;
        //clearInterval(timer);
        //timer = setInterval(function () {
        //    //获取现在的位置
        //    var leader = parseInt(window.getComputedStyle($(".hj")[0], null).top);
        //    console.log(leader);
        //    //获取步长
        //    var step =(target-leader)/10;
        //    step = step>0?Math.ceil(step):Math.floor(step);
        //    leader +=step;
        //    $(".hj")[0].style.top = leader+"px";
        //    if(Math.abs(target-leader)<=Math.abs(step)){
        //        $(".hj")[0].style.top=target+"px";
        //        clearInterval(timer);
        //    }
        //},30);
    });



})

















