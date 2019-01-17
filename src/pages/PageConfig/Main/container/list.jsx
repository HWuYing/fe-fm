import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, message } from 'antd';
import { SearchForm, Authorized, particulate, Popconfirm } from '@components';
import { StandardPage } from '@pageModel';
import { component } from '@particulate';
import * as action from '../action/index';
import { searchConfig, tableConfig } from '../config';

const { saveRef } = component;
const { createStandardToolsTable } = particulate;
const Form = SearchForm(searchConfig);
const Table = createStandardToolsTable(tableConfig, undefined, {
  showDelete: false,
});
const Page = StandardPage(Form, Table);

@connect(
  ({}) => ({}),
  {
    getList: action.getList,
    setUseful: action.uplower,
  }
)
class List extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: {
        total: 0,
        data: [],
      },
    };
  }

  async fetchList(params) {
    const dataSource = await this.props.getList(params);
    this.setState({ dataSource });
  }

  async setUseful(data) {
    const res = await this.props.setUseful({
      id: data.id,
      type: data.type,
    });
    message.success(res.resultMsg);
    this.page.fetchList();
  }

  edit(data, title) {
    const { id, type, pagetype } = data;
    this.props.$util.closeAndOpenPage(title, {
      name: title,
      path: `/system/page-config/${id || 0}/${pagetype || 1}/${type || 0}`,
    });
  }

  renderTools = () => {
    return (
      <Authorized>
        <Button
          icon="plus"
          type="primary"
          onClick={() => this.edit({ pagetype: '1', type: '1' }, '添加配置')}
        >
          添加首页配置
        </Button>
        <Button
          icon="plus"
          type="primary"
          onClick={() => this.edit({ pagetype: '2', type: '1' }, '添加配置')}
        >
          添加我的方案配置
        </Button>
      </Authorized>
    );
  };

  renderAction(value, record) {
    return (
      <Authorized>
        <a
          onClick={() =>
            this.edit(
              {
                ...record,
                type: '2',
              },
              '编辑配置'
            )
          }
        >
          编辑
        </a>
        <Divider type="vertical" />
        <Popconfirm
          placement="topLeft"
          title={`是否设置该条${record.type === 1 ? '首页配置' : '我的家配置'}数据为有效？`}
          okText="是"
          cancelText="否"
          key="batch-delete"
          onConfirm={() => this.setUseful(record)}
        >
          <a>设为有效</a>
        </Popconfirm>
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

export default List;
