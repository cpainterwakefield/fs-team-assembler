<template>
    <v-app>
        <router-view/>
        <footer>
            <span>
                &copy; Colorado School of Mines 2021
            </span>
        </footer>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        components: {}
    };
</script>

<style>
    body {
        font-family: Roboto, sans-serif;
        padding: 25px;
    }

    footer {
        padding: 15px;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50px;
        background-color: #263F6A;
        color: white;
        text-align: center;
    }

    .btn1 {
        margin-right: 10px;
    }

    .full {
        width: 100%;
    }

    .half {
        width: 50%;
    }

    .centered {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
