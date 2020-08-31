require([
    "vju",
    "vue-router",
    "axios",
    "ELEMENT",
    "d3",
    "sysApp/store/index.js",
    "i18n/index.js",
    "vue!framework/frame_layout.vue"
], function(Vue, VueRouter, axios, element, d3, store, i18n, frameLayout) {
    if(!window.Vue) {
        window.Vue = Vue;
    }
    Vue.use(VueRouter);
    Vue.use(element);
    Vue.use({
        install: function(Vue, options) {
            Vue.prototype.jquery = $;
            Vue.prototype.jQuery = $;
            Vue.prototype.$axios = axios;
            Vue.prototype.$d3 = d3;
        }
    });
    Vue.component('frame-layout', frameLayout);
    var router = new VueRouter({
        routes: []
    });
    const originalReplace = VueRouter.prototype.replace;
    VueRouter.prototype.replace = function replace(location) {
        return originalReplace.call(this, location).catch(err => err);
    };
    //路由守护，确保有效路由可以执行
    router.beforeEach((to, from, next) => {
        next();
    });

    new Vue({
        router: router,
        store: store,
        i18n: i18n,
        el: "#app"
    });
});