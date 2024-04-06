const app = Vue.createApp({
    data() {
        return {
            showEditRoleModal: false,
            editData: {
                id: null,
                name: '',
                permissions: [],
            },
            availablePermissions: [
                { id: 'perm1', name: '权限1', description: '可以删除控制系统的开始和停止' },
                { id: 'perm2', name: '权限2', description: '可以访问主要的数据库' },
                { id: 'perm3', name: '权限3', description: '访问后台界面' },
                // 更多权限...
            ],
            rolesData: [
                {
                    id: 'role1',
                    name: '超级管理员',
                    permissions: ['perm1', 'perm2', 'perm3'],
                },
                // 更多角色...
            ],
            roleInput: {
                id: null,
                name: '',
                permissions: ['perm1'],
            },
            permissionInput: {
                name: '',
                description: '',
            },

            userDetails: {}, // 用户详细信息，用于显示模态窗口
            nextRoleId: 2, // 用于生成新角色的ID
            // 示例权限数据，可以根据需要增减
            samplePermissions: [
                { id: 1, name: '开始和停止控制系统', description: '权限1' },
                { id: 2, name: '数据库访问', description: '权限2' }
                // 更多示例权限...
            ],
        };
    },
    methods: {
        createRole() {
            // 新增 createRole 方法逻辑
            if (!this.roleInput.name.trim()) {
                alert('角色名称不能为空');
                return;
            }
            const newRole = {
                id: `role${this.nextRoleId++}`,
                name: this.roleInput.name,
                permissions: this.roleInput.permissions,
            };
            this.rolesData.push(newRole);

            // 重置输入
            this.roleInput.name = '';
            this.roleInput.permissions = [];
        },
        createPermission() {
            // 新增 createPermission 方法逻辑
            if (!this.permissionInput.name.trim() || !this.permissionInput.description.trim()) {
                alert('权限名称和描述不能为空');
                return;
            }
            const newPermission = {
                id: `perm${this.availablePermissions.length + 1}`,
                name: this.permissionInput.name,
                description: this.permissionInput.description,
            };
            this.availablePermissions.push(newPermission);

            // 重置输入
            this.permissionInput.name = '';
            this.permissionInput.description = '';
        },
        // 编辑角色
        editRole(role, index) {
            // 确保 permissions 是包含已选权限ID的数组
            this.editData = {
                id: role.id,
                name: role.name,
                permissions: role.permissions ? [...role.permissions] : []
            };
            this.showEditRoleModal = true;
        },

        // 更新角色
        updateRole() {
            const index = this.rolesData.findIndex(r => r.id === this.editData.id);
            if (index !== -1) {
                this.rolesData[index] = {
                    ...this.rolesData[index],
                    name: this.editData.name,
                    permissions: this.editData.permissions
                };
                this.closeEditRoleModal();
            } else {
                alert('角色不存在');
            }
        },
        deleteRole(index) {
            // 删除角色方法逻辑
            if (confirm('确定要删除这个角色吗？')) {
                this.rolesData.splice(index, 1);
            }
        },
        closeEditRoleModal() {
            // 关闭编辑角色模态窗口
            this.showEditRoleModal = false;
        },
        getPermissionNameById(permissionId) {
            // 获取权限名称方法逻辑，从 availablePermissions 中找出对应ID的权限名称
            const permission = this.availablePermissions.find(p => p.id === permissionId);
            return permission ? permission.name : '';
        },
        // ...更多方法
    },
});

document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.getElementById('backButton');
    backButton.onclick = function () {
        // 返回上一个页面
        window.location.href = 'managementSystem.html'; // 替换为实际返回页面的URL
    };
});

app.mount('#app');