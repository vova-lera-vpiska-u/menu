// vite.config.ts
import react from 'file:///C:/Users/awqsome/Documents/GitHub/menu/node_modules/@vitejs/plugin-react/dist/index.mjs'
import babel from 'file:///C:/Users/awqsome/Documents/GitHub/menu/node_modules/vite-plugin-babel/dist/index.mjs'
import { defineConfig } from 'file:///C:/Users/awqsome/Documents/GitHub/menu/node_modules/vite/dist/node/index.js'

// package.json
var version = '0.1.1'

// vite.config.ts
var vite_config_default = defineConfig(({ mode }) => ({
    base: '/menu/',
    resolve: {
        alias: {
            '@': '/src',
            '@app': '/src/app',
            '@pages': '/src/pages',
            '@widgets': '/src/widgets',
            '@features': '/src/features',
            '@entities': '/src/entities',
            '@shared': '/src/shared',
        },
    },
    plugins: [
        babel(),
        react({
            babel: {
                plugins: [
                    [
                        'babel-plugin-styled-components',
                        {
                            displayName: mode === 'development' ? true : false,
                        },
                    ],
                ],
            },
        }),
    ],
    define: {
        'import.meta.env.VITE_APP_VERSION': JSON.stringify(version),
    },
}))
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYXdxc29tZVxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXG1lbnVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGF3cXNvbWVcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxtZW51XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hd3Fzb21lL0RvY3VtZW50cy9HaXRIdWIvbWVudS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuaW1wb3J0IGJhYmVsIGZyb20gJ3ZpdGUtcGx1Z2luLWJhYmVsJ1xyXG5pbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi9wYWNrYWdlLmpzb24nXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xyXG4gIGJhc2U6ICcvbWVudS8nLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogJy9zcmMnLFxyXG4gICAgICAnQGFwcCc6ICcvc3JjL2FwcCcsXHJcbiAgICAgICdAcGFnZXMnOiAnL3NyYy9wYWdlcycsXHJcbiAgICAgICdAd2lkZ2V0cyc6ICcvc3JjL3dpZGdldHMnLFxyXG4gICAgICAnQGZlYXR1cmVzJzogJy9zcmMvZmVhdHVyZXMnLFxyXG4gICAgICAnQGVudGl0aWVzJzogJy9zcmMvZW50aXRpZXMnLFxyXG4gICAgICAnQHNoYXJlZCc6ICcvc3JjL3NoYXJlZCcsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgYmFiZWwoKSxcclxuICAgIHJlYWN0KHtcclxuICAgICAgYmFiZWw6IHtcclxuICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgICdiYWJlbC1wbHVnaW4tc3R5bGVkLWNvbXBvbmVudHMnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgZGlzcGxheU5hbWU6IG1vZGUgPT09ICdkZXZlbG9wbWVudCcgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGRlZmluZToge1xyXG4gICAgJ2ltcG9ydC5tZXRhLmVudi5WSVRFX0FQUF9WRVJTSU9OJzogSlNPTi5zdHJpbmdpZnkodmVyc2lvbiksXHJcbiAgfSxcclxufSkpXHJcbiIsICJ7XHJcbiAgXCJuYW1lXCI6IFwibWVudVwiLFxyXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxyXG4gIFwidmVyc2lvblwiOiBcIjAuMS4xXCIsXHJcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vdm92YS1sZXJhLXZwaXNrYS11LmdpdGh1Yi5pby9tZW51L1wiLFxyXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcImRldlwiOiBcInZpdGVcIixcclxuICAgIFwiYnVpbGRcIjogXCJ0c2MgJiYgdml0ZSBidWlsZFwiLFxyXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC4gLS1leHQgdHMsdHN4IC0tcmVwb3J0LXVudXNlZC1kaXNhYmxlLWRpcmVjdGl2ZXMgLS1tYXgtd2FybmluZ3MgMFwiLFxyXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXHJcbiAgICBcInByZWRlcGxveVwiOiBcIm5wbSBydW4gYnVpbGRcIixcclxuICAgIFwiZGVwbG95XCI6IFwiZ2gtcGFnZXMgLWQgZGlzdFwiLFxyXG4gICAgXCJyZWxlYXNlXCI6IFwicmVsZWFzZS1pdFwiXHJcbiAgfSxcclxuICBcImRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcImVmZmVjdG9yXCI6IFwiXjIzLjIuMlwiLFxyXG4gICAgXCJlZmZlY3Rvci1yZWFjdFwiOiBcIl4yMy4yLjFcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi1lZmZlY3RvclwiOiBcIl4wLjE0LjBcIixcclxuICAgIFwicmVhY3RcIjogXCJeMTguMi4wXCIsXHJcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcclxuICAgIFwicmVhY3Qtcm91dGVyLWRvbVwiOiBcIl42LjIyLjNcIixcclxuICAgIFwic3R5bGVkLWNvbXBvbmVudHNcIjogXCJeNi4xLjhcIlxyXG4gIH0sXHJcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAYmFiZWwvY29yZVwiOiBcIl43LjI2LjBcIixcclxuICAgIFwiQGJhYmVsL3ByZXNldC1lbnZcIjogXCJeNy4yNi4wXCIsXHJcbiAgICBcIkBiYWJlbC9wcmVzZXQtcmVhY3RcIjogXCJeNy4yNS45XCIsXHJcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4yLjY2XCIsXHJcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMi4yMlwiLFxyXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl43LjIuMFwiLFxyXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjcuMi4wXCIsXHJcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI6IFwiXjQuMi4xXCIsXHJcbiAgICBcImJhYmVsLXBsdWdpbi1zdHlsZWQtY29tcG9uZW50c1wiOiBcIl4yLjEuNFwiLFxyXG4gICAgXCJlc2xpbnRcIjogXCJeOC41Ny4wXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtaG9va3NcIjogXCJeNC42LjBcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1yZWZyZXNoXCI6IFwiXjAuNC42XCIsXHJcbiAgICBcImdoLXBhZ2VzXCI6IFwiXjYuMS4xXCIsXHJcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS4yLjJcIixcclxuICAgIFwidml0ZVwiOiBcIl41LjIuMFwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1iYWJlbFwiOiBcIl4xLjIuMFwiXHJcbiAgfSxcclxuICBcIm9wdGlvbmFsRGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQHJvbGx1cC9yb2xsdXAtbGludXgteDY0LWdudVwiOiBcIjQuNi4xXCJcclxuICB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnVCxTQUFTLG9CQUFvQjtBQUM3VSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxXQUFXOzs7QUNDaEIsY0FBVzs7O0FER2IsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxNQUNKLE9BQU87QUFBQSxRQUNMLFNBQVM7QUFBQSxVQUNQO0FBQUEsWUFDRTtBQUFBLFlBQ0E7QUFBQSxjQUNFLGFBQWEsU0FBUyxnQkFBZ0IsT0FBTztBQUFBLFlBQy9DO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sb0NBQW9DLEtBQUssVUFBVSxPQUFPO0FBQUEsRUFDNUQ7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
