import { statusFlagBadge, typeToLabel } from '@tools';
import moment from 'moment';
import { ORDER_TYPE } from '../../../config/enum.config';

export default app => {
  const { rootContext } = app;
  return [
    {
      title: '组织类型',
      dataIndex: 'orgType',
      width: 160,
      render: value => typeToLabel(value, ORDER_TYPE),
    },
    {
      title: '组织名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '联系电话',
      dataIndex: 'linkTel',
      width: 160,
    },
    {
      title: '状态',
      dataIndex: 'statusFlag',
      width: 120,
      render: (value) => statusFlagBadge(value),
    },
    {
      title: '添加时间',
      dataIndex: 'updateTime',
      width: 210,
      render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 200,
      render: rootContext.renderAction,
    },
  ];
};
