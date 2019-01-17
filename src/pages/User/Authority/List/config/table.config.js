import { statusFlagBadge } from '@tools';

export default app => {
  const { rootContext } = app;
  return [
    {
      title: '角色名称',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'statusFlag',
      width: 120,
      render: (value) => statusFlagBadge(value),
    },
    {
      title: '修改时间',
      dataIndex: 'updateDate',
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 120,
      render: rootContext.renderAction,
    },
  ];
};
