$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function (value) {
            if (value == $('[name=oldPwd]').val()) return '与原密码重复'
        },
        repwd: function (value) {
            if (value != $('[name=newPwd]').val()) return '两次输入的密码不一致'
        }
    })

    $('form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message)
                layer.msg(res.message)
                $('form')[0].reset()
            }
        })
    })
})