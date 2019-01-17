import React from 'react';
import { Badge } from 'antd';

export default app => {
  const { rootContext } = app;

  return [
    {
      title: '页面名称',
      dataIndex: 'alias',
      key: 'alias',
      width: 100,
    },
    {
      title: '配置板块',
      dataIndex: 'type',
      key: 'type',
      width: 180,
      render(val, record) {
        return val.toString() === '1' ? 'App首页' : '我的家';
      },
    },
    {
      title: '启用状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      filters: [
        {
          text: '关闭',
          value: 2,
        },
        {
          text: '开启',
          value: 1,
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => (record.status || '').toString() === value,
      render(value) {
        const item = [, { value: 'success', label: '开启' }, { value: 'default', label: '关闭' }][
          value
        ];
        if (!item) return '--';
        return <Badge status={item.value} text={item.label} />;
      },
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 100,
      render: rootContext.renderAction,
    },
  ];
};
