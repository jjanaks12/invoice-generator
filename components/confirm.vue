<script setup lang="ts">
    interface ConfirmProps {
        status: Status
        title: string
        description: string
        cancelText?: string
        confirmText?: string
        onCancel?: any
        onConfirm?: any
    }

    const props = withDefaults(defineProps<ConfirmProps>(), {
        cancelText: 'Cancel',
        confirmText: 'Confirm'
    })

    const isShowing = defineModel('show')

    const closeAlert = () => {
        isShowing.value = false

        if (props.onCancel)
            props.onCancel()
    }
</script>

<template>
    <Teleport to="body" v-if="isShowing">
        <div :class="{ 'alert': true, ['alert--' + status]: true }">
            <div class="alert__detail">
                <a href="#" class="alert__close" @click.prevent="closeAlert">&times;</a>
                <strong class="alert__title">{{ title }}</strong>
                <p>{{ description }}</p>
            </div>
            <div class="alert__action">
                <button type="button" :class="{ 'btn btn--outline': true, ['btn__' + status]: true }" @click="onCancel">
                    {{ cancelText }}
                </button>
                <button type="button" :class="{ 'btn': true, ['btn__' + status]: true }" @click="onConfirm">
                    {{ confirmText }}
                </button>
            </div>
        </div>
    </Teleport>
</template>