import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Icon } from 'antd';
import { ModalModifyForm, particulate } from '@components';
import DragDropSortOnly from '@components/DragDropSort/index';
import { component } from '@particulate';
import DescribeComponent from '../../Components/DescribeComponent';
import factoryEntryConfig from '../../Module/index';
import * as action from '../action/index';
import { moveArray } from '../../Components/Config/public';
import { formConfig, selectForm } from '../config';

import Style from '../style/index.less';

const { saveRef } = component;
const { createForm } = particulate;
const Form = createForm(formConfig);

@connect(
  ({}) => ({}),
  {
    getDetails: action.detail,
    save: action.save,
    update: action.update,
  }
)
class PageConfig extends Component {
  constructor(props, context) {
    super(props, context);
    const {
      match: {
        params: { pagetype },
      },
    } = props;

    this.state = {
      dataSource: [],
      oldData: {
        id: '',
        type: pagetype,
      },
      editModal: {},
      visible: false,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { type, id },
      },
      getDetails,
    } = this.props;

    if (type.toString() === '2') {
      const dataSource = await getDetails(id);
      const { config } = dataSource;
      this.setState({
        dataSource: config,
        oldData: dataSource,
      });
    }
  }

  addModule = e => {
    const uuId = `${new Date().getTime()}-${parseInt(Math.random(0, 1) * 1000)}`;

    this.setState({
      visible: true,
      editModal: {
        uuId,
      },
    });
  };

  onModuleChange(data) {
    const { uuId } = data;
    const { dataSource } = this.state;

    this.setState({
      dataSource: dataSource.map((item, i) => {
        if (item.uuId === uuId)
          return {
            ...item,
            dataSource: data,
          };
        return item;
      }),
    });
  }

  onSubmit = data => {
    const {
      uuId,
      componentMap: [floor, block],
    } = data;
    const { dataSource } = this.state;

    this.setState({
      dataSource: [
        ...dataSource,
        {
          uuId,
          componentId: floor.value,
          floorKey: block.value,
          floorName: block.label,
          floorOption: block,
          dataSource: { isOpen: '1', uuId },
        },
      ],
    });

    this.onClose();
  };

  submitPage = () => {
    const formKeys = Object.keys(this).filter(item => item.includes('config-'));
    this.form.validateFields((err, fields) => {
      if (!err) {
        const formVFn = formKeys.reduce((prev, now) => {
          console.log(this[now]);
          if (this[now] && this[now].validForm) prev.push(this[now].validForm());
          if (this[now] && this[now].wrappedInstance) {
            // 高阶组件
            prev.push(this[now].wrappedInstance.validForm());
          }
          return prev;
        }, []);
        Promise.all(formVFn).then(res => {
          const isValid = (res || []).reduce((prev, now) => prev && now, true);
          if (isValid) this.submit(fields);
        });
      }
    });
  };

  async submit(fields) {
    const { dataSource, oldData } = this.state;
    await this.props.save({
      ...oldData,
      config: dataSource,
      ...fields,
    });
    this.closeEdit();
  }

  closeEdit() {
    const { pageTitle } = this.props;
    this.props.$util.closeAndSwitch(pageTitle, '页面配置');
  }

  onClose = () => {
    this.setState({ visible: false, editItem: {} });
  };

  delItem(index) {
    const { dataSource } = this.state;
    this.setState({
      dataSource: dataSource.filter((item, i) => i !== index),
    });
  }

  onItemMove = (from, to) => {
    const { dataSource } = this.state;

    this.setState({
      dataSource: moveArray(dataSource, from, to),
    });
  };

  render() {
    const { oldData, dataSource, visible, editModal } = this.state;
    const {
      match: { params },
    } = this.props;

    return (
      <div className={Style.content}>
        <Form
          style={{ marginLeft: '30px', width: '85%' }}
          layoutCol="1"
          layout="inline"
          getForm={saveRef(this, 'form')}
          fieldsStore={oldData}
          rootContext={{
            ...params,
          }}
        />
        <DragDropSortOnly onItemMove={this.onItemMove} className={Style.dragContainer}>
          {(dataSource || []).map((item, i) => (
            <div key={i.toString()} className={Style.dragDropItem}>
              <div className={Style.closeTool} data-index={i}>
                <Icon type="close" data-index={i} onClick={() => this.delItem(i)} />
              </div>
              <DescribeComponent dataSource={item.floorOption} />
              {factoryEntryConfig(item.componentId, {
                ref: saveRef(this, `config-${item.uuId}`),
                key: item.uuId,
                floorKey: item.floorKey,
                dataSource: {
                  uuId: item.uuId,
                  ...(item.dataSource || {}),
                },
                optionFloor: item,
                onChange: (...arg) => this.onModuleChange(...arg),
              })()}
            </div>
          ))}
        </DragDropSortOnly>
        <div className={Style.addFloor}>
          <Button type="primary" icon="add" onClick={() => this.addModule()}>
            添加楼层
          </Button>
        </div>
        <ModalModifyForm
          visible={visible}
          displaySize="ml"
          title="新增楼层"
          dataSource={editModal}
          formConfig={selectForm}
          rootContext={{}}
          onSubmit={(...arg) => this.onSubmit(...arg)}
          onClose={(...arg) => this.onClose(...arg)}
        />
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={this.submitPage}>
            提交
          </Button>
          <Divider type="vertical" />
          <Button onClick={() => this.closeEdit()}>取消</Button>
        </div>
      </div>
    );
  }
}

export default PageConfig;
