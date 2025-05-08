import { mergeConfig, type UserConfig } from 'vite'

export default (config: UserConfig) => {
    return mergeConfig(config, {
        server: {
            port: 3001,
            allowedHosts: ['invoice.janak.click']
        }
    })
}