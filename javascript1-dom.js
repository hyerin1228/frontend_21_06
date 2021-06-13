// Ex10-클릭한 컬럼을 기준으로 레코드 정렬하기 #1
window.addEventListener("load", function(){

    var notices = [
        {id:2, title:"가강의-정주행", regDate:"2021-01-16", writerId:"하프", hit:0},
        {id:3, title:"타과제-테스트", regDate:"2021-01-16", writerId:"하프", hit:1}
    ];

    var section = document.querySelector("#section10");
    
    var noticeList = section.querySelector(".notice-list");
    var titleTd = section.querySelector(".title");
    var tbodyNode = noticeList.querySelector("tbody");

    var bindData = function(){
        for (var i = 0; i < notices.length; i++) {
            // alert(i);
            console.log(notices[i]);
            var template = section.querySelector("template");
            var cloneNode = document.importNode(template.content, true);
            var tds = cloneNode.querySelectorAll("td");
            tds[0].textContent = notices[i].id;
            tds[1].innerHTML = '<a href="'+notices[i].id+'">'+notices[i].title+'</a>';
            tds[2].textContent = notices[i].regDate;
            tds[3].textContent = notices[i].writerId;
            tds[4].textContent = notices[i].hit;

            tbodyNode.appendChild(cloneNode);
        }
    };

    bindData();

    var titleSorted = false;

    titleTd.onclick = function(){

        tbodyNode.innerHTML = "";
        
        if(!titleSorted){
            notices.sort(function(a,b){
                titleSorted = true;

                if(a.title < b.title)
                    return -1;
                else if(a.title > b.title)
                    return 1;
                else
                    return 0;
            });
        }else{ 
            notices.reverse();
        }

        bindData();


    };


});

// Ex9-다중 노드선택 방법과 일괄삭제, 노드의 자리바꾸기
window.addEventListener("load", function(){

    var section = document.querySelector("#section9");
    
    var noticeList = section.querySelector(".notice-list");
    var tbody = noticeList.querySelector("tbody");
    var allCheckbox = section.querySelector(".overall-checkbox")
    var delButton = section.querySelector(".del-button");
    var swapButton = section.querySelector(".swap-button");

    allCheckbox.onchange = function(){
        // console.log(allCheckbox.value); // 체크되면 on 체크박스의 value를 아무것도 주지 않으면 기본 on으로 지정
        // console.log(allCheckbox.checked);   // 여부 true, false

        // 1. 노드선택 -- tbody안에 있는 모든 inputs
        var inputs = tbody.querySelectorAll("input[type='checkbox']");
        for(var i = 0; i < inputs.length; i++){
            inputs[i].checked = allCheckbox.checked;
        }

    };
    
    delButton.onclick = function(){
        // 1. 노드 선택, inputs의 체크가 된 노드의 부모를 지우면 됨..
        // 인풋 가져오고 체크된 거 확인하고 그 노드 부모 지우고
        //var inputs = tbody.querySelectorAll("input[type='checkbox']");
        
        // if(inputs[0].checked)
        //    inputs[0].parentElement.parentElement.remove();

        // 인풋박스 전부 가져올 필요가 없다.
        var inputs = tbody.querySelectorAll("input[type='checkbox']:checked");
        // console.log(inputs);
        for(var i = 0; i < inputs.length; i++){
            inputs[i].parentElement.parentElement.remove();
        }


    };
    
    swapButton.onclick = function(){
        // 1. 노드 선택 클릭하면 바뀜
        // 2. 3개 이상, 1개만 선택할때 에러 메시지 안내.

        var inputs = tbody.querySelectorAll("input[type='checkbox']:checked");

        // 2개 미만, 2개 초과
        if(inputs.length != 2){
            alert("엘리먼트는 2개를 선택해야만 합니다.");
            return;
        }

        var trs = [];
        for(var i=0; i<inputs.length; i++){
            trs.push(inputs[i].parentElement.parentElement);
        }

        var cloneNode = trs[0].cloneNode(true);
        trs[1].replaceWith(cloneNode);
        trs[0].replaceWith(trs[1]);

    };


});

// Ex8 : 노드 삽입과 바꾸기
window.addEventListener("load", function(){

    var section = document.querySelector("#section8");
    
    var noticeList = section.querySelector(".notice-list");
    var tbodyNode = noticeList.querySelector("tbody");
    var upButton = section.querySelector(".up-button");
    var downButton = section.querySelector(".down-button");

    var currentNode = tbodyNode.firstElementChild;
    
    downButton.onclick = function(){
        var nextNode = currentNode.nextElementSibling;

        if(nextNode == null){
            alert("더 이상 이동할 수 없습니다.");
            return;
        }

        //tbodyNode.removeChild(nextNode); //-- 삭제하지 않아도 새로 생성이 아님.
        //tbodyNode.insertBefore(nextNode, currentNode);
        currentNode.insertAdjacentElement("beforebegin", nextNode);
    };

    upButton.onclick = function(){
        var prevNode = currentNode.previousElementSibling;

        if(prevNode == null){
            alert("더 이상 이동할 수 없습니다.");
            return;
        }

        //tbodyNode.removeChild(prevNode);
        //tbodyNode.insertBefore
        //tbodyNode.removeChild(currentNode);
        //tbodyNode.insertBefore(currentNode, prevNode);
        currentNode.insertAdjacentElement("afterend", prevNode);
    };




});


