<template>
    <div>
        <div class="container mt-3">
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title float-left">
                                <b>Data Pembayaran SPP</b>
                            </p>
                            <p class="card-description float-right">
                                <b-button variant="secondary" v-on:click="Print()">
                                    <i class="mdi mdi-file-document-box-outline btn-icon-prepend"></i>
                                    Print
                                </b-button>
                            </p>
                            <div class="table-responsive">
                                <b-table striped hover :items="pembayaran" :fields="fields">
                                    <template v-slot:cell(SPP)="data">
                                        {{
                                            "#" +
                                            data.item.sppid +
                                            " - " +
                                            months[data.item.bulan - 1] +
                                            "" +
                                            data.item.tahun
                                        }}
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

        <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="BuktiPembayaran"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf">

            <section slot="pdf-content">
                <div class="card">
                    <div class="card-body">
                        <p class="card-title float-left">
                            <b>Data Pembayaran SPP</b>
                        </p>
                        <p class="card-description float-right"></p>
                        <div class="table-responsive">
                            <b-table striped hover :items="pembayaran" :fields="fields">
                                <template v-slot:cell(SPP)="data">
                                    {{
                                        "#" +
                                        data.item.sppid +
                                        " - " +
                                        months[data.item.bulan - 1] +
                                        "" +
                                        data.item.tahun
                                    }}
                                </template>
                            </b-table>
                        </div>
                    </div>
                </div>
            </section>
        </vue-html2pdf>
    </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
export default {
    data: function() {
        return{
            message: "",
            currentPage: 1,
            rows: 0,
            perPage: 10,
            key: "",
            pdftoprint: [],
            pembayaran: [],
            fields: [
                "id",
                "nis",
                "nama_siswa",
                "nama_petugas",
                "SPP",
                "tanggal_pembayaran",
                "jumlah_bayar",
            ],
            nama_petugas: [],
            nis: [],
            nama_siswa: [],
            SPP: [],
            spp_arr: [],
            tahun: [],
            months: [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Augustus",
                "September",
                "Oktober",
                "November",
                "Desember",
            ],
        };
    },

    methods: {
        sppFilter(id_spp) {
            try {
                this.ttlbyr = this.spp_arr.filter((d) => d.id === id_spp)[0].nominal;
            } catch (error) {
                this.ttlbyr = 0;
            }
        },

        Print(item){
            this.generateReport();
        },

        generateReport(){
            this.$refs.html2Pdf.generatePdf();
        },

        getData: function () {
            let conf = { headers: { Authorization: "Bearer " + this.key } };
            let offset = (this.currentPage - 1) * this.perPage;
            this.$bvToast.show("loadingToast");
            this.axios
            .get("/pembayaranku/" + this.perPage + "/" + offset, conf)
            .then((response) => {
                if(response.data.status == 1) {
                    this.$bvToast.hide("loadingToast");
                    this.pembayaran = response.data.pembayaran;
                    this.rows = response.data.count;
                } else {
                    this.$bvToast.hide("loadingToast");
                    this.message = "Gagal menampilkan data pembayaran siswa.";
                    this.$bvToast.show("message");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },

        pagination: function() {
            if(this.search == ""){
                this.getData();
            } else {
                this.searching();
            }
        },
    },

    mounted(){
        this.key = localStorage.getItem("Authorization");
        this.getData();
    },
    components: {
        VueHtml2pdf,
    },
}
</script>