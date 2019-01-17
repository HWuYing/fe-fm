import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Card, Checkbox} from 'antd';
import { factoryRecursion } from '@tools';
import { reducer } from '@applyStore';
import { PageLayout } from '@layouts';
import { ActionComponent } from '@applyComponent';
import { particulate } from '@components';
import { component } from '@particulate';
import reducesConfig from '../../store/reducers/index';
import * as action from '../../store/action/index';
import formConfig from '../config/form.config';
import tableConfig from '../config/table.config';

const { saveRef } = component;
const { createForm, createBaseTable } = particulate;
const Form = createForm(formConfig);
const Table = createBaseTable(tableConfig, false);

@connect(
  ({ menuManage: { details, list } }) => ({
    details,
    list,
  }),
  {
    getMenuList: action.getAuthMenuList,
    getOrgList: action.getOrgList,
    getDetails: action.getDetails,
    save: action.save,
  }
)
@ActionComponent(async context => context.dispatch(action.getAuthMenuList(null, context)))
@reducer('authorManage', reducesConfig)
class MenuEdit extends Component {
  constructor(props, context) {
    super(props, context);
    const { data: { data: menuList = []}  } = props;
    this.state = {
      details: {},
      menuList,
      orgList: [],
    };
    this.recursion = undefined;
  }

  componentDidMount() {
    const {
      match: { params },
      getDetails,
      getOrgList,
    } = this.props;
    const { menuList } = this.state;
    Promise.all([
      getDetails(params),
      getOrgList({ pageNum: 1, pageSize: 1000 }),
    ]).then(res => {
      const [details, { data:orgList=[] }] = res;
      this.setState({
        details,
        menuList: this.resetAuthCheckList(menuList, details),
        orgList,
      });
    });
  }

  async onSubmit(fields) {
    const { save, pageTitle } = this.props;
    const { details } = this.state;
    const { orgIds } = fields;
    const menus = [];
    const { $util: { closeAndSwitchRefresh }, fromMenu: {
      fromTitle,
    }={} } = this.props;
    this.recursion.each(d => {
      if(d.checkAuth && !menus.includes(d.id)){
        menus.push(d.id)
      }
    });
    await save({
      ...details,
      ...fields,
      menuIds: menus,
      orgIds: Array.isArray(orgIds) ? orgIds : [ orgIds ],
    });
    closeAndSwitchRefresh(pageTitle, fromTitle);
  }

  closeEdit() {
    const { pageTitle,fromMenu: { fromTitle } = {} } = this.props;
    const { $util: { closeAndSwitch } } = this.props;
    closeAndSwitch(pageTitle, fromTitle);
  }

  resetAuthCheckList(menuList, details) {
    const menus = details.menuIds || [];
    this.recursion = factoryRecursion(menuList);
    return this.recursion.each((d) => {
      Object.assign(d, { checkAuth: menus.indexOf(d.id) !== -1 });
    });
  }

  checkAuthChange(value, record) {
    const { menuList } = this.state;
    Object.assign(record, { checkAuth: value.target.checked });
    if (record.parent.toString() !== '0' && value.target.checked) {
      this.recursion.each(d => {
        if (d.id === record.parent) this.checkAuthChange(value, d);
        return d;
      });
    } else if (record.children && record.children.length !== 0 && !value.target.checked) {
      record.children.forEach(d => this.checkAuthChange(value, d));
    }
    this.setState({
      menuList: menuList.map(d => d),
    });
  }

  renderAction(value, record) {
    return (
      <Checkbox
        checked={record.checkAuth}
        onChange={targetValue => this.checkAuthChange(targetValue, record)}
      />
    );
  }

  render() {
    const { menuList, orgList, details } = this.state;
    return (
      <PageLayout>
        <div className="flex-1" style={{overflow: 'auto'}}>
          <Form
            style={{ marginLeft: '30px', width: '60%' }}
            layoutCol="1"
            layout="inline"
            getForm={saveRef(this, 'form')}
            fieldsStore={details}
            rootContext={{ orgList }}
            onSubmit={(...arg) => this.onSubmit(...arg)}
          />
          <Card title="权限设置" bordered={false}>
            <Table
              rootContext={{
                renderAction: (...arg) => this.renderAction(...arg),
              }}
              defaultExpandAllRows
              dataSource={menuList}
            />
          </Card>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <Button onClick={() => this.form.onSubmit()}>
            提交
          </Button>
          <Divider type="vertical" />
          <Button onClick={() => this.closeEdit()}>取消</Button>
        </div>
      </PageLayout>
    );
  }
}

export default MenuEdit;
