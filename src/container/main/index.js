import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'element-react';
import { withRouter } from 'react-router-dom';
import Header from '../header';

class Main extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    children: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  onSelect = (index, indexPath) => {
    // TODO
    switch (index) {
      case '2-1':
        this.props.history.push({
          pathname: '/dict',
        });
        break;
      default:
    }
  }

  render() {
    return (
      <Layout.Row>
        <Layout.Col span={3}>
          <div style={{ backgroundColor: '#324156' }}>
            <Menu style={{ height: '100vh' }} defaultActive="2" theme="dark" onSelect={this.onSelect}>
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
                  <Menu.Item index="1-3">权限管理</Menu.Item>
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
        </Layout.Col>
        <Layout.Col span={21}>
          <div>
            <Header />
            {this.props.children}
          </div>
        </Layout.Col>
      </Layout.Row>
    );
  }
}
export default withRouter(Main);
