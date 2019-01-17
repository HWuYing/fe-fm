import React, { Component, Fragment } from 'react';
import { Form, Icon, message } from 'antd';
import { connect } from 'react-redux';
import * as rexRules from '@tools';
import { ModalModifyForm, CascaderFormItem } from '@components';
import DragDropSortOnly from '@components/DragDropSort/index';
import GoodsSearchModel from '@components/particulate/SelectEntityModel';
import * as config from './componentConfig';
import { moveArray } from '../Config/public';
import * as action from '../../Main/action/index';

import Style from '../Config/index.less';

// 下载弹框组件
const FormItem = Form.Item;

@connect(
  ({}) => ({}),
  {
    getSkuList: action.getAppSkuList,
  }
)
class UploadDiscrModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      title: '',
      editItem: {},
      skuData: {
        data: [],
        total: 0,
      },
    };
  }

  onItemMove = (from, to) => {
    const { dataSource, onChange } = this.props;

    onChange({
      list: moveArray(dataSource, from, to),
    });
  };

  editItem(index) {
    const { dataSource } = this.props;
    const data = dataSource[index];

    this.setState({
      visible: true,
      title: data ? '编辑模块' : '新增模块',
      editItem: {
        ...data,
        editIndex: index,
      } || { editIndex: index },
    });
  }

  delItem(index) {
    const { dataSource, onChange } = this.props;

    onChange({
      list: dataSource.filter((item, v) => v.toString() !== index),
    });
  }

  onSubmit(data) {
    const { editIndex } = data;
    const { dataSource, onChange } = this.props;

    dataSource[editIndex] = data;

    onChange({
      list: dataSource,
    });

    this.onClose();
  }

  onClose() {
    this.setState({ visible: false, editItem: {} });
  }

  async loadData(params) {
    const { getSkuList } = this.props;
    const data = await getSkuList(params);

    this.setState({
      skuData: data,
    });
  }

  addSkuItem = data => {
    const { editItem } = this.state;
    const { id } = data;

    this.setState({
      editItem: {
        ...editItem,
        sku: data,
        skuId: id,
      },
    });
  };

  renderGoodsSelect(props, decoratorNode, fileEle, form) {
    const { getFieldDecorator } = form;
    const {
      skuData,
      editItem: { sku },
    } = this.state;
    const formData = form.getFieldsValue();

    if (!formData.type || formData.type !== 'good') return null;

    return (
      <FormItem label="选择商品">
        {getFieldDecorator('sku', {
          rules: [rexRules.selectRequired],
          initialValue: sku,
        })(
          <GoodsSearchModel
            showKey="name"
            selectOne={true}
            dataSource={skuData}
            onChange={data => this.addSkuItem(data, formData)}
            loadData={(...arg) => this.loadData(...arg)}
          />
        )}
      </FormItem>
    );
  }

  renderCascaderFormItem(props, decoratorNode, fileEle, form) {
    const { editItem } = this.state;

    return CascaderFormItem({
      form,
      fieldsStore: { ...editItem },
      ownKey: 'type',
      ownConfig: {
        label: '跳转内容',
        entry: {
          key: 'select',
          children: [
            {
              value: 'url',
              label: 'url',
            },
            {
              value: 'brand',
              label: '商品品牌',
            },
            {
              value: 'category',
              label: '商品分类',
            },
            {
              value: 'good',
              label: '商品详情',
            },
          ],
        },
        filedDecorator: {
          key: 'type',
          rules: [rexRules.inputRequired],
        },
      },
      optionConfig: {
        url: {
          config: {
            col: 1,
            decorator: [
              {
                label: '填写URL',
                entry: {
                  key: 'input',
                },
                filedDecorator: {
                  key: 'url',
                  rules: [rexRules.inputRequired],
                },
              },
            ],
          },
        },
        brand: {
          config: {
            col: 1,
            decorator: [
              {
                label: '选择品牌',
                entry: {
                  key: 'connectSelect',
                  showSearch: true,
                  labelName: 'name',
                  valueName: 'id',
                  placeholder: '请输入',
                  serviceApi: 'queryBrands',
                  storeKey: 'brandsEnum',
                  mappingTo: 'children',
                  filterOption: (input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                },
                filedDecorator: {
                  key: 'brandId',
                  rules: [rexRules.selectRequired],
                },
              },
            ],
          },
        },
        category: {
          config: {
            col: 1,
            decorator: [
              {
                label: '选择品类',
                entry: {
                  key: 'connectTreeSelect',
                  showSearch: true,
                  onlySelectLeaf: true,
                  treeDefaultExpandAll: true,
                  titleName: 'name',
                  valueName: 'id',
                  serviceApi: 'queryCategory',
                  storeKey: 'categoryEnum',
                  mappingTo: 'children',
                  filterTreeNode: (input, option) =>
                    option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                },
                filedDecorator: {
                  key: 'categoryId',
                  rules: [rexRules.selectRequired],
                },
              },
            ],
          },
        },
      },
    });
  }

  render() {
    const { visible, title, editItem } = this.state;
    const { rootContext, floorKey, dataSource, limit } = this.props;

    const formConfig = config[floorKey];

    return (
      <Fragment>
        <div className={Style.dragContainer} style={{ padding: '0 15px' }}>
          <DragDropSortOnly onItemMove={this.onItemMove} className={Style.dragContainer}>
            {dataSource.map((item, i) => (
              <div className={Style.dragItem} key={i.toString()}>
                <div className={Style.dragTools}>
                  <Icon type="delete" data-index={i} onClick={() => this.delItem(i)} />
                  <Icon type="form" data-index={i} onClick={() => this.editItem(i)} />
                </div>
                <img src={item.image} alt="" />
              </div>
            ))}
          </DragDropSortOnly>
          {limit && dataSource.length > parseInt(limit) ? null : (
            <div
              onClick={() => this.editItem(dataSource.length)}
              className={Style.addItem}
              data-index={dataSource.length}
            >
              <div className={Style.emptyUpload} data-index={dataSource.length}>
                <Icon type="plus" data-index={dataSource.length} />
                <div className={Style.uploadText} data-index={dataSource.length}>
                  上传
                </div>
              </div>
            </div>
          )}
        </div>
        <ModalModifyForm
          visible={visible}
          title={title}
          displaySize="ml"
          dataSource={editItem}
          formConfig={formConfig}
          rootContext={{
            renderCascaderFormItem: (...arg) => this.renderCascaderFormItem(...arg),
            renderGoodsSelect: (...arg) => this.renderGoodsSelect(...arg),
            ...(rootContext || {}),
          }}
          onSubmit={(...arg) => this.onSubmit(...arg)}
          onClose={(...arg) => this.onClose(...arg)}
        />
      </Fragment>
    );
  }
}

export default UploadDiscrModal;
