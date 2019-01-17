import React from 'react';
import { Badge } from 'antd';
import moment from 'moment';

export default app => {
  return [
    {
      title: '品牌名称',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: '品牌编码',
      dataIndex: 'code',
      key: 'code',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      render(value) {
        const item = [{}, { value: 'success', label: '开启' }, { value: 'default', label: '关闭' }][
          value
        ];
        if (!item) return '--';
        return <Badge status={item.value} text={item.label} />;
      },
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      width: 180,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];
};
