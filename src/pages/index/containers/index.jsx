import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { ActionComponent, RoutePath } from '@applyComponent';
import { reducer } from '@applyStore';
import { component } from '@particulate';
import { SearchForm, Authorized, particulate } from '@components';
import reducersPage from '../reducers';
import { searchConfig, tableConfig } from '../config';

const { saveRef } = component;
const { createStandardToolsTable, createEditTable } = particulate;
const Form = SearchForm(searchConfig);
const Table = createStandardToolsTable(tableConfig);
const EditTable = createEditTable(tableConfig);

@RoutePath('/index')
@connect(({ index }) => ({
  index,
}))
@ActionComponent(async ({ match }) => {
  /* eslint-disable no-console */
  console.log(match);
  return { title: '首页' };
})
@reducer('index', reducersPage)
class Index extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      source: (() => {
        return Array.from(Array(2), ((item, index) => ({shopName: index, linkMan: 1})))
      })(),
    }
  }

  componentDidMount() {
    console.log(this.table.getPaginationParams());
    console.log(this.table.clearSelectedRowKeys);
  }

  renderTools = () => {
    return (
      <Authorized author={{ type: 'edit' }}>
        <Button type="primary">默认</Button>
        <Button type="primary" author={{ type: 'edit' }}>
          修改
        </Button>
        <Button author={{ type: 'add' }}>添加</Button>
      </Authorized>
    );
  };

  onSourceChange(index, record) {
    const { source } = this.state;
    console.log(record);
    Object.assign(source[index], {
      ...record,
      shopName: Number(record.shopName || 0) + 2,
    });
  }

  render() {
    const { source } = this.state;
    return (
      <div className="page-component flex flex-column">
        <Form />
        <EditTable
          dataSource={source}
          onSourceChange={(...arg) => this.onSourceChange(...arg)}
        />
        <Table
          tools={() => this.renderTools()}
          getTable={saveRef(this, 'table')}
          isHeadFixed={false}
          dataSource={[{}, {}, {}, {}, {}, {}, {}, {}]}
        />
      </div>
    );
  }
}

export default Index;
