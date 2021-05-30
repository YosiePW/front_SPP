<template>
    <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="main-panel">
                <div class="content-wrapper d-flex align-items-center auth">
                    <div class="row w-100">
                        <div class="col-lg-4 mx-auto">
                            <div class="auth-form-light text-left p-5">
                                <div class="navbar-brand brand-logo">
                                    <img src="assets/img/logo.png">
                                </div>
                                <h4>Selamat Datang!</h4>
                                <h6 class="font-weight-light">Login SPP Siswa</h6>
                                <form v-on:submit.prevent="Login" class="pt-3" method="post">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend bg-transparent">
                                                <span class="input-group-text bg-transparent border-right-0">
                                                    <i class="mdi mdi-account-outline text-primary"></i>
                                                </span>
                                            </div>
                                            <input v-model="nis" type="text" class="form-control form-control-lg border-left-0"
                                            id="nis" name="nis" placeholder="NIS" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend bg-transparent">
                                                <span class="input-group-text bg-transparent border-right-0">
                                                    <i class="mdi mdi-lock-outline text-primary"></i>
                                                </span>
                                            </div>
                                            <input v-model="password" type="password" class="form-control form-control-lg border-left-0"
                                            id="password" name="password" placeholder="Password" required>
                                        </div>
                                    </div>
                                    <div class="my-3">
                                        <input type="submit" name="submit" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" value="MASUK">
                                    </div>
                                    <!-- <div class="btn btn-block font-weight-medium auth-form-btn">
                                        <p>Belum Punya Akun?<a href="/register">Register</a></p>
                                    </div> -->
                                </form>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nis: '',
            password: '',
        }
    },
    methods: {
        Login: function(){
            let nis = this.nis
            let password = this.password
            this.$store.dispatch('Login_Siswa', { nis, password })
            .then(() => this.$router.push('/tanggungan_siswa'))
            .catch(err => console.log(err))
        }
    }
}
</script>