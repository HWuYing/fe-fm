export default app => {
  const { rootContext } = app;
  return [{
    title: '全部',
    dataIndex: 'name',
    width: 120,
  }, {
    title: 'path',
    dataIndex: 'path',
    width: 220,
  }, {
    title: '权限控制',
    dataIndex: 'checkAuth',
    width: 120,
    render: rootContext.renderAction,
  }];
};
