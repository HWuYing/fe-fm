import { PROJECT_CONFIG } from '@common/config';
import { typeToLabel } from '@tools';

export default app => {
  const { rootContext } = app;
  return [
    {
      title: '菜单名称',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '系统分类',
      dataIndex: 'menuType',
      width: 120,
      render(value) {
        return typeToLabel(value, PROJECT_CONFIG);
      },
    },
    {
      title: 'path',
      dataIndex: 'path',
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
