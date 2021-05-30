<template>
    <div>
        <div class="container mt-3">
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title float-left">
                                <b>Data Tanggungan SPP</b>
                            </p>
                            <div class="table-responsive">
                                <b-table striped hover :items="myspp" :fields="fieldsSpp">
                                    <template v-slot:cell(bulan)="data">
                                        {{ months[data.item.bulan - 1] }}
                                    </template>
                                </b-table>
                                <b-pagination v-model="currentPage"
                                :per-page="perPage"
                                :total-rows="rows"
                                align="center"
                                v-on:input="pagination">
                                </b-pagination>
                                <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                                    <b-spinner label="Spinning" variant="success"></b-spinner>
                                    <strong class="text-success">Loading...</strong>
                                </b-toast>
                                <b-toast id="message" title="Message">
                                    <strong class="text-success">{{ message }}</strong>
                                </b-toast>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import VueHtml2pdf from "vue-html2pdf"

export default {
    data: function(){
        return{
            message: "",
            currentPage: 1,
            rows: 0,
            perPage: 10,
            key: "",
            fieldsSpp: ["id", "nama", "bulan", "tahun", "nominal"],
            myspp: [],
            tahun: [],
            months: [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
            ],
        };
    },

    methods: {
        getDataSpp: function () {
            let conf = { headers: { Authorization: "Bearer " + this.key } };
            let offset = (this.currentPage - 1) * this.perPage;
            this.$bvToast.show("loadingToast");
            this.axios
            .get("/sppku/" + this.perPage + "/" + offset, conf)
            .then((response) => {
                if(response.data.status == 1){
                    this.$bvToast.hide("loadingToast");
                    this.myspp = response.data.spp;
                } else {
                    this.$bvToast.hide("loadingToast");
                    this.message = "Gagal menampilkan data spp."
                    this.$bvToast.show("message");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
    },

    mounted() {
        this.key = localStorage.getItem("Authorization");
        this.getDataSpp();
    },
};
</script>