// 34강) Ex7-노드 복제와 탬플릿 태그
window.addEventListener("load", function(){
    var notices = [
        {id:2, title:"강의-정주행", regDate:"2021-01-16", writerId:"하프", hit:0},
        {id:3, title:"과제-테스트", regDate:"2021-01-16", writerId:"하프", hit:1}
    ];

    var section = document.querySelector("#section7");

    var noticeList = section.querySelector(".notice-list");
    var tbodyNode = noticeList.querySelector("tbody");
    var cloneButton = section.querySelector(".clone-button");
    var templateButton = section.querySelector(".template-button");


    cloneButton.onclick = function(){
        // tbody 안의 tr들 중에서 하나만 가져옴 무조건 처음거.
        // var trNode = noticeList.querySelector("tbody tr");
        // var tbodyNode = noticeList.querySelector("tbody");

        var cloneNode = trNode.cloneNode(true);

        var tds = cloneNode.querySelectorAll("td");
        tds[0].textContent = notices[0].id;
        tds[1].innerHTML = '<a href="'+notices[0].id+'">'+notices[0].title+'</a>';
        tds[2].textContent = notices[0].regDate;
        tds[3].textContent = notices[0].writerId;
        tds[4].textContent = notices[0].hit;
        

        tbodyNode.append(cloneNode);
    };

    // templateButton.onclick = function(){
    //     var template = section.querySelector("template");
    //     var cloneNode = document.importNode(template.content, true);
    //     var tds = cloneNode.querySelectorAll("td");

    //     tds[0].textContent = notices[0].id;
    //     tds[1].innerHTML = '<a href="'+notices[0].id+'">'+notices[0].title+'</a>';
        
    //     /*
    //     var aNode = tds[1].children[0];
    //     aNode.href = notices[0].id;
    //     aNode.textContent = notices[0].id;
    //     */

    //     tds[2].textContent = notices[0].regDate;
    //     tds[3].textContent = notices[0].writerId;
    //     tds[4].textContent = notices[0].hit;

    //     tbodyNode.appendChild(cloneNode);
    // };

    // 과제용..notices의 데이터 전부 append 하기
    templateButton.onclick = function(){
        
        for (var i = 0; i < notices.length; i++) {
            alert(i);
            console.log(notices[i]);
            var template = section.querySelector("template");
            var cloneNode = document.importNode(template.content, true);
            var tds = cloneNode.querySelectorAll("td");
            tds[0].textContent = notices[i].id;
            tds[1].innerHTML = '<a href="'+notices[i].id+'">'+notices[i].title+'</a>';
            tds[2].textContent = notices[i].regDate;
            tds[3].textContent = notices[i].writerId;
            tds[4].textContent = notices[i].hit;

            tbodyNode.appendChild(cloneNode);
        }

        // tbodyNode.appendChild(cloneNode);

    };


});


