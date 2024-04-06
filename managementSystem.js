
const { createApp } = Vue;

createApp({
    data() {
        return {
            // 管理项数据数组
            managementItems: [
                { text: '用户管理', link: 'user.html', cssClass: 'user' },
                { text: '权限管理', link: 'jurisdiction.html', cssClass: 'permission' },
                { text: '参数管理', link: 'argument.html', cssClass: 'parameter' },
                { text: '角色管理', link: 'character.html', cssClass: 'role' },
                { text: '机构管理', link: 'organization.html', cssClass: 'organization' },
                { text: '公告管理', link: 'notice.html', cssClass: 'announcement' }
            ]
        };
    },
    methods: {
        // 导航方法
        navigateTo(link) {
            window.location.href = link;
        }
    }
}).mount('#app');