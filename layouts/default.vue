<script setup lang="ts">
    const { public: { appName } } = useRuntimeConfig()
</script>

<template>
    <header id="header">
        <div class="container">
            <div class="logo">
                <NuxtLink to="/">{{ appName }}</NuxtLink>
            </div>
            <nav id="nav">
                <ul class="main__nav">
                    <li>
                        <NuxtLink to="invoices">Invoice List</NuxtLink>
                    </li>
                </ul>
                <NuxtLink class="btn btn__primary btn--outline btn--xs" to="generate-invoice">Generate Invoice</NuxtLink>
            </nav>
        </div>
    </header>
    <main id="main">
        <slot />
    </main>
</template>