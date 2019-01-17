import React, { Component } from 'react';
import { particulate } from '@components';
import { component } from '@particulate';
import * as config from './componentConfig';

const { saveRef } = component;
const { createForm } = particulate;

class MarketingFloor extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: {
        isOpen: '2',
      },
    };
    const { floorKey } = this.props;
    this.formComponent = createForm(config[floorKey] || config['defaultKey'], () => {}, {
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
      optionFloor: { floorName },
    } = this.props;
    const Form = this.formComponent;

    return (
      <Form
        style={{ width: '85%', marginBottom: '0' }}
        layoutCol="1"
        layout="inline"
        getForm={saveRef(this, 'form')}
        rootContext={{
          title: floorName,
        }}
        fieldsStore={dataSource}
      />
    );
  }
}

export default MarketingFloor;
