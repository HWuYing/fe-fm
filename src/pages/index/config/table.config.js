import React from 'react';
import { Badge } from 'antd';

export default () => [
  {
    title: '门店名称',
    dataIndex: 'shopName',
    width: 60,
    decorator: {
      entry: {
        key: 'select',
        children: [{ label: '1', value: '1' }],
      },
      filedDecorator: {
        getValueProps(fieldsValue, record) {
          return record.shopName;
        },
      },
    },
  },
  {
    title: '联系人',
    dataIndex: 'linkMan',
    width: 60,
    decorator: {
      entry: {
        key: 'input',
      },
    },
  },
  {
    title: '联系手机',
    dataIndex: 'linkTel',
    width: 60,
  },
  {
    title: '门店等级',
    dataIndex: 'companyLevel',
    width: 60,
  },
  {
    title: '门店所在区域',
    dataIndex: 'linkAddress',
    width: 60,
  },
  {
    title: '状态',
    dataIndex: 'statusFlag',
    width: 60,
    render(value) {
      const item = [{ value: 'default', label: '关闭' }, { value: 'default', label: '关闭' }][
        value
      ];
      if (!item) return '--';
      return <Badge status={item.value} text={item.label} />;
    },
  },
  {
    title: '添加时间',
    dataIndex: 'updateTime',
    width: 60,
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 60,
  },
];
