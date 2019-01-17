import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider } from 'antd';
import { reducer } from '@applyStore';
import { SearchForm, Authorized, particulate, Popconfirm } from '@components';
import { ActionComponent } from '@applyComponent';
import { StandardPage } from '@pageModel';
import { component } from '@particulate';
import reducesConfig from '../../store/reducers/index';
import * as action from '../../store/action/index';
import formConfig from '../config/form.config';
import tableConfig from '../config/table.config';

const { saveRef } = component;
const { createStandardToolsBasicTable } = particulate;
const Form = SearchForm(formConfig);
const Table = createStandardToolsBasicTable(tableConfig, false);
const Page = StandardPage(Form, Table);

@connect(
  ({ menuManage: { list, total, search } }) => ({
    dataSource: list,
    total,
    search,
  }),
  {
    setSearch: action.setSearch,
    getList: action.getList,
    menuDelete: action.menuDelete,
  }
)
@reducer('menuManage', reducesConfig)
@ActionComponent(async context => {
  const { dispatch, state: { menuManage: { search } } } = context;
  dispatch(action.getList(search, context))
})
class MenuManage extends Component {
  componentWillUnmount() {
    const { form } = this.page;
    const { setSearch } = this.props;
    setSearch(form.getFieldsValue());
  }

  onEdit(parent, id, name) {
    const { form } = this.page;
    const { menuType } = form.getFieldsValue();
    const pageName = name || '添加菜单';
    const { $util: { closeAndOpen } } = this.props;
    closeAndOpen(pageName, {
      name: pageName,
      path: `/user-manage/menu-edit/${parent}/${id}/${menuType}`,
    });
  }

  async onDelete(id) {
    const { menuDelete } = this.props;
    await menuDelete({ idList: id });
    this.page.fetchList();
  }

  fetchList(params) {
    const { getList } = this.props;
    getList(params);
  }

  renderAction(value, record) {
    return (
      <Authorized>
        <a onClick={() => this.onEdit(record.id, 0, '添加子菜单')}>添加子菜单</a>
        <Divider type="vertical" />
        <a onClick={() => this.onEdit(record.parent, record.id, '编辑菜单')}>编辑</a>
        <Divider type="vertical" />
        <Popconfirm
          placement="topLeft"
          title="删除选中数据？"
          onConfirm={() => this.onDelete([record.id])}
          okText="Yes"
          cancelText="No"
          key="batch-delete"
        >
          <a>删除</a>
        </Popconfirm>
      </Authorized>
    );
  }

  renderTools() {
    return (
      <Authorized>
        <Button icon="plus" type="primary" onClick={() => this.onEdit(0, 0, '添加菜单')}>
          添加菜单
        </Button>
      </Authorized>
    );
  }

  render() {
    const { dataSource, total, search } = this.props;
    return (
      <Page
        getPage={saveRef(this, 'page')}
        tableContext={{
          renderAction: (...arg) => this.renderAction(...arg),
        }}
        formContext={{
          search,
        }}
        defaultFetch={false}
        fetchList={(...arg) => this.fetchList(...arg)}
        renderTools={this.renderTools()}
        dataSource={dataSource}
        total={total}
      />
    );
  }
}

export default MenuManage;
