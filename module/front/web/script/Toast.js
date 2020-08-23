'use strict';

Front.Toast = class Toast extends Front.LoadableContent {

    getUrl () {
        return super.getUrl('read');
    }

    getPostData () {
        return {
            class: 'toast',
            view: 'public',
            id: this.id
        };
    }

    render (data) {
        if (data.author) {
            data.authorId = data.author._id;
            data.authorTitle = data.author._title;
        }
        data.content = Front.escapeHtml(data.content);
        return this.resolveTemplate('toast', data);
    }

    renderError () {
        const text = super.renderError(...arguments);
        return this.resolveTemplate('error', {text});
    }
};

Front.ToastList = class ToastList extends Front.LoadableContent {

    constructor () {
        super(...arguments);
        this.noItemsFound = 'Тосты не найдены';
    }

    init () {
        super.init();
        this.createPagination();
        this.load();
    }

    createPagination () {
        this.pageSize = 6;
        this.pagination = new Front.Pagination(this);
        this.pagination.pageSize = this.pageSize;
        this.on('change:pagination', this.onChangePagination.bind(this));
    }

    getUrl (action = 'list') {
        return super.getUrl(action);
    }

    getPostData () {
        return {
            class: 'toast',
            view: 'public',
            start: this.pagination.getOffset(),
            length: this.pagination.getPageSize()
        };
    }

    onChangePagination () {
        this.load();
    }

    onDone (data) {
        super.onDone(data);
        this.pagination.setTotal(data && data.totalSize);
        this.$content.append(this.pagination.render());
        this.translateContainer();
    }

    render (data) {
        let items = data && data.items;
        items = Array.isArray(items) ? items : [];
        items = items.map(this.renderItem, this).join('');
        return items
            ? this.resolveTemplate('list', {items})
            : this.resolveTemplate('warning', {text: Jam.i18n.translate(this.noItemsFound)});
    }

    renderItem (data) {
        data.authorTitle = data.author && data.author._title;
        data.content = Front.escapeHtml(data.content);
        return this.resolveTemplate('item', data);
    }

    renderError () {
        const text = super.renderError(...arguments);
        return this.resolveTemplate('error', {text});
    }
};

Front.MemberToastList = class MemberToastList extends Front.ToastList {

    init () {
        this.member = this.getData('member');
        super.init();
    }

    getPostData () {
        return Object.assign(super.getPostData(), {
            filter: this.getFilterData()
        });
    }

    getFilterData () {
        return [{
            attr: 'author',
            op: 'equal',
            value: this.member
        }];
    }

    resolveTemplate (name, data) {
        return super.resolveTemplate(name, data, '##', '##');
    }
};