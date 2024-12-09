<script setup lang="ts">
    const { public: { appName } } = useRuntimeConfig()
    const { status, signOut, data } = useAuth()
</script>

<template>
    <header id="header">
        <div class="container">
            <div class="logo">
                <NuxtLink to="/">{{ appName }}</NuxtLink>
            </div>
            <nav id="nav">
                <ul class="main__nav">
                    <template v-if="status == 'unauthenticated'">
                        <li>
                            <NuxtLink to="/register">Register</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/login">Login</NuxtLink>
                        </li>
                    </template>
                    <template v-else>
                        <li>
                            <NuxtLink to="/invoices">Invoice list</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/history">History</NuxtLink>
                        </li>
                    </template>
                </ul>
                <NuxtLink class="btn btn__primary btn--outline btn--xs" to="generate-invoice"
                    v-if="status == 'authenticated'">
                    Generate Invoice
                </NuxtLink>
                <span class="user" v-if="status == 'authenticated'">
                    <strong>{{ data?.user?.first_name }} {{ data?.user.last_name }}</strong>
                    <a href="#" @click.prevent="() => signOut()">log out</a>
                </span>
            </nav>
        </div>
    </header>
    <main id="main">
        <slot />
    </main>
</template>