let profileApp = new Vue({
    el: '#profileApp',
    data: {
        profile_info: '',
    },
    created: function () {
        this.get_profile_info();
    },
    methods: {
        set_driver_License_Img(event) {
            profileApp.profile_info.driverLicenseImg = event.target.files[0];
        },
        get_profile_info: function () {
            $.get("/clientInfo",
                function (get_holidayPlanFormModel) {
                    profileApp.profile_info = get_holidayPlanFormModel;
                    profileApp.profile_info.password = '';
                    profileApp.profile_info.first_input_password = '';
                }
            )
        },
        set_profile_info: function () {
            if ((profileApp.profile_info.password !== '')
                && (profileApp.profile_info.password.length < 6 || profileApp.profile_info.password.length > 16)) {
                alert("请输入6到16位有效密码 ")
            }
            else if (profileApp.profile_info.first_input_password !== profileApp.profile_info.password)
            {
                alert("两次输入密码不一致")
            } else if (profileApp.profile_info.phone.length !== 11) {
                alert("请输入有效手机号码")
            } else {
                const formData = new FormData;
                formData.append("id", profileApp.profile_info.id);
                formData.append("username", profileApp.profile_info.username);
                formData.append("phone", profileApp.profile_info.phone);
                if (profileApp.profile_info.password === '') {
                    formData.append("password", '');
                } else {
                    formData.append("password", md5(profileApp.profile_info.password));
                }
                formData.append("idCard", profileApp.profile_info.idCard);
                formData.append("driverLicenseImg", '');
                formData.append("file", profileApp.profile_info.driverLicenseImg);
                $.ajax({
                    url: '/clientInfo',
                    type: 'POST',
                    cache: false,
                    data: formData,
                    processData: false,
                    contentType: false,
                    dataType: "json",
                    success: function (data) {
                        if (data.msg === "image error") {
                            alert("图片上传出错");
                        }
                        if (data.msg === "success") {
                            alert("修改成功");
                            profileApp.get_profile_info();
                        }
                    }
                });
            }
        }
    }
});
