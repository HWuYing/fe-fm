import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import { reducer } from '@applyStore';
import { component } from '@particulate';
import * as action from '../action';
import reducersConfig from '../reducers';
import styles from './index.less';

const { Item } = Menu;
const { saveRef } = component;

@connect(({ menu: { topMenu } }) => ({
  topMenu,
}), {
  activeTopItem: action.activeTopItem,
})
@reducer('menu', reducersConfig)
class TopMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isSlide: false,
      transformLeft: 0,
      transformStyle: {
        transform: `translate(0, -50%)`,
      },
    };
    this.containerWidth = 0;
    this.menuContainerWidth = 0;
  }

  componentDidMount() {
    const containerWidth = this.container.offsetWidth;
    const menuContainerWidth = this['menu-container'].offsetWidth;
    if (containerWidth < menuContainerWidth) {
      this.setState({
        isSlide: true,
      });
    }
    this.containerWidth = containerWidth;
    this.menuContainerWidth = menuContainerWidth;
  }

  onMenuItemClick({ key }) {
    const { activeTopItem, topMenu: { selected } } = this.props;
    if (selected.pathHash === key) return;
    activeTopItem(key);
  }

  onSlider(fnName) {
    return () => {
      const sliderWidth = this['slide-containers'].offsetWidth;
      const endLeft = this[fnName](sliderWidth);
      this.setState({
        transformLeft: endLeft,
        transformStyle: {
          transform: `translate(${endLeft}px, -50%)`,
        },
      });
    }
  }

  preSlider(sliderWidth) {
    const { transformLeft } = this.state;
    let endLeft = transformLeft + sliderWidth;
    if (endLeft > 0) endLeft = 0;
    return endLeft;
  }

  nextSlider(sliderWidth) {
    const { transformLeft } = this.state;
    let endLeft = transformLeft - sliderWidth;
    if (Math.abs(endLeft - sliderWidth) > this.menuContainerWidth) {
      endLeft = sliderWidth - this.menuContainerWidth;
    }
    return endLeft;
  }

  render() {
    const { className, topMenu: { selected, list } } = this.props;
    const { isSlide, transformStyle } = this.state;
    return (
      <div ref={saveRef(this, 'container')} className={['flex flex-row',className].join(' ')}>
        <div
          className={styles['slide-icon']}
          data-hidden-label={!isSlide}
          onClick={this.onSlider('preSlider')}
        >
          <Icon type="left" />
        </div>
        <div ref={saveRef(this, 'slide-containers')} className={[styles['top-menu'], styles['top-default'], "flex-1 flex flex-row"].join(' ')}>
          <div
            ref={saveRef(this, 'menu-container')}
            className={[styles['menu-container'], 'flex-1'].join(' ')}
            style={transformStyle}
          >
            <Menu
              selectedKeys={[selected.pathHash]}
              mode="horizontal"
              onClick={(...arg) => this.onMenuItemClick(...arg)}
            >
              { list.map((({ pathHash, name }) => (
                <Item key={pathHash}>{name}</Item>
              ))) }
            </Menu>
          </div>
        </div>
        <div
          className={styles['slide-icon']}
          data-hidden-label={!isSlide}
          onClick={this.onSlider('nextSlider')}
        >
          <Icon type="right" />
        </div>
      </div>
    );
  }
}

export default TopMenu;
