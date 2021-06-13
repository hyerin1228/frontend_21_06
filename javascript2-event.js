// Ex9- 마우스 이벤트 객체 : 박스의 옵셋 영역 좌표 이용하기
window.addEventListener("load", function(){

    var section = document.querySelector("#section9");

    var container = section.querySelector(".container");
    var status = section.querySelector(".status");
    var dragging = false;
    var offset = {x:0, y:0};
    
    // 클릭된 박스를 현재 박스로.
    var current = null;
    var left = container.offsetLeft;
    var top = container.offsetTop;

    // console.log(left) 
    // console.log(top)
    

    container.onmousedown = function(e){
        if(e.target.classList.contains("box")){
            dragging = true;
            current = e.target;
            offset.x = e.offsetX;
            offset.y = e.offsetY;
        }
    };
    
    container.onmousemove = function(e){
        if(!dragging) return;

        var x = e.pageX-offset.x - left;
        var y = e.pageY-offset.y - top;

        //current.style.left = e.pageX-offset.x+"px";
        //current.style.top = e.pageY-offset.y+"px";
        current.style.left = x+"px";
        current.style.top = y+"px";

        status.innerText = "(x, y):("+x+","+y+")";

    };
    
    container.onmouseup = function(e){
        dragging = false;

    };


});// Ex8- 마우스 이벤트 객체 : 여러개 박스 드래그 방식으로 박스 옮기기
window.addEventListener("load", function(){

    var section = document.querySelector("#section8");

    var container = section.querySelector(".container");
    var box = section.querySelector(".box");
    var dragging = false;
    var offset = {x:0, y:0};

    // 클릭된 박스를 현재 박스로.
    var current = null;


    container.onmousedown = function(e){
        if(e.target.classList.contains("box")){
            dragging = true;
            current = e.target;
            offset.x = e.offsetX;
            offset.y = e.offsetY;
        }
    };
    
    container.onmousemove = function(e){
        if(!dragging) return;

        current.style.left = e.pageX-offset.x+"px";
        current.style.top = e.pageY-offset.y+"px";

    };
    
    container.onmouseup = function(e){
        dragging = false;

    };


});

// Ex7- 마우스 이벤트 객체 : 드래그 방식으로 박스 옮기기
window.addEventListener("load", function(){

    var section = document.querySelector("#section7");

    var container = section.querySelector(".container");
    var box = section.querySelector(".box");
    var dragging = false;
    var offset = {x:0, y:0};


    container.onmousedown = function(e){
        if(e.target === box)
            dragging = true;
    };
    
    container.onmousemove = function(e){
        if(!dragging) return;

        box.style.left = e.pageX-offset.x+"px";
        box.style.top = e.pageY-offset.y+"px";

    };
    
    container.onmouseup = function(e){
        dragging = false;

    };

    box.onmousedown = function(e){
        offset.x = e.offsetX;
        offset.y = e.offsetY;
    };

});

// Ex6 - MouseEvent Position
window.addEventListener("load", function(){

    var section = document.querySelector("#section6");

    var container = section.querySelector(".container");
    var box = section.querySelector(".box");

    container.onclick = function(e){
        // e.x , e.y // e.offsetX, e.offsetY / e.clientX, e.pageX ...
        console.log("(x,y):"+e.x+","+e.y);
        console.log("(client x,y):"+e.clientX+","+e.clientY);
        console.log("(page x,y):"+e.pageX+","+e.pageY);
        console.log("(offset x,y):"+e.offsetX+","+e.offsetY);

        // css에서 position이 기본적으로 static으로 되어있고 고정되어서 안됨
        box.style.position = "absolute";
        // e.x가 지금은 숫자인데, css에서 반드시 단위를 표기해주어야 적용됨
        box.style.left = e.x+"px";
        box.style.top = e.y+"px";

    };

});


// Ex5 - Trigger
window.addEventListener("load", function(){

    var section = document.querySelector("#section5");

    var fileButton = section.querySelector(".file-button");
    var fileTriggerButton = section.querySelector(".file-trigger-button");

    fileTriggerButton.onclick = function(){
        // alert("test");

        // 이벤트 준비
        var event = new MouseEvent("click", {
            'view':window,  // 컴포넌트
            'bubbles':true, // 버블링이 가능한지
            'cancelable':true   // 캔슬이 가능한지
        });

        fileButton.dispatchEvent(event);
    };

});

