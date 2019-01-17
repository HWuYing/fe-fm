import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider } from 'antd';
import { reducer } from '@applyStore';
import { SearchForm, Authorized, particulate, Popconfirm } from '@components';
import { StandardPage } from '@pageModel';
import { component } from '@particulate';
import reducesConfig from '../../store/reducers/index';
import * as action from '../../store/action/index';
import formConfig from '../config/form.config';
import tableConfig from '../config/table.config';

const { saveRef } = component;
const { createStandardToolsTable } = particulate;
const Form = SearchForm(formConfig);
const Table = createStandardToolsTable(tableConfig);
const Page = StandardPage(Form, Table);

@connect(
  ({ authorManage: { list, total } }) => ({
    dataSource: list,
    total,
  }),
  {
    getList: action.getList,
    deleteRol: action.deleteRol,
  }
)
@reducer('authorManage', reducesConfig)
class MenuManage extends Component {
  onEdit(parent, id, name) {
    const pageName = name || '新建角色';
    const { $util: { closeAndOpen } } = this.props;
    closeAndOpen(pageName, {
      name: pageName,
      path: `/user-manage/authority-edit/${id}`,
    });
  }

  async onDelete(id) {
    const { deleteRol } = this.props;
    await deleteRol({ idList: id });
    this.page.fetchList();
  }

  onBatchDelete(selectedRows) {
    this.onDelete(selectedRows.map(data => data.id));
  }

  fetchList(params) {
    const { getList } = this.props;
    getList(params);
  }

  renderAction(value, record) {
    return (
      <Authorized>
        <a onClick={() => this.onEdit(record.parent, record.id, '编辑角色')}>编辑</a>
        <Divider type="vertical" />
        <Popconfirm
          placement="topLeft"
          title="删除选中数据？"
          onConfirm={() => this.onDelete([record.id])}
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
        <Button icon="plus" type="primary" onClick={() => this.onEdit(0, 0)}>
          新建角色
        </Button>
      </Authorized>
    );
  }

  render() {
    const { dataSource, total } = this.props;
    return (
      <Page
        getPage={saveRef(this, 'page')}
        tableContext={{
          renderAction: (...arg) => this.renderAction(...arg),
        }}
        onBatchDelete={(...arg) => this.onBatchDelete(...arg)}
        fetchList={(...arg) => this.fetchList(...arg)}
        renderTools={this.renderTools()}
        dataSource={dataSource}
        total={total}
      />
    );
  }
}

export default MenuManage;
