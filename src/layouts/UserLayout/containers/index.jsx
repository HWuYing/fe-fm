import React, { Component } from 'react';
import { SYSTEM_NAME } from '@common/config';
import styles from './index.less';

class UserLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className={styles['login-page']}>
        <div className={styles.bg} />
        <div className={[styles.content, 'flex flex-column'].join(' ')}>
          <div className="flex-1">
            <div className={[styles['user-info-container'], 'flex', 'align-item-center'].join(' ')}>
              <div className={styles['left-bg']}>
                <div className={styles['user-layout-left-bg']} />
              </div>
              <div className={['flex-1', styles['user-info']].join(' ')}>
                <div className={styles['user-layout-left-logo']} />
                <div
                  className={['f18', 'letter-spacing-4', 'color-333'].join(' ')}
                  style={{ textAlign: 'center', margin: '30px 0' }}
                >
                  {SYSTEM_NAME}
                </div>
                {children}
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <div>Copyright @2018 智选优家</div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserLayout;
