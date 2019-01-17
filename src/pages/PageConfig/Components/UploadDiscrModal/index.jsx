import React, { Component, Fragment } from 'react';
import { Icon } from 'antd';
import { ModalModifyForm, Ellipsis } from '@components';
import DragDropSortOnly from '@components/DragDropSort/index';
import * as config from './componentConfig';
import { moveArray } from '../Config/public';

import Style from '../Config/index.less';

// 下载弹框组件
class UploadDiscrModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      title: '',
      editItem: {},
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
      list: dataSource.filter((item, v) => v !== index),
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

  render() {
    const { visible, title, editItem } = this.state;
    const { rootContext, floorKey, dataSource, mappingImage, mappingTitle, limit } = this.props;

    const formConfig = config[floorKey] || config['defaultKey'];

    return (
      <Fragment>
        <div className={Style.dragContainer} style={{ padding: '0 15px' }}>
          <DragDropSortOnly onItemMove={this.onItemMove} className={Style.dragContainer}>
            {dataSource.map((item, i) => (
              <div
                className={`${Style.dragItem} ${
                  item[mappingTitle || 'title'] ? Style.dragTitle : ''
                }`}
                key={i.toString()}
              >
                <div className={Style.dragTools}>
                  <Icon type="delete" data-index={i} onClick={() => this.delItem(i)} />
                  <Icon type="form" data-index={i} onClick={() => this.editItem(i)} />
                </div>
                <img src={item[mappingImage || 'image']} alt="" />
                <Ellipsis length={11} tooltip className={Style.describe}>
                  {item[mappingTitle || 'title']}
                </Ellipsis>
              </div>
            ))}
          </DragDropSortOnly>
          {limit && dataSource.length >= parseInt(limit) ? null : (
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
          rootContext={rootContext || {}}
          onSubmit={(...arg) => this.onSubmit(...arg)}
          onClose={(...arg) => this.onClose(...arg)}
        />
      </Fragment>
    );
  }
}

export default UploadDiscrModal;
