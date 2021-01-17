$(function () {
    getUserInfo()
    $('#out').on('click', function () {
        var layer = layui.layer

        layer.confirm('是否确定退出?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 清除token
            localStorage.removeItem('token')
            // 跳转页面
            location.href = '/login.html'

            layer.close(index);
        });
    })
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败')
            renderAvatar(res.data)
        }
    })
}

// 渲染
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text_avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text_avatar').html(first).show()
    }
}