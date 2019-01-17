import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, message } from 'antd';
import { reducer } from '@applyStore';
import { Authorized, particulate, Popconfirm } from '@components';
import { StandardNoFromPage } from '@pageModel';
import { component } from '@particulate';
import { ActionComponent } from '@applyComponent';
import reducesConfig from '../../store/reducers/index';
import * as action from '../../store/action/index';
import tableConfig from '../config/table.config';

const { saveRef } = component;
const { createBaseTable } = particulate;
const Table = createBaseTable(tableConfig, false);
const Page = StandardNoFromPage(Table);

@connect(
  ({ userGroupManage: { list, total } }) => ({
    dataSource: list,
    total,
  }),
  {
    getList: action.getList,
    deleteOrg: action.deleteOrg,
  }
)
@ActionComponent(async context => context.dispatch(action.getList(null, context)))
@reducer('userGroupManage', reducesConfig)
class EmployeeList extends Component {
  onEdit(id, parentId, orgType, name) {
    const pageName = name || '添加组织';
    const { $util: { closeAndOpen } } = this.props;
    closeAndOpen(pageName, {
      name: pageName,
      path: `/user-manage/group-edit/${id}/${parentId}/${orgType}`,
    });
  }

  async onDelete(id) {
    const { deleteOrg, $util: { refreshPage }, pageTitle, path } = this.props;
    const { resultMsg } = await deleteOrg({
      idList: id,
    });
    message.success(resultMsg);
    refreshPage({
      name: pageTitle,
      path,
    });
  }

  onBatchDelete(selectedRows) {
    this.onDelete(selectedRows.map(data => data.id));
  }

  renderAction(value, record) {
    const { id, parent:parentId, orgType } = record || {};
    return (
      <Authorized>
        <a onClick={() => this.onEdit(0, id, orgType, '添加子部门')}>添加子部门</a>
        <Divider type="vertical" />
        <a onClick={() => this.onEdit(id, parentId, '-1', '编辑部门')}>编辑</a>
        <Popconfirm
          author={() => record.parent !== '0'}
          placement="topLeft"
          title="删除选中数据？"
          onConfirm={() => this.onDelete([id])}
          key="batch-delete"
        >
          <Divider type="vertical" />
          <a>删除</a>
        </Popconfirm>
      </Authorized>
    );
  }

  renderTools() {
    return (
      <Authorized>
        <Button author="NOT_SHOW" icon="plus" type="primary" onClick={() => this.onEdit(0, 0, '-1')}>
          添加组织
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
        defaultExpandAllRows
        onBatchDelete={(...arg) => this.onBatchDelete(...arg)}
        renderTools={this.renderTools()}
        dataSource={dataSource}
        total={total}
      />
    );
  }
}

export default EmployeeList;
