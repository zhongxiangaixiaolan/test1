const app = Vue.createApp({
    data() {
        return {
            inputData: {
                id: 0,
                name: '',
                author: '普通用户'
            },
            editData: { // 用于编辑的角色数据
                id: null,
                name: '',
                author: ''
            },
            roles: ['超级管理员', '管理员', '普通用户', '普通用户1'],
            rolesData: [
                {
                    id: 1,
                    name: "K10高级经理",
                    author: "超级管理员"
                },
                {
                    id: 2,
                    name: "K9经理",
                    author: "管理员"
                },
                {
                    id: 3,
                    name: "K8组长",
                    author: "普通用户"
                }
            ],
            nextId: 4,
            showModal: false,
            showEditModal: false, // 控制编辑模态窗口的显示
            userDetails: {},
            // 示例用户数据
            sampleUsers: [
                { id: '1001', name: '用户A', pass: 'passA', roleId: 1 },
                { id: '1002', name: '用户B', pass: 'passB', roleId: 2 },
                { id: '1003', name: '用户C', pass: 'passC', roleId: 3 },
                { id: '1004', name: '用户D', pass: 'passD', roleId: 1 },
                { id: '1005', name: '用户E', pass: 'passE', roleId: 2 },
                { id: '1006', name: '用户F', pass: 'passF', roleId: 3 }
            ]
        };
    },
    computed: {
        // 生成角色及其用户信息的综合数据结构
        rolesWithUsers() {
            return this.rolesData.map(role => ({
                ...role,
                users: this.getUsers(role.id)
            }));
        }
    },
    methods: {
        addRole() {
            if (!this.inputData.name.trim()) {
                alert('角色名必须填写');
                return;
            }
            this.rolesData.push({
                id: this.nextId++,
                name: this.inputData.name,
                author: this.inputData.author
            });

            // 清空输入框
            this.inputData.name = "";
            this.inputData.author = "普通用户";
        },
        getUsers(roleId) {
            return this.sampleUsers.filter(user => user.roleId === roleId);
        },
        showUserDetails(user) {
            this.userDetails = user;
            this.showModal = true;
        },
        closeUserDetails() {
            this.showModal = false;
        },
        editRole(role, index) {
            this.editData = { ...role }; // 拷贝当前角色信息至编辑数据
            this.showEditModal = true; // 显示编辑模态窗口
        },
        closeEditModal() {
            this.showEditModal = false;
        },
        updateRole() {
            const index = this.rolesData.findIndex(r => r.id === this.editData.id);
            if (index !== -1) {
                this.rolesData[index] = { ...this.editData };
                this.showEditModal = false;
            }
        },
        deleteRole(index) {
            if (confirm('确定要删除这个角色吗？')) {
                this.rolesData.splice(index, 1);
            }
        }

    }
});
document.addEventListener('DOMContentLoaded', function () {
    var backButton = document.getElementById('backButton');
    backButton.onclick = function () {
        // 返回 managementSystem.html
        window.location.href = 'managementSystem.html';
    };
});

app.mount('#app');