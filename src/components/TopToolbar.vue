<template>
    <div>
        <v-navigation-drawer
                v-model="drawer"
                absolute
                bottom
                temporary
        >
            <v-list
                    nav
                    dense
            >
                <v-list-item-group>
                    <v-list-item to="/">
                        <v-list-item-title><v-icon>mdi-home</v-icon> Home</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/settings">
                        <v-list-item-title><v-icon>mdi-earth</v-icon> Jouer</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/settings">
                        <v-list-item-title><v-icon>mdi-cog</v-icon> Settings</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/about">
                        <v-list-item-title><v-icon>mdi-script-text </v-icon> Crédits</v-list-item-title>
                    </v-list-item>

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                dark
                color="primary"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>{{ title }}</v-toolbar-title>

        </v-app-bar>
    </div>
</template>

<script>
    export default {
        name: "TopToolbar",
        data: function () {
            return {
                title: "",
                drawer: false,
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>