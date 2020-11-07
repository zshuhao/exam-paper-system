<template>
    <div class="login-container">
        <el-form class="login-form">
            <h3 class="title">试卷管理系统</h3>

            <el-form-item>
                <el-input
                    class="input"
                    placeholder="用户名"
                    prefix-icon="el-icon-user"
                    v-model="loginForm.username"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-input
                    class="input"
                    placeholder="密码"
                    prefix-icon="el-icon-unlock"
                    show-password
                    v-model="loginForm.password"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="button" type="primary" @click="login">登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { userLogin, getUserInfo } from '../api/user'
export default {
    name: 'Login',
    data () {
        return {
            loginForm: {
                username: 'admin',
                password: '123456'
            }
        }
    },
    computed: {
        ...mapState(['token'])
    },
    methods: {
        async login () {
            const res = await userLogin(this.loginForm)
            if (res.status === 0) {
                this.$store.dispatch('setToken', res.data)
                this.fetchUserInfo()
            }
        },
        async fetchUserInfo () {
            const token = this.token.token
            const user = await getUserInfo(token)
            if (user.status === 0) {
                this.$store.dispatch('setUserInfo', user.data)
                this.$message.success('登陆成功')
                this.$router.push('/dashboard')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.login-container {
    height: 100%;
    background-color: #2d3a4b;
    .login-form {
        box-sizing: border-box;
        width: 520px;
        margin: 0 auto;
        padding: 160px 35px 0;
        .title {
            font-size: 26px;
            color: #eee;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
            margin-bottom: 22px;
        }
        .input {
            height: 46px;
        }
        .input /deep/ .el-input__inner {
            height: 46px;
            background: transparent;
            border: 0px;
            color: #fff;
        }
        .button {
            width: 100%;
        }
    }
}

</style>
