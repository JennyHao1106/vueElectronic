## 2020.06.23
1.使用cookies和session的场景：不存在跨域
  使用token的场景：存在跨域
  
2.token原理分析
	（1）客户端用户名密码登录
	（2）服务器验证生成token
	（3）客户端存储token
	（4）后续所有请求携带token

3.git使用
	（1）创建分支
	git checkout -b （login）--分支名称
	（2）查看分支
	git branch
<<<<<<< HEAD
=======

4.vue相关
	vue -h 可以查看vue相关的帮助信息，就是可以看到vue可以使用那些命令

5.div块居中的方式
	（1）居中块的父组件设置为flex 设置两个属性justify-content: center;  align-items: center;
	（2）居中块设置position：absolute;left、top设置为50%；再设置transform：translate(-50%，-50%) --将元素沿着x轴和y轴同时移动自身宽高的50%

## 2020.06.24
1.vue引入外部的样式图标库：
	在main.js中import对应的css文件，class中使用即可 
<<<<<<< HEAD

## 2020.07.03
1.sessionStorage存储均为String 如果要存储数组需要先使用JSON.stringify 转换，再用JSON.parse解析回数组
=======
>>>>>>> login
>>>>>>> 20a0fc2da21f02c39b2b2db6bcede1d1d9e5d4b3
