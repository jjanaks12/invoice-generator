<script setup lang="ts">
    const { public: { appName } } = useRuntimeConfig()
    const { status, signOut } = useAuth()
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
                            <NuxtLink to="register">Register</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="login">Login</NuxtLink>
                        </li>
                    </template>
                    <template v-else>
                        <li>
                            <NuxtLink to="invoices">Invoice List</NuxtLink>
                        </li>
                        <li>
                            <a href="#" class="btn btn__danger btn--xs" @click.prevent="() => signOut()">log out</a>
                        </li>
                    </template>
                </ul>
                <NuxtLink class="btn btn__primary btn--outline btn--xs" to="generate-invoice"
                    v-if="status == 'authenticated'">
                    Generate Invoice
                </NuxtLink>
            </nav>
        </div>
    </header>
    <main id="main">
        <slot />
    </main>
</template>