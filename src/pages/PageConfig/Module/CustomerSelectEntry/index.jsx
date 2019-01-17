import React, { Component } from 'react';
import { Form, message } from 'antd';
import { connect } from 'react-redux';
import * as rexRules from '@tools';
import { PageLayout } from '@layouts';
import { particulate } from '@components';
import { component } from '@particulate';
import GoodsSearchModel from '@components/particulate/SelectEntityModel';
import UploadDiscrModal from '../../Components/UploadDiscrModal';
import * as config from './componentConfig';
import * as action from '../../Main/action/index';
import {
  planSearchConfig,
  planTableConfig,
  brandSearchConfig,
  brandTableConfig,
} from './entryConfig';

const FormItem = Form.Item;
const { saveRef } = component;
const { createForm } = particulate;

@connect(
  ({}) => ({}),
  {
    getSkuList: action.getAppSkuList,
    getPlan: action.getPlan,
    getSkuBrands: action.getSkuBrands,
  },
  null,
  { withRef: true }
)
class CustomerSelectEntry extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      skuData: {
        data: [],
        total: 0,
      },
      planData: {
        data: [],
        total: 0,
      },
      brandData: {
        data: [],
        total: 0,
      },
    };
    const { floorKey } = this.props;
    this.formComponent = createForm(config[floorKey] || config['defaultKey'], () => {}, {
      onValuesChange: (...arg) => this.onFieldsChange(...arg),
    });
  }

  onItemChange(data) {
    const { dataSource } = this.props;

    this.setState({
      ...dataSource,
      list: data,
    });
  }

  onFieldsChange(props, fields) {
    const { dataSource } = this.props;

    if (Object.keys(fields)[0] === 'mainGood') {
      // 主商品选择
      const mainGood = Object.values(fields)[0] || {};
      fields = {
        mainGood: {
          ...mainGood,
          title: mainGood.title || mainGood.name,
        },
      };
    }

    this.props.onChange({
      ...dataSource,
      ...fields,
    });
  }

  addPlanItem(data) {
    const { dataSource } = this.props;
    const { list = [] } = dataSource;

    const result = [];
    data.forEach(item => {
      const { id, housingName, image } = item;
      const hasThis = list.find(v => v.id === id);
      if (!hasThis)
        result.push({
          id,
          image,
          title: housingName,
        });
    });
    this.onItemChange({ list: [...list, ...result] });
  }

  renderSelectPlan(props, decoratorNode, fileEle, form) {
    const { planData } = this.state;
    const {
      dataSource: { list = [] },
    } = this.props;

    return (
      <FormItem label="选择方案">
        <GoodsSearchModel
          showKey="title"
          value={list}
          dataSource={planData}
          formConfig={planSearchConfig}
          tableConfig={planTableConfig}
          onChange={data => this.addPlanItem(data)}
          loadData={(...arg) => this.loadData('getPlan', 'planData', ...arg)}
        />
      </FormItem>
    );
  }

  async loadData(api, storeKey, params) {
    const data = await this.props[api](params);

    this.setState({
      [storeKey]: data,
    });
  }

  addSkuItem(data) {
    const { dataSource } = this.props;
    const { list = [] } = dataSource;

    const result = [];
    data.forEach(item => {
      const { id, name, skuType, image } = item;
      const hasThis = list.find(v => v.id === id);
      if (!hasThis)
        result.push({
          id,
          skuType,
          image,
          title: name,
          name,
        });
    });
    this.onItemChange({ list: [...list, ...result] });
  }

  renderGoodsSelect(props, decoratorNode, fileEle, form) {
    const {
      dataSource: { list = [] },
    } = this.props;
    const { skuData } = this.state;

    return (
      <FormItem label="选择商品">
        <GoodsSearchModel
          key="skuList"
          showKey="name"
          selectOne={false}
          value={list}
          dataSource={skuData}
          onChange={data => this.addSkuItem(data)}
          loadData={(...arg) => this.loadData('getSkuList', 'skuData', ...arg)}
        />
      </FormItem>
    );
  }

  renderMainGoods(props, decoratorNode, fileEle, form) {
    const { getFieldDecorator } = form;
    const {
      floorKey,
      dataSource: { mainGood },
    } = this.props;
    const { skuData } = this.state;

    return (
      <FormItem label="选择主商品">
        {getFieldDecorator('mainGood', {
          rules: [rexRules.selectRequired],
          initialValue: mainGood || undefined,
        })(
          <GoodsSearchModel
            key="skuList"
            showKey="name"
            selectOne={true}
            dataSource={skuData}
            loadData={(...arg) => this.loadData('getSkuList', 'skuData', ...arg)}
          />
        )}
        <UploadDiscrModal
          dataSource={mainGood ? [mainGood] : []}
          floorKey={floorKey}
          optionFloor={{
            limit: 1,
          }}
          mappingImage="image"
          rootContext={{}}
          onChange={(...arg) => this.onMainGoodsChange(...arg)}
        />
      </FormItem>
    );
  }

  onMainGoodsChange(data) {
    this.onItemChange({
      mainGood: data.list[0],
    });
  }

  onItemChange(data) {
    const { dataSource } = this.props;

    this.props.onChange({
      ...dataSource,
      ...data,
    });
  }

  addBrandsItem(data) {
    const { dataSource } = this.props;
    const { list = [] } = dataSource;

    const result = [];
    data.forEach(item => {
      const { id, name, logo } = item;
      const hasThis = list.find(v => v.id === id);
      if (!hasThis)
        result.push({
          id,
          image: logo,
          title: name,
          name,
        });
    });
    this.onItemChange({ list: [...list, ...result] });
  }

  renderBrandsSelect(props, decoratorNode, fileEle, form) {
    const { brandData } = this.state;
    const {
      dataSource: { list = [] },
    } = this.props;

    return (
      <FormItem label="选择品牌">
        <GoodsSearchModel
          showKey="name"
          value={list}
          dataSource={brandData}
          formConfig={brandSearchConfig}
          tableConfig={brandTableConfig}
          onChange={data => this.addBrandsItem(data)}
          loadData={(...arg) => this.loadData('getSkuBrands', 'brandData', ...arg)}
        />
      </FormItem>
    );
  }

  validForm = () => {
    const {
      dataSource: { list },
    } = this.props;

    return new Promise((resolve, reject) => {
      if (!list || list.length < 1) {
        message.error('列表数据不得少于一条！');
        resolve(false);
      }
      this.form.validateFieldsAndScroll((err, fields) => {
        if (!err) resolve(true);
        resolve(false);
      });
    });
  };

  render() {
    const {
      dataSource,
      dataSource: { list },
      floorKey,
      optionFloor,
      optionFloor: { floorName },
    } = this.props;

    const Form = this.formComponent;

    return (
      <PageLayout>
        <Form
          style={{ width: '85%' }}
          layoutCol="1"
          layout="inline"
          rootContext={{
            title: floorName,
            renderBrandsSelect: (...arg) => this.renderBrandsSelect(...arg),
            renderSelectPlan: (...arg) => this.renderSelectPlan(...arg),
            renderMainGoods: (...arg) => this.renderMainGoods(...arg),
            renderGoodsSelect: (...arg) => this.renderGoodsSelect(...arg),
          }}
          getForm={saveRef(this, 'form')}
          fieldsStore={dataSource}
        />
        {list ? (
          <UploadDiscrModal
            dataSource={list || []}
            floorKey={config[floorKey] ? floorKey : 'goodsPromotion'}
            optionFloor={{
              ...optionFloor,
            }}
            limit="0"
            mappingImage="image"
            // mappingTitle="name"
            rootContext={{}}
            onChange={(...arg) => this.onItemChange(...arg)}
          />
        ) : null}
      </PageLayout>
    );
  }
}

export default CustomerSelectEntry;
