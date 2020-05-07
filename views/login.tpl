{% extends './layout.tpl' %}

{% block css %}
    <link rel="stylesheet" type="text/css" href="/stylesheets/style.css">
{% endblock %}


{% block content %}
<div class="form-cells">
  <h1>用户登录</h1>
  <div class="form-cell">
    <input id="email" type="email" name="email" placeholder="邮箱">
  </div>
  <div class="form-cell">
    <input id="password" type="password" name="password" placeholder="密码">
  </div>
  <div class="form-cell">
    <button id="submit">登录</button>
    <input type="text" name="csrf" id="csrf" value="{{csrf}}" hidden>
  </div>
</div>
{% endblock %}

{% block js %}
<script src="https://lib.baomitu.com/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript">
  const PAGE = {
    init:function(){
      this.bind();
    },
    bind:function(){
      $('#submit').on('click',this.handleSubmit);
    },
    handleSubmit:function(){
      let password = $('#password').val();
      let email = $('#email').val();
      let csrf = $('#csrf').val();

      if(!password || !email){
        alert('params empty!')
        return
      }
      console.log(email,password)
      $.ajax({
          url: '/api/login',
          data: { email, password, csrf },
          type: 'POST',
          success: function(data) {
            if(data.code === 200){
              alert('登录成功！')
              location.reload()
            }else{
              console.log(data)
            }
          },
          error: function(err) {
            console.log(err)
          }
      })
    }
  }

  PAGE.init();
</script>
{% endblock %}