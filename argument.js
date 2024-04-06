const app = Vue.createApp({
    data() {
        return {
            codeTableInput: {
                name: '',
                type: 'UTF-8', // 设定默认值为 UTF-8
            },
            editData: {
                id: null,
                name: '',
                type: '',
            },
            showEditModal: false,
            types: ['ASCII', 'UTF-8', 'UTF-16', 'GBK', 'GB18030', 'Big5', 'Other'],
            codeTablesData: [
                { id: 1, name: "Standard ASCII", type: "ASCII" },
                { id: 2, name: "Multilingual Unicode", type: "UTF-16" },
                // 更多示例数据...
            ],
            nextId: 3, // 根据已有示例数据设置的下一个可用 ID
        };
    },
    methods: {
        createCodeTable() {
            if (!this.codeTableInput.name || !this.codeTableInput.type) {
                alert('所有字段均为必填。');
                return;
            }
            this.codeTablesData.push({
                id: this.nextId++,
                name: this.codeTableInput.name,
                type: this.codeTableInput.type,
            });
            this.codeTableInput.name = '';
            // 新创建的码表后，保持默认选中的类型为 UTF-8
            this.codeTableInput.type = 'UTF-8';
        },
        editCodeTable(codeTable) {
            this.editData = { ...codeTable };
            this.showEditModal = true;
        },
        updateCodeTable() {
            const index = this.codeTablesData.findIndex(c => c.id === this.editData.id);
            if (index !== -1) {
                this.codeTablesData[index] = this.editData;
                this.showEditModal = false;
            }
        },
        deleteCodeTable(index) {
            const confirmed = confirm('确定要删除这个码表吗？');
            if (confirmed) {
                this.codeTablesData.splice(index, 1);
            }
        },
        closeEditModal() {
            this.showEditModal = false;
        },
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.getElementById('backButton');
    backButton.onclick = function () {
        window.history.back(); // 使用浏览器的历史记录返回上一页
    };
});

app.mount('#app');