/* eslint-disable */
import React, { Component } from 'react';
import styles from './index.less';

class DescribeComponent extends Component {
  render() {
    const { image, description = '' } = this.props.dataSource;

    return (
      <div className={`${styles.describe}`}>
        <img src={image || 'http://placeholder.qiniudn.com/50x50/FFF//fff'} />
        <div>{description}</div>
      </div>
    );
  }
}

export default DescribeComponent;
