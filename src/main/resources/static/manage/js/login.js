var flag=0;
$().ready(function(){
    checkLogin();
    btnlogin_click();
});

function checkLogin(){
    $("#inputUsername").focusout(function(){
        if($("#inputUsername").val().length===0){
            flag=1;
            $("#inputUsername").parent().attr("class","form-group has-error");
        }else {
            flag=0;
            $("#inputUsername").parent().attr("class","form-group");
        }
    });
    $("#inputPasswd").focusout(function(){
        if($("#inputPasswd").val().length===0){
            flag=1;
            $("#inputPasswd").parent().attr("class","form-group has-error");
        }else {
            flag=0;
            $("#inputPasswd").parent().attr("class","form-group");
        }
    });
}

function btnlogin_click(){
    $("#btnlogin").click(function(){
        $("#inputUsername").parent().attr("class","form-group");
        $("#inputPasswd").parent().attr("class","form-group");
        if(flag===0){
            if($("#usertype").find("option:selected").val()==="client"){
                var url="/clientLoginCheck";
                var myhref="/UserPage";
                myAjax(url,myhref);

            }else if($("#usertype").find("option:selected").val()==="admin"){
                var url="/adminLoginCheck";
                var myhref="/manage/pages/index.html";
                myAjax(url,myhref);
            }
        }else {
            $("#inputUsername").parent().attr("class","form-group has-error");
            $("#inputPasswd").parent().attr("class","form-group has-error");
        }
    });
}

function myAjax(url,myhref){
    $.ajax({
        url:url,
        type:"POST",
        dataType:"json",
        data:{
            "username" : $("#inputUsername").val(),
            "passwd":$("#inputPasswd").val()
        },
        success:function(data){
            if(data.msg!=="success"){
                $("#inputUsername").parent().attr("class","form-group has-error");
                $("#inputPasswd").parent().attr("class","form-group has-error");
            }else{
                //localStorage.setItem("username",$("#inputUsername").val());
                window.location.href =myhref;
            }
        },
        error:function () {
            alert("System Error!");
        }
    });
}