<script setup lang="ts">
    import { useCurrencyStore } from '~/store/currency'

    const { public: { appName } } = useRuntimeConfig()
    const { status, signOut, data } = useAuth()

    const { fetch } = useCurrencyStore()

    onMounted(async () => {
        await fetch()
    })
</script>

<template>
    <header id="header">
        <div class="container">
            <brand />
            <nav id="nav">
                <ul class="main__nav">
                    <template v-if="status == 'unauthenticated'">
                        <li>
                            <NuxtLink :to="{ name: 'register' }">Register</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink :to="{ name: 'login' }">Login</NuxtLink>
                        </li>
                    </template>
                    <template v-else>
                        <li>
                            <NuxtLink :to="{ name: 'dashboard-invoices' }">Invoice list</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink :to="{ name: 'dashboard-history' }">History</NuxtLink>
                        </li>
                    </template>
                </ul>
                <NuxtLink class="btn btn__primary btn--outline btn--xs" :to="{ name: 'dashboard-generate-invoice' }"
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