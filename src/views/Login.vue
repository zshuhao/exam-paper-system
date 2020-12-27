<template>
    <div class="login-container">
        <el-form class="login-form" ref="form" :model="loginForm" :rules="rules">
            <h3 class="title">试卷管理系统</h3>
            <el-form-item prop='phone'>
                <el-input
                    class="input"
                    placeholder="手机号"
                    prefix-icon="el-icon-user"
                    v-model="loginForm.phone"
                ></el-input>
            </el-form-item>

            <el-form-item prop="password">
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
import { userLogin } from '../api/user'
export default {
    name: 'Login',
    data () {
        return {
            loginForm: {
                phone: '17739019681',
                password: '123456'
            },
            rules: {
                phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        }
    },
    computed: {
        ...mapState(['token'])
    },
    methods: {
        login () {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    const res = await userLogin(this.loginForm)
                    if (res.success) {
                        this.$store.dispatch('setUserInfo', res.data)
                        this.$router.push('/dashboard')
                    }
                } else {
                    return false
                }
            })
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
