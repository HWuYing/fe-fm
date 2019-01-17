import React from 'react';
import moment from 'moment';

export default app => {
  const { rootContext } = app;
  return [
    {
      title: '组件名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '组件ID',
      dataIndex: 'componentId',
      width: 200,
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 150,
      render: rootContext.renderAction,
    },
  ];
};