// <!-- 32강 - 텍스트 노드를 동적으로 추가/삭제삭제 - appendChild -->
// Ex6-노드조작 : 메뉴추가(createTextNode, Element)
window.addEventListener("load", function(){
    var section = document.querySelector("#section6");

    var titleInput = section.querySelector(".title-input");
    var menuListUl = section.querySelector(".menu-list");
    var addButton = section.querySelector(".add-button");
    var delButton = section.querySelector(".del-button");

    addButton.onclick = function(){
        // 왜? 난 안귀찮은데!

        // 첫번째 방법은 사용하지 않음
        // 그래서.. 이렇게 문자열로 
        // 2. menuListUl.innerHTML = '<li><a href="">'+title+'</a></li>';
        // 두번째의 방법은 대입이 되어 아예 대치됨.
        // 그래서 += 로 하니 잘 되지만 내부적으로 문제가 생김.
        // 문자열로 변환이 되어?. 만들어야되는 오브젝트. 건물 헐고 다시 짓고. 성능 문제. 한번쓰고 말거면 상관없겠지만..
        // 성능을 고려한다면. 적절히 사용해야.
        var title = titleInput.value;
        // 두번째 방법 - 이슈
        menuListUl.innerHTML += '<li><a href="">'+title+'</a></li>';
        
        // 세번째 방법 - 두번째 이슈를 해결하는 방안
        var html = '<a href="">'+title+'</a>';
        var li = document.createElement("li");
        li.innerHTML = html;

        menuListUl.appendChild(li);

        // 네번째 방법 -
        // 1. menuListUl.appendChild(title);
        // 1의 문제는, 노드가 아니다.
        // title이 텍스트이기 때문에 textNode로 반드시 생성 후 삽입할 수 있었다.
        // 새로 추가된 메서드를 사용. append()
        // 가변길이로 한번에 넣을 수 있고. 문자열도 가능
        // 텍스트노드를 알아서 만들어주는 함수. 개선된 메서드
        
        menuListUl.appendChild(title);
        

        /* 
        var title = titleInput.value;
        var txtNode = document.createTextNode(title);

        var aNode = document.createElement("a");
        aNode.href="";
        aNode.appendChild(txtNode);

        var liNode = document.createElement("li");
        liNode.appendChild(aNode);

        menuListUl.appendChild(liNode); 
        */
        
        /* 
        // 32강 1번째 케이스
        var title = titleInput.value;
        var txtNode = document.createTextNode(title);
        menuListDiv.appendChild(txtNode); */
    };

    delButton.onclick = function(){
        //console.log(menuListDiv.childNodes);
        // 텍스트를 삽입하는 일이 없어야. 텍스트도 노드로 포함되어 있어서 바로 삭제 안된 문제 발생
        // 엘리먼트, 태그 단위로 관리해야됨. ex) <li></li>
        // var txtNode = menuListDiv.childNodes[0];
        // menuListDiv.removeChild(txtNode);
        // 첫번째 노드가 텍스트가 될텐데, 엘리먼트가 되어야. 태그
        // 1. childNodes 모든 노드 대상
        // 2. children 엘리먼트 노드
        
        // 1. var liNode = menuListUl.children[0];
        //    menuListUl.removeChild(liNode);
        // 부모를 얻어야만 삭제할 수 있는 부분이 불편했음

        // 2. 1번째 케이스 개선방안
        // 내가 지워지겠다.
        var liNode = menuListUl.children[0];
        liNode.remove();

    };



});

// Ex5 : 엘리먼트 노드의 속성 & CSS 속성 변경 변경
window.addEventListener("load", function(){
    var section = document.querySelector("#section5");
    var srcInput = section.querySelector(".src-input");
    var imgSelect = section.querySelector(".img-select");
    var changeButton = section.querySelector(".change-button");
    var img = section.querySelector(".img");
    var colorInput = section.querySelector(".color-input");

    changeButton.onclick = function(){
        //img.src = "images/"+srcInput.value;
        img.src = "images/"+imgSelect.value;
        
        // 색상 바꾸는 작업 - img.style.border-color = ?
        
        // 1.
        //img.style["border-color"] = colorInput.value;
        
        // 2
        img.style.borderColor = colorInput.value;
        // img의 class는의 이름을 찾을때 class는 불가 img.className으로 사용해야.
    };



});

// Ex3 : Selectors API Level1
window.addEventListener("load", function(){
    var section3 = document.getElementById("section3");

    var txtX = section3.querySelector("input[name='x']");
    var txtY = section3.querySelector("input[name='y']");
    var btnAdd = section3.querySelector(".btn-add");
    var txtSum = section3.querySelector(".txt-sum");


    /*
    var inputs = section2.getElementsByTagName("input");
    
    var txtX = inputs[0];
    var txtY = inputs[1];
    var btnAdd = inputs[2];
    var txtSum = inputs[3];
    */

    btnAdd.onclick = function () {
        // alert("ㅎ");
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);

        txtSum.value = x+y;
    };


});


// Ex2 : 엘리먼트 선택방법 개선하기
window.addEventListener("load", function(){
    var section2 = document.getElementById("section2");

    var txtX = section2.getElementsByClassName("txt-x")[0];
    var txtY = section2.getElementsByClassName("txt-y")[0];
    var btnAdd = section2.getElementsByClassName("btn-add")[0];
    var txtSum = section2.getElementsByClassName("txt-sum")[0];


    /*
    var inputs = section2.getElementsByTagName("input");
    
    var txtX = inputs[0];
    var txtY = inputs[1];
    var btnAdd = inputs[2];
    var txtSum = inputs[3];
    */

    btnAdd.onclick = function () {
        // alert("ㅎ");
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);

        txtSum.value = x+y;
    };


});

// Ex1 : 계산기 프로그램
window.addEventListener("load", function(){
    var txtX = document.getElementById("txt-x");
    var txtY = document.getElementById("txt-y");
    var txtSum = document.getElementById("txt-sum");
    var btnAdd = document.getElementById("btn-add");

    btnAdd.onclick = function () {
        // alert("ㅎ");
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);

        txtSum.value = x+y;
    };


});