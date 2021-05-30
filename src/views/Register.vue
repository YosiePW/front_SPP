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
                                <h6 class="font-weight-light">Register Petugas</h6>
                                <form v-on:submit.prevent="Register" class="pt-3" method="post">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend bg-transparent">
                                                <span class="input-group-text bg-transparent border-right-0">
                                                    <i class="mdi mdi-account-outline text-primary"></i>
                                                </span>
                                            </div>
                                            <input v-model="nama_petugas" type="text" class="form-control form-control-lg border-left-0"
                                            id="nama_petugas" name="nama_petugas" placeholder="Nama Petugas" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend bg-transparent">
                                                <span class="input-group-text bg-transparent border-right-0">
                                                    <i class="mdi mdi-email-outline text-primary"></i>
                                                </span>
                                            </div>
                                            <input v-model="username" type="text" class="form-control form-control-lg border-left-0"
                                            id="username" name="username" placeholder="Username" required>
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
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend bg-transparent">
                                                <span class="input-group-text bg-transparent border-right-0">
                                                    <i class="mdi mdi-clipboard-outline text-primary"></i>
                                                </span>
                                            </div>
                                            <input v-model="level" type="text" class="form-control form-control-lg border-left-0"
                                            id="level" name="level" placeholder="Level" required>
                                        </div>
                                    </div>
                                    <div class="my-3">
                                        <input type="submit" name="submit" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" value="DAFTAR">
                                    </div>
                                    <div class="btn btn-block font-weight-medium auth-form-btn">
                                        <p>Sudah Punya Akun?<a href="/login">Login</a></p>
                                    </div>
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
            nama_petugas    : '',
            username        : '',
            password        : '',
            level           : '',
        }
    },
    methods: {
        Register: function () {
            let conf = { headers: { Authorization: "Bearer " + this.key } };
            this.$bvToast.show("loadingToast");
            let form = new FormData();
            form.append("nama_petugas", this.nama_petugas);
            form.append("username", this.username);
            form.append("password", this.password);
            form.append("level", this.level);
            this.axios
                .post("/register", form, conf)
                .then(() => this.$router.push("/login"))
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}
</script>