import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Menu } from 'element-react';
import { withRouter } from 'react-router-dom';
import Header from '../header';
import { TabsView } from '../../component';
import { mainAction } from '../../redux';
import styles from './styles';

class Main extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    children: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    if (this.header && this.tabsView) {
      const height = window.innerHeight - this.header.offsetHeight - this.tabsView.offsetHeight;
      this.props.dispatch(mainAction.actionPageHeight(height));
    }
  }

  onSelect = (index, indexPath) => {
    console.log(`${index}, ${indexPath}`);
    switch (index) {
      case '2-1':
        this.props.history.push({
          pathname: '/dict',
        });
        break;
      case '1-2':
        this.props.history.push({
          pathname: '/role',
        });
        break;
      case '1-3':
        this.props.history.push({
          pathname: '/menu',
        });
        break;
      default:
    }
  }

  render() {
    return (
      <div>
        <div style={styles.siderContainer}>
          <Menu defaultActive="2" theme="dark" onSelect={this.onSelect}>
            <Menu.SubMenu
              index="1"
              title={(
                <span>
                  <i className="el-icon-message" />
                  基础设置
                </span>
              )}
            >
              <Menu.ItemGroup title="用户管理">
                <Menu.Item index="1-1">账户管理</Menu.Item>
                <Menu.Item index="1-2">角色管理</Menu.Item>
                <Menu.Item index="1-3">菜单管理</Menu.Item>
              </Menu.ItemGroup>
            </Menu.SubMenu>
            <Menu.SubMenu
              index="2"
              title={(
                <span>
                  <i className="el-icon-menu" />
                  系统设置
                </span>
              )}
            >
              <Menu.Item index="2-1">字典管理</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
        <div style={styles.contentLayoutContainer}>
          <div>
            <div ref={(refs) => { this.header = refs; }}>
              <Header />
            </div>
            <div ref={(refs) => { this.tabsView = refs; }}>
              <TabsView />
            </div>
            <div>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(withRouter(Main));
