<template>
    <v-main>
        <div class = "message">
            <div class = "main">
                <h3>Sorry, some sort of error has occurred.  You can try to view the last page again
                by using the "Back" button on your browser.  If the problem persists, please contact
                Professor Painter-Wakefield at <a href="mailto:cpainter@mines.edu">cpainter@mines.edu</a>.</h3>
            </div>
        </div>
    </v-main>
</template>

<script>
    export default {
        name: 'Profile',
        methods: { }
    }
</script>

<style>
    .message {
        width: 70%;
        border: 2px solid black;
        border-radius: 10px;
        background: #D3D3D3;
    }

    .main {
        padding: 15px;
        margin: 25px;
    }
</style>
