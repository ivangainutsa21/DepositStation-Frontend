<template>
    <div>
        <center>
            <table class="container">
                <tr>
                    <td class="collections">
                        <div style="display: block; height: 400px !important; overflow-y: auto;">
                            <table>
                                <tr v-for="(row, index) in new_filter">
                                    <td>
                                        <button v-on:click="onToggle(index)" style="float: right; margin-right: 10px;">
                                            <img src="images/drop-down-arrow.png" width="10" height="10" ></img>
                                        </button>
                                        <div v-if="row.toggled === true">
                                            {{row.label}}
                                            <br/> 
                                            {{'Tel: ' + row.details.tel}}
                                        </div>
                                        <div v-else>
                                            {{row.label}}
                                            <br/> 
                                            {{'id: ' + row.id}}
                                            <br/>
                                            {{'group: ' + row.group}}
                                            <br/>
                                            {{'status: ' + row.status}}
                                            <br/>
                                            {{'email: ' + row.details.email}}
                                            <br/>
                                            {{'Tel: ' + row.details.tel}}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                    <td class="nav-bar">
                        <tr class="collections" v-for="nav in depositStation.navigation">
                            <button v-on:click="onNav(nav.name)">
                                <img :src="'images/' +  nav.name + '.png'" width="30" height="30" ></img>
                            </button>
                        </tr>
                    </td>
                </tr>
            </table>
        </center>
    </div>
</template>

<script>
    export default {
        name: 'DepositStation',
        data() {
            return {
                depositStation: [],
                filter: [],
            }
        },
        computed: {
            new_filter(){
                return this.filter;
            }
        },
        methods: {
            onNav: function(navName){
                switch(navName) {
                    case 'sortation':
                        this.filter = this.depositStation.collections.patient.filter(content => {
                            return content.status;
                        })
                        console.log(this.filter);
                        break;
                    case 'group':
                        this.filter = this.depositStation.collections.patient;
                        break;
                    case 'archive':
                        
                        this.filter = this.depositStation.collections.patient.filter(content => {
                            return !content.status;
                        })
                        console.log(this.filter);
                        break;
                    default:
                        this.filter = this.depositStation.collections.patient.sort(this.sortByProperty('label'));
                }
            },
            onToggle: function(index) {
                this.filter[index]['toggled'] = !this.filter[index]['toggled'];
                /*const row = this.filter.find(row => {
                    return row.id == id;
                });
                row.toggled = !row.toggled;
                console.log(row.toggled);*/
                //console.log(this.filter[0]['toggled'])
            },
            sortByProperty: function (property) {
                return function (x, y) {
                    return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));

                };
            }
        },
        created: function() {
            this.$http.get('http://127.0.0.1:8000/api/getAction')
            .then(function(response) {
                this.$store.state.depositStation = response.data;
                this.depositStation = this.$store.state.depositStation;
                this.onNav();
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body {
        font-family: Helvetica Neue, Arial, sans-serif;
        font-size: 14px;
        color: #444;
    }
    table.container {
        border: 2px solid #42b983;
        border-radius: 3px;
        background-color: #fff;
    }
    td.collections {
        padding: 0;
    }
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    }
    td {
        background-color: #f9f9f9;
        width: 200px;
        padding: 10px 10px;
    }
    td.nav-bar {
        width: 30px;
    }
    th.active {
        color: #fff;
    }
    th.active .arrow {
        opacity: 1;
    }
    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
    }
    .arrow.asc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #fff;
    }
    .arrow.dsc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #fff;
    }
    h1,
    h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>