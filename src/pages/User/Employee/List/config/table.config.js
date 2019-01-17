import { statusFlagBadge, typeToLabel } from '@tools';
import moment from 'moment';
import { USER_TYPE } from '../../../config/enum.config';

export default app => {
  const { rootContext } = app;
  return [
    {
      title: '昵称',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '联系电话',
      dataIndex: 'tel',
      width: 120,
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
      width: 120,
      render: (value) => typeToLabel(value, USER_TYPE),
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
      width: 120,
      render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 120,
      render: rootContext.renderAction,
    },
  ];
};
