import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, message } from 'antd';
import { Authorized, particulate } from '@components';
import { StandardNoFromPage } from '@pageModel';
import { component } from '@particulate';
import * as action from '../action/index';
import tableConfig from '../config/table.config';

const { saveRef } = component;
const { createStandardToolsBasicTable } = particulate;
const Table = createStandardToolsBasicTable(tableConfig, undefined, {
  showDelete: false,
});
const Page = StandardNoFromPage(Table);

@connect(
  ({}) => ({}),
  {
    getList: action.getList,
  }
)
class CategoryList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: {
        total: 0,
        data: [],
      },
    };
  }

  renderTools = () => {
    return (
      <Button icon="plus" type="primary" onClick={() => this.editCategory(0, 1, 1)}>
        添加组件
      </Button>
    );
  };

  editCategory(id, type, level) {
    this.props.$util.openPage({
      name: id ? '编辑组件' : '添加组件',
      path: `/system/page-ui-edit/${id || 0}/${type || 1}/${level || 1}`,
    });
  }

  async fetchList(params) {
    const dataSource = await this.props.getList(params);
    this.setState({ dataSource });
  }

  renderAction(value, record) {
    return (
      <Authorized>
        {record.level > 1 ? null : (
          <a onClick={() => this.editCategory(record.id, 1, record.level + 1)}>新增子组件</a>
        )}
        <Divider type="vertical" />
        <a onClick={() => this.editCategory(record.id, 2, record.level)}>编辑</a>
      </Authorized>
    );
  }

  render() {
    const {
      dataSource: { total, data },
    } = this.state;

    return (
      <Page
        getPage={saveRef(this, 'page')}
        tableContext={{
          renderAction: (...arg) => this.renderAction(...arg),
        }}
        defaultExpandAllRows
        fetchList={(...arg) => this.fetchList(...arg)}
        renderTools={this.renderTools()}
        dataSource={data}
        total={total}
      />
    );
  }
}

export default CategoryList;
