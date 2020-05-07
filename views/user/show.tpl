{% extends './../layout.tpl' %}

{% block css %}
<link rel="stylesheet" href="/stylesheets/style.css">
{% endblock %}

{% block content %}
<div class="page">
  <h1>用户管理</h1>
  <div class="new-user">
    <h2>新建用户</h2>
    <input type="text" name="name" id="new-name" placeholder="请输入用户名">
    <input type="email" name="email" id="new-email" placeholder="请输入邮箱账号">
    <input type="password" name="password" id="new-password" placeholder="请输入密码">
    <button id="new-submit">新建用户</button>
  </div>
  <div class="user-list">
    <h2>用户列表</h2>
    <ul>
      {% for val in users  %}
      <li>
        <span>id: {{val.id}}</span>
        <span>email: {{val.email}}</span>
        <input class="user-name" type="text" name="name" placeholder="姓名" value="{{val.name}}">
        <button class="update-user" data-id="{{val.id}}">修改姓名</button>
        <button class="delete-user" data-id="{{val.id}}">删除用户</button>
      </li>
      {% endfor %}
    </ul>
  </div>
  <!-- csrf token -->
  <div class="csrf-contianer">
    <input type="text" name="csrf" id="csrf" value="{{csrf}}" hidden>
  </div>
</div>
{% endblock %}

{% block js %}
<script src="https://lib.baomitu.com/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript">
  const indexPage = {
    init:function(){
      this.bind();
    },
    bind:function(){
      $('#new-submit').on('click',this.newUser);
      $('.update-user').on('click',this.update);
      $('.delete-user').on('click',this.delete);
    },
    delete: function(){
      let id = $(this).data('id');
      let csrf = $('#csrf').val();
      $.ajax({
          url: '/api/user',
          data: { id,csrf },
          type: 'DELETE',
          success: function(data) {
            if(data.code === 200){
              alert('删除成功！')
              location.reload()
            }else{
              console.log(data)
            }
          },
          error: function(err) {
            console.log(err)
          }
      })
    },
    update:function(){
      let id = $(this).data('id');
      let name = $(this).parent().find('.user-name').val();
      let csrf = $('#csrf').val();

      if(!name || !id){
        alert('缺少参数')
        return
      }

      $.ajax({
          url: '/api/user',
          data: { name, id, csrf },
          type: 'PUT',
          success: function(data) {
            if(data.code === 200){
              alert('修改成功！')
              location.reload()
            }else{
              console.log(data)
            }
          },
          error: function(err) {
            console.log(err)
          }
      })
    },
    newUser:function(){
      let name = $('#new-name').val();
      let email = $('#new-email').val();
      let password = $('#new-password').val();
      let csrf = $('#csrf').val();

      if(!name || !email || !password){
        alert('缺少参数')
        return
      }

      $.ajax({
          url: '/api/user',
          data: { name, email, password, csrf },
          type: 'POST',
          success: function(data) {
            if(data.code === 200){
              alert('新增成功！')
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
  $(function(){
    indexPage.init();
  })
</script>
{% endblock %}