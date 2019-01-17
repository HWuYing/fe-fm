import { PROJECT_CONFIG } from '@common/config';
import * as rexRules from '@tools';

export default (app, rootContext) => {
  const { treeData } = rootContext;
  return [
    {
      label: '上级菜单',
      entry: {
        disabled: true,
        key: 'treeSelect',
        titleName: 'name',
        valueName: 'id',
        children: [].concat(
          {
            name: '系统菜单',
            id: '0',
            key: '0-100086',
          },
          treeData
        ),
      },
      filedDecorator: {
        key: 'parent',
        rules: [rexRules.selectRequired],
      },
    },
    {
      item: {
        label: '系统分类',
      },
      entry: {
        key: 'select',
        children: PROJECT_CONFIG,
        disabled: true,
      },
      filedDecorator: {
        key: 'menuType',
        rules: [rexRules.selectRequired],
      },
    },
    {
      item: {
        label: '菜单名称',
      },
      entry: {
        key: 'input',
        placeholder: '请输入菜单名称',
      },
      filedDecorator: {
        key: 'name',
        rules: [rexRules.inputRequired],
      },
    },
    {
      item: {
        label: '菜单链接',
      },
      entry: {
        key: 'input',
        placeholder: '请输入菜单链接',
      },
      filedDecorator: {
        key: 'path',
        rules: [rexRules.inputRequired],
      },
    },
    {
      item: {
        label: '排序',
      },
      entry: {
        key: 'input',
        type: 'number',
        placeholder: '请输入排序值',
      },
      filedDecorator: {
        key: 'sort',
      },
    },
    {
      item: {
        label: '特殊加载',
      },
      entry: {
        key: 'input',
        placeholder: '请输入特殊加载',
      },
      filedDecorator: {
        key: 'hasKey',
      },
    },
    {
      item: {
        label: '图标',
      },
      entry: {
        key: 'input',
        placeholder: '请输入图标字体',
      },
      filedDecorator: {
        key: 'icon',
      },
    },
    {
      item: {
        label: '是否开启',
      },
      entry: {
        key: 'switch',
        checkedChildren: '开',
        unCheckedChildren: '关',
      },
      filedDecorator: {
        key: 'statusFlag',
        initialValue: 1,
      },
    },
  ];
};
