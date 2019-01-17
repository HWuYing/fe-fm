import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { component } from '@particulate';
import { createEventBus } from '@mixin/eventbus';

const { saveRef } = component;

class Page extends Component{
  static childContextTypes = {
    container: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.container = {
      $eventbus: createEventBus(),
      dom: undefined,
    };
  }

  getChildContext() {
    return {
      container: this.container,
    };
  }

  componentDidMount() {
    this.container.dom = this['page-container'];
    this.container.dom.addEventListener('scroll', this.onScroll);
    this.initEventBus();
  }

  componentWillUnmount() {
    this.container.dom.removeEventListener('scroll', this.onScroll);
    this.container = null;
  }

  onScroll = (e) => {
    const { target } = e;
    const { $eventbus } = this.container;
    e.scrollTop = target.scrollTop;
    e.offsetTop = target.offsetTop;
    $eventbus.$emit('onScroll', e);
  };

  initEventBus() {
    const { $eventbus } = this.container;
    $eventbus.$on('onScroll', () => null);
  }

  render() {
    const { children, ...reset} = this.props;
    return (
      <div {...reset} ref={saveRef(this, 'page-container')}>
        { children }
      </div>
    );
  }
}

export default Page;
