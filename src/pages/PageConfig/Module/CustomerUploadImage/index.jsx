import React, { Component } from 'react';
import { PageLayout } from '@layouts';
import { particulate } from '@components';
import { component } from '@particulate';
import UploadDiscrModal from '../../Components/UploadDiscrModal';
import * as config from './componentConfig';

const { saveRef } = component;
const { createForm } = particulate;

class CustomerUploadImage extends Component {
  constructor(props, context) {
    super(props, context);
    const { floorKey } = this.props;
    this.formComponent = createForm(config[floorKey] || config['defaultKey'], () => {}, {
      onValuesChange: (...arg) => this.onFieldsChange(...arg),
    });
  }

  onItemChange(data) {
    const { dataSource } = this.props;

    this.props.onChange({
      ...dataSource,
      ...data,
    });
  }

  onFieldsChange(props, fields) {
    const { dataSource } = this.props;

    this.props.onChange({
      ...dataSource,
      ...fields,
    });
  }

  validForm = () => {
    return new Promise((resolve, reject) => {
      this.form.validateFieldsAndScroll((err, fields) => {
        if (!err) resolve(true);
        resolve(false);
      });
    });
  };

  render() {
    const {
      dataSource,
      dataSource: { list, limit },
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
          }}
          getForm={saveRef(this, 'form')}
          fieldsStore={dataSource}
        />
        <UploadDiscrModal
          dataSource={list || []}
          floorKey={floorKey}
          limit={limit || 100}
          optionFloor={optionFloor}
          rootContext={{}}
          onChange={(...arg) => this.onItemChange(...arg)}
        />
      </PageLayout>
    );
  }
}

export default CustomerUploadImage;