// Ex5-1 - 엘리멘트의 기본 행위 막기
window.addEventListener("load", function(){

    var section = document.querySelector("#section4");

    var tbody = section.querySelector(".notice-list tbody");


    tbody.onclick = function(e){

        e.preventDefault();

        var target = e.target;

        if(target.nodeName != "A")
            return;
        
        
        // document.body.classList.contains("") 지정한 이름이 포함되어있니?
        if(target.classList.contains("sel-button")){
            // var tr = target.parentElement.parentElement
            // 위험부담이 있다. 중첩된 구조에서는 복잡해져서.
            tr.style.background = "yellow";

        }else if(target.classList.contains("edit-button")){

        }else if(target.classList.contains("del-button")){

        }



    };




});


// Ex4 - 서로 다른 기능의 여러 버튼을 가진 화면에서 이벤트를 처리하기
window.addEventListener("load", function(){

    var section = document.querySelector("#section4");

    var tbody = section.querySelector(".notice-list tbody");


    tbody.onclick = function(e){
        var target = e.target;

        if(target.nodeName != "INPUT")
            return;
        
        
        // document.body.classList.contains("") 지정한 이름이 포함되어있니?
        if(target.classList.contains("sel-button")){
            // var tr = target.parentElement.parentElement
            // 위험부담이 있다. 중첩된 구조에서는 복잡해져서.
            tr.style.background = "yellow";

        }else if(target.classList.contains("edit-button")){

        }else if(target.classList.contains("del-button")){

        }



    };




});


// Ex 3-버블링을 이용한 사용자 이벤트 처리하기
window.addEventListener("load", function(){

    var section = document.querySelector("#section3");

    var imgList = section.querySelector(".img-list");
    var addButton = section.querySelector(".add-button");
    var currentImg = section.querySelector(".current-img");
    
    imgList.onclick = function(e){
        console.log("imgList.onclick");
        if(e.target.nodeName != "IMG") return; // 엘리멘트의 태그명 
        
        currentImg.src = e.target.src;

    };

    addButton.onclick = function(e){
        e.stopPropagation();

        console.log("addButton.onclick");
        var img = document.createElement("img");
        img.src = "images/img1.gif";
        currentImg.insertAdjacentElement("afterend", img);

    };



});


// 연습문제 3-1-선택된 레코드 삭제하기:event target
window.addEventListener("load", function(){

    var section = document.querySelector("#section3-1");

    var noticeList = section.querySelector(".notice-iist");
    //var tbodyNode = noticeList.querySelector("tbody");
    var delButton = section.querySelector(".btn-event");
    
    delButton.onclick = function(e){
        //console.log(e.target.nodeName);
        if(e.target.nodeName != "INPUT") return;
        var tr = e.target.parentElement.parentElement;
        tr.remove();
    };



});

// Ex 2-버블링을 이용한 사용자 이벤트 처리하기
window.addEventListener("load", function(){

    var section = document.querySelector("#section2");

    var imgList = section.querySelector(".img-list");
    // var imgs = section.querySelectorAll(".img");
    var currentImg = section.querySelector(".current-img");
    
    imgList.onclick = function(e){
        // console.log("test");
        if(e.target.nodeName != "IMG") return; // 엘리멘트의 태그명 
        
        currentImg.src = e.target.src;

    };



});


// 연습문제 1-선택된 레코드 삭제하기:event target
window.addEventListener("load", function(){

    var section = document.querySelector("#section1-1");

    var noticeList = section.querySelector(".notice-iist");
    //var tbodyNode = noticeList.querySelector("tbody");
    var delButton = section.querySelectorAll(".del-button");
    
    // 버튼 누르면 상위 부모 td 찾고, 그 부모의 tr찾아서 지워야함.
    for(var i=0; i<delButton.length; i++){
        delButton[i].onclick = function(e){
            console.log(e.target);
            var target = e.target;
            console.log(target.parentElement.parentElement);
            target.parentElement.parentElement.remove();
            //target.parentElement.parentElement.remove();
        };
    }



});

// Ex 1-선택된 이미지 보여주기:event target
window.addEventListener("load", function(){

    var section = document.querySelector("#section1");

    var imgs = section.querySelectorAll(".img");
    var currentImg = section.querySelector(".current-img");
    

    // imgs[0].onclick = function(e){
    //     // console.log(e.target.nodeName);
    // };
    
    // 이렇게 작성하면 메모리의 문제 이슈가 발생됨.
    for(var i=0; i<imgs.length; i++){
        imgs[i].onclick = function(e){
            currentImg.src = e.target.src;
        }
    }

    // 숙제?..



});