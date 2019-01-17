import React, { Component } from 'react';
import { PageLayout } from '@layouts';
import { particulate } from '@components';
import { component } from '@particulate';
import UploadDiscrModal from '../../Components/MultipleUploadDisModal';
import * as config from './componentConfig';

const { saveRef } = component;
const { createForm } = particulate;

class CustomerSlide extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: props.dataSource || {
        isOpen: '1',
      },
    };

    const { floorKey } = this.props;
    this.formComponent = createForm(config[floorKey], () => {}, {
      onValuesChange: (...arg) => this.onFieldsChange(...arg),
    });
  }

  onFieldsChange(props, fields) {
    const { dataSource } = this.props;

    this.props.onChange({
      ...dataSource,
      ...fields,
    });
  }

  onItemChange(data) {
    const { dataSource } = this.props;

    this.props.onChange({
      ...dataSource,
      ...data,
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
      dataSource: { list },
      floorKey,
      optionFloor,
      optionFloor: { floorName },
    } = this.props;
    const FormEdit = this.formComponent;

    return (
      <PageLayout>
        <FormEdit
          style={{ width: '85%' }}
          layoutCol="1"
          layout="inline"
          getForm={saveRef(this, 'form')}
          rootContext={{
            title: floorName,
          }}
          fieldsStore={dataSource}
        />
        <UploadDiscrModal
          dataSource={list || []}
          floorKey={floorKey}
          optionFloor={optionFloor}
          rootContext={{}}
          onChange={(...arg) => this.onItemChange(...arg)}
        />
      </PageLayout>
    );
  }
}

export default CustomerSlide;
